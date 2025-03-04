import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

interface CleaningStatus {
  status: 'scheduled' | 'in-progress' | 'completed';
  scheduledTime: string;
  estimatedCompletion: string;
  cleanerName: string;
  progress: number;
}

export default function TrackScreen() {
  // Mock cleaning status - replace with actual data fetching
  const [cleaningStatus] = useState<CleaningStatus>({
    status: 'in-progress',
    scheduledTime: '2:00 PM',
    estimatedCompletion: '3:00 PM',
    cleanerName: 'John Doe',
    progress: 60,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#FFA500';
      case 'in-progress':
        return '#007AFF';
      case 'completed':
        return '#4CD964';
      default:
        return '#FFFFFF';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/slr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <StatusBar style="light" />
          <Stack.Screen
            options={{
              headerTitle: '',
              headerStyle: { backgroundColor: 'transparent' },
              headerTransparent: true,
              headerTintColor: '#fff',
              headerShadowVisible: false,
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  
                </TouchableOpacity>
              ),
            }}
          />

          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              <View style={styles.headerSection}>
                <ThemedText style={styles.title}>Track Cleaning Status</ThemedText>
                <ThemedText style={styles.description}>
                  Stay updated on your cleaning request. Check whether your cleaning is scheduled, in progress, or completed.
                </ThemedText>
              </View>

              <BlurView intensity={30} tint="dark" style={styles.statusSection}>
                <View style={styles.statusHeader}>
                  <ThemedText style={styles.sectionTitle}>Current Status</ThemedText>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(cleaningStatus.status) }]}>
                    <ThemedText style={styles.statusText}>
                      {getStatusText(cleaningStatus.status)}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.statusDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={24} color="#fff" />
                    <ThemedText style={styles.detailText}>
                      Scheduled for: {cleaningStatus.scheduledTime}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="timer-outline" size={24} color="#fff" />
                    <ThemedText style={styles.detailText}>
                      Estimated completion: {cleaningStatus.estimatedCompletion}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <ThemedText style={styles.detailText}>
                      Cleaner: {cleaningStatus.cleanerName}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <ThemedText style={styles.progressText}>Progress</ThemedText>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${cleaningStatus.progress}%` }]} />
                  </View>
                  <ThemedText style={styles.progressPercentage}>
                    {cleaningStatus.progress}%
                  </ThemedText>
                </View>
              </BlurView>

              <BlurView intensity={30} tint="dark" style={styles.notificationSection}>
                <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
                <View style={styles.notificationList}>
                  <View style={styles.notificationItem}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                    <ThemedText style={styles.notificationText}>
                      You will be notified when cleaning starts
                    </ThemedText>
                  </View>
                  <View style={styles.notificationItem}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                    <ThemedText style={styles.notificationText}>
                      You will be notified when cleaning is completed
                    </ThemedText>
                  </View>
                </View>
              </BlurView>
            </View>
          </ScrollView>
        </View>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  headerSection: {
    marginBottom: 30,
    marginTop: Platform.OS === 'ios' ? 20 : 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 40,
    includeFontPadding: false,
    paddingVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  statusSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statusDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressPercentage: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
  },
  notificationSection: {
    borderRadius: 20,
    padding: 20,
  },
  notificationList: {
    marginTop: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  backButton: {
    marginLeft: 16,
  },
}); 