import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StudentData {
  fullName: string;
  roomNumber: string;
  studentId: string;
  email: string;
}

export interface EmployeeData {
  fullName: string;
  employeeId: string;
  phone: string;
  role: string;
}

const STUDENT_DATA_KEY = 'student_data';
const EMPLOYEE_DATA_KEY = 'employee_data';

export async function saveStudentData(data: StudentData): Promise<void> {
  try {
    await AsyncStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving student data:', error);
    throw error;
  }
}

export async function getStudentData(): Promise<StudentData | null> {
  try {
    const data = await AsyncStorage.getItem(STUDENT_DATA_KEY);
    if (data) {
      return JSON.parse(data) as StudentData;
    }
    return null;
  } catch (error) {
    console.error('Error getting student data:', error);
    throw error;
  }
}

export async function clearStudentData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STUDENT_DATA_KEY);
  } catch (error) {
    console.error('Error clearing student data:', error);
    throw error;
  }
}

export async function saveEmployeeData(data: EmployeeData): Promise<void> {
  try {
    await AsyncStorage.setItem(EMPLOYEE_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving employee data:', error);
    throw error;
  }
}

export async function getEmployeeData(): Promise<EmployeeData | null> {
  try {
    const data = await AsyncStorage.getItem(EMPLOYEE_DATA_KEY);
    if (data) {
      return JSON.parse(data) as EmployeeData;
    }
    return null;
  } catch (error) {
    console.error('Error getting employee data:', error);
    throw error;
  }
}

export async function clearEmployeeData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(EMPLOYEE_DATA_KEY);
  } catch (error) {
    console.error('Error clearing employee data:', error);
    throw error;
  }
} 