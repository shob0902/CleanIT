import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  RefreshControl,
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
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting admin data:', error);
    return null;
  }
}

export default function AdminHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [stats, setStats] = useState({
    totalEmployees: 10,
    activeEmployees: 8,
    pendingTasks: 15,
    completedTasks: 45,
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    const data = await getAdminData();
    setAdminData(data);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadAdminData();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

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
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerBackVisible: false,
            gestureEnabled: false,
            headerLeft: () => null,
            gestureDirection: 'horizontal',
            animation: 'none'
          }}
        />

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.content}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeText}>Welcome!!</ThemedText>
              <ThemedText style={styles.nameText}>{adminData?.fullName || 'Admin'}</ThemedText>
              <ThemedText style={styles.roleText}>{adminData?.role || 'System Administrator'}</ThemedText>
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <ThemedText style={styles.sectionTitle}>Dashboard</ThemedText>
              <View style={styles.statsGrid}>
                <View style={styles.statsRow}>
                  <TouchableOpacity 
                    style={styles.statsBox}
                    onPress={() => router.push('/(admin)/employees')}
                  >
                    <BlurView intensity={30} tint="dark" style={styles.statsContent}>
                      <Ionicons name="people-outline" size={32} color="#fff" />
                      <ThemedText style={styles.statsNumber}>{stats.totalEmployees}</ThemedText>
                      <ThemedText style={styles.statsLabel}>Total Employees</ThemedText>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.statsBox}
                    onPress={() => router.push('/(admin)/active-now')}
                  >
                    <BlurView intensity={30} tint="dark" style={styles.statsContent}>
                      <Ionicons name="person-outline" size={32} color="#fff" />
                      <ThemedText style={styles.statsNumber}>{stats.activeEmployees}</ThemedText>
                      <ThemedText style={styles.statsLabel}>Active Now</ThemedText>
                    </BlurView>
                  </TouchableOpacity>
                </View>

                <View style={styles.statsRow}>
                  <TouchableOpacity 
                    style={styles.statsBox}
                    onPress={() => router.push('/(admin)/pending-tasks')}
                  >
                    <BlurView intensity={30} tint="dark" style={styles.statsContent}>
                      <Ionicons name="time-outline" size={32} color="#fff" />
                      <ThemedText style={styles.statsNumber}>{stats.pendingTasks}</ThemedText>
                      <ThemedText style={styles.statsLabel}>Pending Tasks</ThemedText>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.statsBox}
                    onPress={() => router.push('/(admin)/completed-tasks')}
                  >
                    <BlurView intensity={30} tint="dark" style={styles.statsContent}>
                      <Ionicons name="checkmark-circle-outline" size={32} color="#fff" />
                      <ThemedText style={styles.statsNumber}>{stats.completedTasks}</ThemedText>
                      <ThemedText style={styles.statsLabel}>Completed</ThemedText>
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsSection}>
              <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(admin)/reports')}
              >
                <BlurView intensity={30} tint="dark" style={styles.actionContent}>
                  <Ionicons name="bar-chart-outline" size={24} color="#fff" />
                  <ThemedText style={styles.actionText}>View Reports</ThemedText>
                  <Ionicons name="chevron-forward" size={24} color="#fff" />
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(admin)/profile')}
              >
                <BlurView intensity={30} tint="dark" style={styles.actionContent}>
                  <Ionicons name="person-circle-outline" size={24} color="#fff" />
                  <ThemedText style={styles.actionText}>View Profile</ThemedText>
                  <Ionicons name="chevron-forward" size={24} color="#fff" />
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  welcomeSection: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 50,
  },
  nameText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    textAlign: 'center',
  },
  roleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statsBox: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsContent: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsNumber: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 