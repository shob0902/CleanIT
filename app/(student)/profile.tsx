import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Switch,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState({
    cleaning: true,
    reminders: true,
    updates: false,
  });

  const profile = {
    name: "Shobhit Shourya",
    email: "shobhit.shourya2022@vitstudent.ac.in",
    roomNumber: "Men's Hostel P-316",
    phone: "+91 9876543210",
  };

  const handleLogout = () => {
    router.replace('/');
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
                <ThemedText style={styles.title}>Your Profile</ThemedText>
                <ThemedText style={styles.description}>
                  Manage your profile details and notification preferences
                </ThemedText>
              </View>

              <BlurView intensity={30} tint="dark" style={styles.profileSection}>
                <View style={styles.profileHeader}>
                  <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle" size={80} color="#fff" />
                  </View>
                </View>

                <View style={styles.profileDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Name</ThemedText>
                      <ThemedText style={styles.detailText}>{profile.name}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="mail-outline" size={24} color="#fff" />
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Email</ThemedText>
                      <ThemedText style={styles.detailText}>{profile.email}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Room Number</ThemedText>
                      <ThemedText style={styles.detailText}>{profile.roomNumber}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={24} color="#fff" />
                    <View style={styles.detailContent}>
                      <ThemedText style={styles.detailLabel}>Phone</ThemedText>
                      <ThemedText style={styles.detailText}>{profile.phone}</ThemedText>
                    </View>
                  </View>
                </View>
              </BlurView>

              <BlurView intensity={30} tint="dark" style={styles.settingsSection}>
                <ThemedText style={styles.sectionTitle}>Notification Settings</ThemedText>
                <View style={styles.settingsList}>
                  <View style={styles.settingRow}>
                    <View>
                      <ThemedText style={styles.settingTitle}>Cleaning Updates</ThemedText>
                      <ThemedText style={styles.settingDescription}>
                        Get notified about cleaning progress
                      </ThemedText>
                    </View>
                    <Switch
                      value={notifications.cleaning}
                      onValueChange={(value) => 
                        setNotifications(prev => ({ ...prev, cleaning: value }))
                      }
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={notifications.cleaning ? '#007AFF' : '#f4f3f4'}
                    />
                  </View>

                  <View style={styles.settingRow}>
                    <View>
                      <ThemedText style={styles.settingTitle}>Reminders</ThemedText>
                      <ThemedText style={styles.settingDescription}>
                        Get reminded about upcoming cleanings
                      </ThemedText>
                    </View>
                    <Switch
                      value={notifications.reminders}
                      onValueChange={(value) => 
                        setNotifications(prev => ({ ...prev, reminders: value }))
                      }
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={notifications.reminders ? '#007AFF' : '#f4f3f4'}
                    />
                  </View>

                  <View style={styles.settingRow}>
                    <View>
                      <ThemedText style={styles.settingTitle}>App Updates</ThemedText>
                      <ThemedText style={styles.settingDescription}>
                        Get notified about new features
                      </ThemedText>
                    </View>
                    <Switch
                      value={notifications.updates}
                      onValueChange={(value) => 
                        setNotifications(prev => ({ ...prev, updates: value }))
                      }
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={notifications.updates ? '#007AFF' : '#f4f3f4'}
                    />
                  </View>
                </View>
              </BlurView>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                <ThemedText style={styles.logoutText}>Logout</ThemedText>
              </TouchableOpacity>
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
  profileSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  profileDetails: {
    gap: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  settingsSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  settingsList: {
    gap: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 15,
    borderRadius: 15,
    gap: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 16,
  },
}); 