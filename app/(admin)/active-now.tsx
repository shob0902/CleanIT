import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Modal,
  TextInput,
  KeyboardAvoidingView,
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

interface TaskForm {
  description: string;
  roomNumber: string;
  priority: 'Low' | 'Medium' | 'High';
  employeeId: string;
}

export default function ActiveNowScreen() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [taskForm, setTaskForm] = useState<TaskForm>({
    description: '',
    roomNumber: '',
    priority: 'Medium',
    employeeId: '',
  });

  const handleBack = useCallback(() => {
    router.replace('/(admin)/home');
  }, []);

  const [employees] = useState<Employee[]>([
    { id: 'EMP001', name: 'Mayank Kapoor', hostelBlock: 'Block A', isActive: true },
    { id: 'EMP002', name: 'Rahul Kumar', hostelBlock: 'Block B', isActive: true },
    { id: 'EMP003', name: 'Priya Singh', hostelBlock: 'Block A', isActive: true },
  ]);

  const hostelBlocks = Array.from(new Set(employees.map(emp => emp.hostelBlock)));
  
  const filteredEmployees = employees.filter(employee => 
    employee.isActive && (!selectedBlock || employee.hostelBlock === selectedBlock)
  );

  const handleAssignTask = (employee: Employee) => {
    setSelectedEmployee(employee);
    setTaskForm(prev => ({ ...prev, employeeId: employee.id }));
    setModalVisible(true);
  };

  const handleSubmitTask = async () => {
    try {
      // Here you would typically make an API call to save the task
      console.log('Submitting task:', { ...taskForm, assignedTime: new Date() });
      setModalVisible(false);
      setTaskForm({
        description: '',
        roomNumber: '',
        priority: 'Medium',
        employeeId: '',
      });
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

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
            headerTitle: 'Active Employees',
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
          }}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {/* Hostel Block Selection */}
            <View style={styles.blockSelection}>
              <ThemedText style={styles.sectionTitle}>Select Hostel Block</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.blockList}
              >
                <TouchableOpacity
                  style={[
                    styles.blockChip,
                    !selectedBlock && styles.blockChipSelected,
                  ]}
                  onPress={() => setSelectedBlock(null)}
                >
                  <ThemedText style={styles.blockText}>All Blocks</ThemedText>
                </TouchableOpacity>
                {hostelBlocks.map((block) => (
                  <TouchableOpacity
                    key={block}
                    style={[
                      styles.blockChip,
                      selectedBlock === block && styles.blockChipSelected,
                    ]}
                    onPress={() => setSelectedBlock(block)}
                  >
                    <ThemedText style={styles.blockText}>{block}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Active Employees List */}
            <View style={styles.employeeList}>
              {filteredEmployees.map((employee) => (
                <View key={employee.id} style={styles.employeeCard}>
                  <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                    <View style={styles.employeeInfo}>
                      <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                      <ThemedText style={styles.employeeId}>{employee.id}</ThemedText>
                      <ThemedText style={styles.employeeBlock}>{employee.hostelBlock}</ThemedText>
                    </View>
                    <TouchableOpacity
                      style={styles.assignButton}
                      onPress={() => handleAssignTask(employee)}
                    >
                      <ThemedText style={styles.assignButtonText}>Assign Task</ThemedText>
                    </TouchableOpacity>
                  </BlurView>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Task Assignment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <ScrollView
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <BlurView intensity={40} tint="dark" style={styles.modalContent}>
                <ThemedText style={styles.modalTitle}>Assign Task</ThemedText>
                <ThemedText style={styles.modalSubtitle}>
                  Assigning to: {selectedEmployee?.name}
                </ThemedText>

                <TextInput
                  style={styles.input}
                  placeholder="Task Description"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={taskForm.description}
                  onChangeText={(text) => setTaskForm(prev => ({ ...prev, description: text }))}
                  multiline
                />

                <TextInput
                  style={styles.input}
                  placeholder="Room Number"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={taskForm.roomNumber}
                  onChangeText={(text) => setTaskForm(prev => ({ ...prev, roomNumber: text }))}
                />

                <View style={styles.priorityContainer}>
                  <ThemedText style={styles.priorityLabel}>Priority:</ThemedText>
                  <View style={styles.priorityButtons}>
                    {(['Low', 'Medium', 'High'] as const).map((priority) => (
                      <TouchableOpacity
                        key={priority}
                        style={[
                          styles.priorityButton,
                          taskForm.priority === priority && styles.priorityButtonSelected,
                        ]}
                        onPress={() => setTaskForm(prev => ({ ...prev, priority }))}
                      >
                        <ThemedText style={styles.priorityButtonText}>{priority}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton]}
                    onPress={handleSubmitTask}
                  >
                    <ThemedText style={styles.modalButtonText}>Assign Task</ThemedText>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
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
  blockSelection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  blockList: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  blockChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blockChipSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  blockText: {
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
  assignButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  priorityButtonSelected: {
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  priorityButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.5)',
  },
  submitButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.5)',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 