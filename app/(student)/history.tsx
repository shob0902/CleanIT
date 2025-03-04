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

interface CleaningHistory {
  id: number;
  date: string;
  time: string;
  status: 'completed' | 'cancelled';
  cleanerName: string;
  rating?: number;
  feedback?: string;
}

export default function HistoryScreen() {
  // Mock cleaning history - replace with actual data fetching
  const [cleaningHistory] = useState<CleaningHistory[]>([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      status: 'completed',
      cleanerName: 'John Doe',
      rating: 5,
      feedback: 'Excellent service!',
    },
    {
      id: 2,
      date: '2024-03-10',
      time: '11:00 AM',
      status: 'completed',
      cleanerName: 'Jane Smith',
      rating: 4,
    },
    {
      id: 3,
      date: '2024-03-05',
      time: '3:00 PM',
      status: 'cancelled',
      cleanerName: 'Mike Johnson',
    },
  ]);

  const handleFeedback = (id: number) => {
    // Implement feedback submission logic
    alert('Opening feedback form for cleaning #' + id);
  };

  const handleRebook = (history: CleaningHistory) => {
    // Implement rebooking logic
    router.push('./schedule' as any);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? '#FFD700' : '#fff'}
          />
        ))}
      </View>
    );
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
                <ThemedText style={styles.title}>Cleaning History</ThemedText>
                <ThemedText style={styles.description}>
                  View all your past cleaning requests, including dates, times, and completion status. Keep track of your room's cleanliness over time.
                </ThemedText>
              </View>

              <View style={styles.historyList}>
                {cleaningHistory.map((history) => (
                  <BlurView key={history.id} intensity={30} tint="dark" style={styles.historyCard}>
                    <View style={styles.historyHeader}>
                      <View>
                        <ThemedText style={styles.historyDate}>
                          {new Date(history.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </ThemedText>
                        <ThemedText style={styles.historyTime}>{history.time}</ThemedText>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: history.status === 'completed' ? '#4CD964' : '#FF3B30' }
                      ]}>
                        <ThemedText style={styles.statusText}>
                          {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                        </ThemedText>
                      </View>
                    </View>

                    <View style={styles.historyDetails}>
                      <View style={styles.detailRow}>
                        <Ionicons name="person-outline" size={20} color="#fff" />
                        <ThemedText style={styles.detailText}>
                          Cleaner: {history.cleanerName}
                        </ThemedText>
                      </View>
                      {history.rating && (
                        <View style={styles.detailRow}>
                          <Ionicons name="star-outline" size={20} color="#fff" />
                          <View style={styles.ratingContainer}>
                            {renderStars(history.rating)}
                          </View>
                        </View>
                      )}
                      {history.feedback && (
                        <View style={styles.feedbackContainer}>
                          <ThemedText style={styles.feedbackText}>
                            "{history.feedback}"
                          </ThemedText>
                        </View>
                      )}
                    </View>

                    <View style={styles.actionButtons}>
                      {history.status === 'completed' && !history.feedback && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleFeedback(history.id)}
                        >
                          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                          <ThemedText style={styles.actionButtonText}>Give Feedback</ThemedText>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleRebook(history)}
                      >
                        <Ionicons name="refresh-outline" size={20} color="#fff" />
                        <ThemedText style={styles.actionButtonText}>Book Again</ThemedText>
                      </TouchableOpacity>
                    </View>
                  </BlurView>
                ))}
              </View>
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
  historyList: {
    gap: 15,
  },
  historyCard: {
    borderRadius: 20,
    padding: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  historyDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyTime: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  historyDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  feedbackContainer: {
    marginTop: 5,
    paddingLeft: 30,
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    gap: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    marginLeft: 16,
  },
}); 