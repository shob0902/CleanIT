export interface StudentData {
  fullName: string;
  roomNumber: string;
  studentId: string;
  email: string;
}

export function getStudentData(): Promise<StudentData | null>; 