import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ImageBackground,
  BackHandler,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getStudentData } from '@/app/utils/storage';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';

export default function StudentHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [roomDetails, setRoomDetails] = useState('');

  // Prevent back navigation when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const data = await getStudentData();
      if (data) {
        setStudentName("Shobhit Shourya");
        setRoomDetails("Men's Hostel P-316");
      } else {
        setStudentName("Shobhit Shourya");
        setRoomDetails("Men's Hostel P-316");
      }
    } catch (error) {
      console.error('Error loading student data:', error);
      setStudentName("Shobhit Shourya");
      setRoomDetails("Men's Hostel P-316");
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/slr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'none'
          }}
        />

        <View style={styles.safeArea}>
          <View style={styles.overlay}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeText}>Welcome!!</ThemedText>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>              
                <View style={styles.profileInfo}>
                  <ThemedText style={styles.userName}>{studentName}</ThemedText>
                  <ThemedText style={styles.userDetails}>{roomDetails}</ThemedText>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              {/* Actions Section */}
              <View style={styles.actionsSection}>
                <View style={styles.actionGrid}>
                  {/* Row 1 */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={styles.actionBox}
                      onPress={() => router.push('./schedule')}
                    >
                      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                        <Ionicons name="calendar-outline" size={32} color="#fff" style={styles.actionIcon} />
                        <ThemedText style={styles.actionTitle}>Schedule</ThemedText>
                        <ThemedText style={styles.actionDescription}>Book cleaning slot</ThemedText>
                      </BlurView>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionBox}
                      onPress={() => router.push('./track')}
                    >
                      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                        <Ionicons name="time-outline" size={32} color="#fff" style={styles.actionIcon} />
                        <ThemedText style={styles.actionTitle}>Track</ThemedText>
                        <ThemedText style={styles.actionDescription}>View progress</ThemedText>
                      </BlurView>
                    </TouchableOpacity>
                  </View>

                  {/* Row 2 */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={styles.actionBox}
                      onPress={() => router.push('./history')}
                    >
                      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                        <Ionicons name="document-text-outline" size={32} color="#fff" style={styles.actionIcon} />
                        <ThemedText style={styles.actionTitle}>History</ThemedText>
                        <ThemedText style={styles.actionDescription}>Past cleanings</ThemedText>
                      </BlurView>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionBox}
                      onPress={() => router.push('./profile')}
                    >
                      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
                        <Ionicons name="person-outline" size={32} color="#fff" style={styles.actionIcon} />
                        <ThemedText style={styles.actionTitle}>Profile</ThemedText>
                        <ThemedText style={styles.actionDescription}>Your details</ThemedText>
                      </BlurView>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  profileSection: {
    width: '100%',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userDetails: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionsSection: {
    width: '100%',
    paddingTop: 5,
  },
  actionGrid: {
    gap: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  actionBox: {
    width: '42%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
  },
  bottomDesign: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  welcomeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: 0,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 40 : 60,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    lineHeight: 70,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  nameText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    letterSpacing: 1,
    lineHeight: 40,
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  blurContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
}); 