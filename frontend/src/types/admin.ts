export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface SystemStats {
  totalStudents: number;
  totalLecturers: number;
  totalCourses: number;
  totalAttendanceRecords: number;
  activeQRSessions: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface UserManagement {
  students: Student[];
  lecturers: Lecturer[];
  admins: Admin[];
}

export interface CourseManagement {
  courses: Course[];
  departments: string[];
  courseStats: CourseStats[];
}

export interface CourseStats {
  courseId: string;
  courseName: string;
  totalStudents: number;
  averageAttendance: number;
  totalClasses: number;
  attendanceRate: number;
}

export interface SystemSettings {
  qrCodeExpiry: number; // in minutes
  attendanceThreshold: number; // percentage
  emailNotifications: boolean;
  autoBackup: boolean;
  maintenanceMode: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userType: 'student' | 'lecturer' | 'admin';
  action: string;
  timestamp: string;
  details?: string;
}

// Re-export types from other modules for convenience
export type { Student } from './student';
export type { Lecturer, Course } from './lecturer';
