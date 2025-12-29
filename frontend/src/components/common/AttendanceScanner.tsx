import { useState } from 'react';
import QRScanner from '../common/QRScanner';
import Button from './Button';
import { validateQRCode, parseQRCode } from '../../data/mockStudentData';

interface AttendanceScannerProps {
  onAttendanceMarked: (qrData: string) => void;
  onClose: () => void;
}

export default function AttendanceScanner({ onAttendanceMarked, onClose }: AttendanceScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (result: string) => {
    setScanResult(result);
    setIsScanning(false);
    setIsProcessing(true);

    try {
      // Simulate processing the QR code data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate QR code format
      if (validateQRCode(result)) {
        parseQRCode(result); // Validate and parse (we don't need the result here)
        onAttendanceMarked(result);
        setError(null);
      } else {
        setError('Invalid QR code. Please scan a valid attendance QR code from your lecturer.');
      }
    } catch (err) {
      setError('Failed to process attendance. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Instructions */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">How to mark attendance:</p>
                  <ol className="mt-1 space-y-1 text-sm text-blue-800">
                    <li>1. Click "Start Scanning"</li>
                    <li>2. Point your camera at the QR code</li>
                    <li>3. Wait for the code to be recognized</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* QR Scanner */}
            <div className="flex justify-center">
              <QRScanner
                onScan={handleScan}
                onError={handleError}
                isActive={isScanning}
              />
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {scanResult && !error && (
              <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800">QR Code Scanned Successfully!</p>
                    <p className="mt-1 text-xs text-green-700">Processing attendance...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {!isScanning && !scanResult && (
                <Button
                  onClick={() => setIsScanning(true)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Start Scanning
                </Button>
              )}

              {isScanning && (
                <Button
                  onClick={() => setIsScanning(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6m-6 4h6m-6 4h4" />
                  </svg>
                  Stop Scanning
                </Button>
              )}

              {(scanResult || error) && (
                <Button
                  onClick={resetScanner}
                  variant="secondary"
                  className="flex-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Scan Again
                </Button>
              )}

              <Button
                onClick={onClose}
                variant="secondary"
                className="px-6"
              >
                Close
              </Button>
            </div>

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="flex items-center justify-center py-4">
                <div className="w-8 h-8 border-b-2 border-green-600 rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Processing attendance...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}