import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EmployeeData {
  fullName: string;
  employeeId: string;
  phone: string;
  role: string;
}

const EMPLOYEE_DATA_KEY = 'employee_data';

async function getEmployeeData(): Promise<EmployeeData | null> {
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

async function clearEmployeeData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(EMPLOYEE_DATA_KEY);
  } catch (error) {
    console.error('Error clearing employee data:', error);
    throw error;
  }
}

export default function EmployeeProfileScreen() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      const data = await getEmployeeData();
      setEmployeeData(data);
    } catch (error) {
      console.error('Error loading employee data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await clearEmployeeData();
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/elr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <Stack.Screen
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerBackVisible: true,
            gestureEnabled: true,
          }}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <BlurView intensity={30} tint="dark" style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle" size={80} color="#fff" />
              </View>
              
              <View style={styles.infoSection}>
                <ThemedText style={styles.name}>{employeeData?.fullName}</ThemedText>
                <ThemedText style={styles.role}>{employeeData?.role}</ThemedText>
              </View>

              <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                  <Ionicons name="card-outline" size={24} color="#fff" />
                  <ThemedText style={styles.detailText}>ID: {employeeData?.employeeId}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="call-outline" size={24} color="#fff" />
                  <ThemedText style={styles.detailText}>{employeeData?.phone}</ThemedText>
                </View>
              </View>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                <ThemedText style={styles.logoutText}>Logout</ThemedText>
              </TouchableOpacity>
            </BlurView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  profileCard: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    width: '100%',
    paddingHorizontal: 10,
  },
  role: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailsSection: {
    gap: 16,
    marginBottom: 32,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 15,
    borderRadius: 15,
    gap: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
}); 