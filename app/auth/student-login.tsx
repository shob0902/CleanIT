import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import { saveStudentData } from '@/app/utils/storage';
import { Ionicons } from '@expo/vector-icons';

// Generate a 6-digit OTP locally
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function StudentLoginScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleSendOTP = () => {
    if (!email) {
      Alert.alert('Missing Information', 'Please enter your email');
      return;
    }

    if (!email.endsWith('@vitstudent.ac.in')) {
      Alert.alert('Invalid Email', 'Please use your VIT student email address (@vitstudent.ac.in)');
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
        // Save student data
        await saveStudentData({
          fullName: "Student User",
          roomNumber: "Men's Hostel P-316",
          studentId: "21BCE10000",
          email: email.toLowerCase()
        });
        
        // Navigate to student home screen
        router.replace('/(student)/home');
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
        source={require('../../assets/images/slr-bg.png')}
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
                    source={require('../../assets/images/st-log.png')}
                    style={styles.logoImage}
                  />
                </View>

                {!otpSent ? (
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your VIT email"
                      placeholderTextColor="#666"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
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
    width: '100%',
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
    marginBottom: -20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: 0,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 16,
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
    backgroundColor: '#2563EB',
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