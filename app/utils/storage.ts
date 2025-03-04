import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentData } from './storage.d';

const STUDENT_DATA_KEY = 'student_data';

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