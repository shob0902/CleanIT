import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  pendingTasks: number;
  completedTasks: number;
  todayBookings: number;
}

const AdminDashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingTasks: 0,
    completedTasks: 0,
    todayBookings: 0
  });

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated API response
      const response = {
        totalEmployees: 25,
        activeEmployees: 18,
        pendingTasks: 12,
        completedTasks: 45,
        todayBookings: 8
      };
      setStats(response);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchDashboardStats();
    setRefreshing(false);
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('adminData');
      router.replace('/auth/admin-login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const StatCard = ({ title, value, icon }: { title: string; value: number; icon: string }) => (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color="#2196F3" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const ActionButton = ({ title, icon, onPress }: { title: string; icon: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#fff" />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <StatCard title="Total Employees" value={stats.totalEmployees} icon="people" />
        <StatCard title="Active Employees" value={stats.activeEmployees} icon="people-circle" />
        <StatCard title="Pending Tasks" value={stats.pendingTasks} icon="time" />
        <StatCard title="Completed Tasks" value={stats.completedTasks} icon="checkmark-circle" />
      </View>

      <Text style={styles.sectionTitle}>Today's Overview</Text>
      <View style={styles.todayStats}>
        <View style={styles.todayStatItem}>
          <Text style={styles.todayStatValue}>{stats.todayBookings}</Text>
          <Text style={styles.todayStatLabel}>New Bookings</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <ActionButton
          title="Assign Tasks"
          icon="calendar"
          onPress={() => router.push('/(admin)/assign-tasks')}
        />
        <ActionButton
          title="View Reports"
          icon="bar-chart"
          onPress={() => router.push('/(admin)/reports')}
        />
        <ActionButton
          title="Settings"
          icon="settings"
          onPress={() => router.push('/(admin)/settings')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: (width - 48) / 2,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 16,
  },
  todayStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    elevation: 2,
  },
  todayStatItem: {
    alignItems: 'center',
  },
  todayStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  todayStatLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: (width - 48) / 2,
    alignItems: 'center',
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AdminDashboard; 