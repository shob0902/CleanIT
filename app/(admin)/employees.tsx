import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

interface Employee {
  id: string;
  name: string;
  hostelBlock: string;
  isActive: boolean;
}

export default function EmployeesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [employees] = useState<Employee[]>([
    { id: 'EMP001', name: 'Mayank Kapoor', hostelBlock: 'Block A', isActive: true },
    { id: 'EMP002', name: 'Rahul Kumar', hostelBlock: 'Block B', isActive: false },
    { id: 'EMP003', name: 'Priya Singh', hostelBlock: 'Block A', isActive: true },
  ]);

  const handleBack = useCallback(() => {
    router.replace('/(admin)/home');
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlock = !selectedBlock || employee.hostelBlock === selectedBlock;
    return matchesSearch && matchesBlock;
  });

  const hostelBlocks = Array.from(new Set(employees.map(emp => emp.hostelBlock)));

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
            headerTitle: 'Total Employees',
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerBackVisible: true,
            gestureEnabled: true,
            headerLeft: () => (
              <TouchableOpacity 
                onPress={handleBack}
                style={{ marginLeft: 16 }}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            ),
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
          }}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <BlurView intensity={30} tint="dark" style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#fff" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name or ID..."
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </BlurView>
            </View>

            {/* Hostel Block Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
            >
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  !selectedBlock && styles.filterChipSelected,
                ]}
                onPress={() => setSelectedBlock(null)}
              >
                <ThemedText style={styles.filterText}>All</ThemedText>
              </TouchableOpacity>
              {hostelBlocks.map((block) => (
                <TouchableOpacity
                  key={block}
                  style={[
                    styles.filterChip,
                    selectedBlock === block && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedBlock(block)}
                >
                  <ThemedText style={styles.filterText}>{block}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Employee List */}
            <View style={styles.employeeList}>
              {filteredEmployees.map((employee) => (
                <View key={employee.id} style={styles.employeeCard}>
                  <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                    <View style={styles.employeeInfo}>
                      <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                      <ThemedText style={styles.employeeId}>{employee.id}</ThemedText>
                      <ThemedText style={styles.employeeBlock}>{employee.hostelBlock}</ThemedText>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      employee.isActive ? styles.statusActive : styles.statusInactive
                    ]}>
                      <ThemedText style={styles.statusText}>
                        {employee.isActive ? 'Active' : 'Inactive'}
                      </ThemedText>
                    </View>
                  </BlurView>
                </View>
              ))}
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
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterChipSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  employeeList: {
    gap: 12,
  },
  employeeCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  employeeBlock: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: 'rgba(39, 174, 96, 0.3)',
  },
  statusInactive: {
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 