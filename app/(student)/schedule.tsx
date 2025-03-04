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
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export default function ScheduleScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Mock available time slots
  const availableSlots: TimeSlot[] = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '11:00 AM', available: true },
    { id: 3, time: '01:00 PM', available: true },
    { id: 4, time: '03:00 PM', available: true },
    { id: 5, time: '05:00 PM', available: true },
    { id: 6, time: '07:00 PM', available: true },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedSlot) {
      // Implement booking logic here
      alert('Booking confirmed for ' + date.toDateString() + ' at ' + selectedSlot.time);
    } else {
      alert('Please select a time slot');
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
              title: '',
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#fff',
              headerBackVisible: false,
              gestureEnabled: true,
              headerShadowVisible: false,
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            }}
          />

          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              <View style={styles.headerSection}>
                <ThemedText style={styles.title}>Schedule a Cleaning</ThemedText>
                
              </View>

              <BlurView intensity={30} tint="dark" style={styles.dateSection}>
                <ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons name="calendar-outline" size={24} color="#fff" />
                  <ThemedText style={styles.dateText}>
                    {date.toDateString()}
                  </ThemedText>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                )}
              </BlurView>

              <BlurView intensity={30} tint="dark" style={styles.slotsSection}>
                <ThemedText style={styles.sectionTitle}>Available Slots</ThemedText>
                <View style={styles.slotsGrid}>
                  {availableSlots.map((slot) => (
                    <TouchableOpacity
                      key={slot.id}
                      style={[
                        styles.slotButton,
                        !slot.available && styles.slotUnavailable,
                        selectedSlot?.id === slot.id && styles.slotSelected,
                      ]}
                      onPress={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                    >
                      <ThemedText
                        style={[
                          styles.slotText,
                          !slot.available && styles.slotTextUnavailable,
                        ]}
                      >
                        {slot.time}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </BlurView>

              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !selectedSlot && styles.bookButtonDisabled,
                ]}
                onPress={handleBooking}
                disabled={!selectedSlot}
              >
                <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
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
    marginBottom: -25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 40,
    includeFontPadding: false,
    paddingVertical: 5,
    marginTop: -100,
  },
  description: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  dateSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  slotsSection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  slotButton: {
    width: '48%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  slotSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#fff',
  },
  slotUnavailable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  slotText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  slotTextUnavailable: {
    opacity: 0.5,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonDisabled: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 16,
  },
}); 