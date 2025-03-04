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

interface AdminData {
  fullName: string;
  adminId: string;
  phone: string;
  role: string;
}

const ADMIN_DATA_KEY = 'admin_data';

async function getAdminData(): Promise<AdminData | null> {
  try {
    const data = await AsyncStorage.getItem(ADMIN_DATA_KEY);
    if (data) {
      return JSON.parse(data) as AdminData;
    }
    return null;
  } catch (error) {
    console.error('Error getting admin data:', error);
    throw error;
  }
}

async function clearAdminData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ADMIN_DATA_KEY);
  } catch (error) {
    console.error('Error clearing admin data:', error);
    throw error;
  }
}

export default function AdminProfileScreen() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const data = await getAdminData();
      setAdminData(data);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await clearAdminData();
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/alr-bg.png')}
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
                <ThemedText style={styles.name}>{adminData?.fullName}</ThemedText>
                <ThemedText style={styles.role}>{adminData?.role}</ThemedText>
              </View>

              <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                  <Ionicons name="card-outline" size={24} color="#fff" />
                  <ThemedText style={styles.detailText}>ID: {adminData?.adminId}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="call-outline" size={24} color="#fff" />
                  <ThemedText style={styles.detailText}>{adminData?.phone}</ThemedText>
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