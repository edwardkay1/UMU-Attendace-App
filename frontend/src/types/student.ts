export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  course: string;
  year: number;
  profileImage?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
  lecturer: string;
}

export interface StudentStats {
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
}