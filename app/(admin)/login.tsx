import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AdminData {
  fullName: string;
  adminId: string;
  phone: string;
  role: string;
}

const ADMIN_DATA_KEY = 'admin_data';
const ALLOWED_ADMIN_PHONES = ['8319097826']; // Allowed admin phone numbers

async function saveAdminData(data: AdminData): Promise<void> {
  try {
    await AsyncStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving admin data:', error);
    throw error;
  }
}

// Generate a 6-digit OTP locally
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function AdminLoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleSendOTP = () => {
    if (!phone) {
      Alert.alert('Missing Information', 'Please enter your phone number');
      return;
    }

    // Basic Indian phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      Alert.alert('Invalid Format', 'Please enter a valid 10-digit phone number starting with 6-9');
      return;
    }

    // Check if phone number is authorized
    if (!ALLOWED_ADMIN_PHONES.includes(phone)) {
      Alert.alert('Access Denied', 'This phone number is not authorized for admin access');
      return;
    }

    // Generate OTP locally
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    
    // In development, show the OTP
    if (__DEV__) {
      Alert.alert(
        'Development Mode', 
        `Your OTP is: ${newOTP}\n\nThis alert is only shown in development mode.`,
        [{ text: 'OK', style: 'default' }]
      );
    }
    
    setOtpSent(true);
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Missing Information', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Invalid Format', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    // Verify OTP locally
    if (otp === generatedOTP) {
      try {
        // Save admin data
        await saveAdminData({
          fullName: "Chirayu Trivedi",
          adminId: "ADMIN001",
          phone: phone,
          role: "System Administrator"
        });
        
        // Navigate to admin home screen
        router.replace('/(admin)/home');
      } catch (error) {
        Alert.alert('Storage Error', 'Could not save login data. Please try again.');
        setIsLoading(false);
      }
    } else {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
        }}
      />
      
      <ImageBackground 
        source={require('../../assets/images/alr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.overlay}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Image
                    source={require('../../assets/images/ad-log.png')}
                    style={styles.logoImage}
                  />
                  <ThemedText style={styles.subtitle}>
                  </ThemedText>
                </View>

                {!otpSent ? (
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#666"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phone}
                      onChangeText={setPhone}
                      editable={!isLoading}
                    />

                    <TouchableOpacity
                      style={[styles.button, isLoading && styles.buttonDisabled]}
                      onPress={handleSendOTP}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <ThemedText style={styles.buttonText}>Send OTP</ThemedText>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 6-digit OTP"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                      maxLength={6}
                      value={otp}
                      onChangeText={setOtp}
                      editable={!isLoading}
                    />

                    <TouchableOpacity
                      style={[styles.button, isLoading && styles.buttonDisabled]}
                      onPress={handleVerifyOTP}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <ThemedText style={styles.buttonText}>Verify OTP</ThemedText>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={() => {
                        setOtpSent(false);
                        setOtp('');
                      }}
                      disabled={isLoading}
                    >
                      <ThemedText style={styles.resendText}>Resend OTP</ThemedText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: -30,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(135, 84, 84, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -10,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#753303',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 16,
    padding: 8,
  },
  resendText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 