import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function WelcomeScreen() {
  useEffect(() => {
    const backAction = () => {
      return true; // Prevent going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/1.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
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
              headerBackVisible: false,
              gestureEnabled: false,
              animation: 'none',
              gestureDirection: 'horizontal',
              headerLeft: () => null
            }}
          />

          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <ThemedText style={styles.subtitle}>
                Your Hostel Room Cleaning Solution
              </ThemedText>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/auth/student-login')}
              >
                <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
                  <Ionicons name="school-outline" size={24} color="#fff" style={styles.buttonIcon} />
                  <ThemedText style={styles.buttonText}>Student</ThemedText>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(employee)/login' as any)}
              >
                <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
                  <Ionicons name="person-outline" size={24} color="#fff" style={styles.buttonIcon} />
                  <ThemedText style={styles.buttonText}>Employee</ThemedText>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(admin)/login' as any)}
              >
                <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
                  <Ionicons name="shield-outline" size={24} color="#fff" style={styles.buttonIcon} />
                  <ThemedText style={styles.buttonText}>Admin</ThemedText>
                </BlurView>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                © 2025 CleanIT. All rights reserved.
              </ThemedText>
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
    width: screenWidth,
    height: screenHeight,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
    height: 120,
  },
  logo: {
    height: 100,
    width: 200,
    marginBottom: 5,
    marginTop: 80,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    height: 25,
    lineHeight: 25,
    includeFontPadding: false,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 40,
  },
  button: {
    width: '80%',
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonBlur: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.6,
  },
}); 