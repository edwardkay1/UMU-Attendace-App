import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Button from '../common/Button';
import { getLecturerById, getCoursesByLecturerId, createQRSession, type Course, type CourseSchedule, type QRCodeSession } from '../../data/mockLecturerData';

interface QRCodeGeneratorProps {
  lecturerId?: string;
  onQRGenerated?: (session: QRCodeSession) => void;
}

export default function QRCodeGenerator({ lecturerId = 'LEC001', onQRGenerated }: QRCodeGeneratorProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<CourseSchedule | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<QRCodeSession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const lecturer = getLecturerById(lecturerId);
  const courses = lecturer ? getCoursesByLecturerId(lecturer.id) : [];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentSession && timeRemaining > 0) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((new Date(currentSession.expiresAt).getTime() - Date.now()) / 1000));
        setTimeRemaining(remaining);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentSession, timeRemaining]);

  const generateQRCode = async () => {
    if (!selectedCourse || !selectedSchedule || !lecturer) return;

    setIsGenerating(true);
    try {
      const session = createQRSession(selectedCourse, lecturer, selectedSchedule);
      setCurrentSession(session);

      const qrData = session.qrData;
      const url = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(url);
      setTimeRemaining(Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000));
      onQRGenerated?.(session);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const stopSession = () => {
    if (currentSession) {
      currentSession.isActive = false;
      setCurrentSession(null);
      setQrCodeUrl('');
      setTimeRemaining(0);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Course Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Generate Attendance QR Code</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                const course = courses.find(c => c.id === e.target.value);
                setSelectedCourse(course || null);
                setSelectedSchedule(null);
                setQrCodeUrl('');
                setCurrentSession(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class Time
              </label>
              <select
                value={selectedSchedule?.id || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const schedule = selectedCourse.schedule.find((s: CourseSchedule) => s.id === e.target.value);
                  setSelectedSchedule(schedule || null);
                  setQrCodeUrl('');
                  setCurrentSession(null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a class time...</option>
                {selectedCourse.schedule.map((schedule: CourseSchedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.day} {schedule.time} - {schedule.location} ({schedule.duration}min)
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            onClick={generateQRCode}
            disabled={!selectedCourse || !selectedSchedule || isGenerating}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              'Generate QR Code'
            )}
          </Button>
        </div>
      </div>

      {/* QR Code Display */}
      {qrCodeUrl && currentSession && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Attendance QR Code</h4>
            <p className="text-gray-600 mb-4">
              {currentSession.courseName} - {currentSession.time} ({currentSession.location})
            </p>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <img
                src={qrCodeUrl}
                alt="Attendance QR Code"
                className="border-4 border-gray-200 rounded-lg shadow-md"
              />
            </div>

            {/* Session Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-900">{new Date(currentSession.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <p className="text-gray-900">{currentSession.time}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-900">{currentSession.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expires in:</span>
                  <p className={`font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `attendance-qr-${currentSession.id}.png`;
                  link.href = qrCodeUrl;
                  link.click();
                }}
                variant="secondary"
                className="flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </Button>

              <Button
                onClick={stopSession}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6m-6 4h6m-6 4h4" />
                </svg>
                Stop Session
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900">Display this QR code for students to scan</p>
                  <ul className="text-sm text-blue-800 mt-1 space-y-1">
                    <li>• Students will scan this code to mark attendance</li>
                    <li>• Code expires automatically after class duration</li>
                    <li>• You can download and print the QR code if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}