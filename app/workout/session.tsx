import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Check, Play, Pause, ChevronDown, ChevronUp, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useProgressStore } from '@/stores/progressStore';
import Button from '@/components/ui/Button';
import Timer from '@/components/workout/Timer';
import { getWeekStart } from '@/utils/helpers';

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const { currentPlan, addWorkoutHistory } = useWorkoutStore();
  const { addPersonalRecord } = useProgressStore();
  
  const startOfWeek = getWeekStart();

  const completedThisWeek =
    useWorkoutStore.getState().workoutHistory?.filter(w => {
      const date = new Date(w.date);
      return date >= startOfWeek;
    }) || [];

  const skippedCount =
    useWorkoutStore.getState().skippedWorkouts?.filter(
      w => w.weekStart === startOfWeek.toISOString()
    ).length || 0;

  const nextIndex = completedThisWeek.length + skippedCount;

  const params = useLocalSearchParams<{ id?: string }>();
  const paramIndex = params?.id ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id, 10) : NaN;
  const selectedIndex = !isNaN(paramIndex) ? paramIndex : nextIndex;

  const selectedWorkout =
    currentPlan?.workouts && selectedIndex < currentPlan.workouts.length
      ? currentPlan.workouts[selectedIndex]
      : null;
  
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [expandedExercises, setExpandedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  
  useEffect(() => {
    if (selectedWorkout) {
      // Initialize exercise data
      setExerciseData(
        selectedWorkout.exercises.map(exercise => ({
          ...exercise,
          sets: Array(exercise.sets).fill().map(() => ({
            reps: 0,
            weight: '',
            completed: false
          }))
        }))
      );
    }
  }, [selectedWorkout]);
  
  useEffect(() => {
    let interval;
    
    if (timerActive) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive]);
  
  const startWorkout = () => {
    setWorkoutStarted(true);
    setTimerActive(true);
    // Start with first exercise expanded
    setExpandedExercises([0]);
  };
  
  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };
  
  const toggleExercise = (index) => {
    setExpandedExercises(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  
  const updateSetData = (exerciseIndex, setIndex, field, value) => {
    const newExerciseData = [...exerciseData];
    newExerciseData[exerciseIndex].sets[setIndex][field] = value;
    setExerciseData(newExerciseData);
  };
  
  const toggleSetCompletion = (exerciseIndex, setIndex) => {
    const newExerciseData = [...exerciseData];
    newExerciseData[exerciseIndex].sets[setIndex].completed = 
      !newExerciseData[exerciseIndex].sets[setIndex].completed;
    setExerciseData(newExerciseData);
    
    // Check if this set has a new PR (higher weight than previous)
    const exercise = newExerciseData[exerciseIndex];
    const set = exercise.sets[setIndex];
    
    if (set.completed && set.weight && set.reps) {
      // Check if this is a PR
      const weight = parseFloat(set.weight);
      addPersonalRecord({
        id: Date.now().toString(),
        exerciseName: exercise.name,
        weight,
        reps: set.reps,
        date: new Date().toISOString(),
      });
    }
  };
  
  const completeWorkout = () => {
    // Check if all sets are completed
    const allSetsCompleted = exerciseData.every(exercise => 
      exercise.sets.every(set => set.completed)
    );
    
    if (!allSetsCompleted) {
      Alert.alert(
        "Incomplete Workout",
        "Not all sets are marked as completed. Do you want to finish the workout anyway?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Finish Anyway", 
            onPress: () => finishWorkout() 
          }
        ]
      );
    } else {
      finishWorkout();
    }
  };
  
  const finishWorkout = () => {
    setWorkoutCompleted(true);
    setTimerActive(false);
    
    // Save workout history
    const completedWorkout = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: currentTime,
      name: selectedWorkout.name,
      type: selectedWorkout.type,
      exercises: exerciseData.map(exercise => ({
        name: exercise.name,
        sets: exercise.sets.filter(set => set.completed).map(set => ({
          reps: set.reps,
          weight: set.weight
        }))
      }))
    };
    
    addWorkoutHistory(completedWorkout);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!selectedWorkout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noWorkoutContainer}>
          <Text style={styles.noWorkoutText}>No workouts left for this week.</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.goBackButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => {
            if (workoutStarted && !workoutCompleted) {
              Alert.alert(
                "Exit Workout",
                "Are you sure you want to exit? Your progress will be lost.",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { 
                    text: "Exit", 
                    onPress: () => router.back() 
                  }
                ]
              );
            } else {
              router.back();
            }
          }}
        >
          <X size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{selectedWorkout.name}</Text>
        
        {workoutStarted && !workoutCompleted && (
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={completeWorkout}
          >
            <Check size={24} color={theme.colors.success} />
          </TouchableOpacity>
        )}
      </View>
      
      {!workoutStarted ? (
        <View style={styles.startContainer}>
          <View style={styles.workoutDetails}>
            <Text style={styles.workoutType}>{selectedWorkout.type}</Text>
            <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
            <View style={styles.workoutMeta}>
              <View style={styles.metaItem}>
                <Clock size={16} color={theme.colors.textLight} />
                <Text style={styles.metaText}>
                  {selectedWorkout.duration || 45} min
                </Text>
              </View>
              <Text style={styles.metaDivider}>•</Text>
              <Text style={styles.metaText}>
                {selectedWorkout.exercises.length} exercises
              </Text>
            </View>
          </View>
          
          <ScrollView style={styles.exercisePreview}>
            {selectedWorkout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exercisePreviewItem}>
                <View style={styles.exerciseNumberContainer}>
                  <Text style={styles.exerciseNumber}>{index + 1}</Text>
                </View>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSets}>
                    {exercise.sets} sets • {exercise.reps} reps
                    {exercise.rest && ` • ${exercise.rest}s rest`}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <Button
            title="Start Workout"
            onPress={startWorkout}
            style={styles.startButton}
          />
        </View>
      ) : workoutCompleted ? (
        <View style={styles.completedContainer}>
          <View style={styles.completedIconContainer}>
            <Check size={48} color={theme.colors.success} />
          </View>
          <Text style={styles.completedTitle}>Workout Complete!</Text>
          <Text style={styles.completedSubtitle}>Great job!</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(currentTime)}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {exerciseData.reduce((acc, exercise) => 
                  acc + exercise.sets.filter(set => set.completed).length, 0
                )}
              </Text>
              <Text style={styles.statLabel}>Sets Completed</Text>
            </View>
          </View>
          
          <Button
            title="Back to Home"
            onPress={() => router.replace('/(tabs)')}
            style={styles.backHomeButton}
          />
        </View>
      ) : (
        <View style={styles.workoutContainer}>
          <View style={styles.timerContainer}>
            <Timer time={currentTime} isActive={timerActive} />
            <TouchableOpacity 
              style={styles.timerButton}
              onPress={toggleTimer}
            >
              {timerActive ? (
                <Pause size={24} color={theme.colors.white} />
              ) : (
                <Play size={24} color={theme.colors.white} />
              )}
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.exercisesContainer}>
            {exerciseData.map((exercise, exerciseIndex) => (
              <View key={exerciseIndex} style={styles.exerciseCard}>
                <TouchableOpacity 
                  style={styles.exerciseHeader}
                  onPress={() => toggleExercise(exerciseIndex)}
                >
                  <View style={styles.exerciseHeaderLeft}>
                    <View style={styles.exerciseNumberContainer}>
                      <Text style={styles.exerciseNumber}>{exerciseIndex + 1}</Text>
                    </View>
                    <View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseSets}>
                        {exercise.sets.length} sets • {exercise.reps} reps
                      </Text>
                    </View>
                  </View>
                  
                  {expandedExercises.includes(exerciseIndex) ? (
                    <ChevronUp size={24} color={theme.colors.textLight} />
                  ) : (
                    <ChevronDown size={24} color={theme.colors.textLight} />
                  )}
                </TouchableOpacity>
                
                {expandedExercises.includes(exerciseIndex) && (
                  <View style={styles.setsContainer}>
                    <View style={styles.setHeader}>
                      <Text style={styles.setLabel}>SET</Text>
                      <Text style={styles.repsLabel}>REPS</Text>
                      <Text style={styles.weightLabel}>WEIGHT</Text>
                      <Text style={styles.doneLabel}>DONE</Text>
                    </View>
                    
                    {exercise.sets.map((set, setIndex) => (
                      <View key={setIndex} style={styles.setRow}>
                        <Text style={styles.setNumber}>{setIndex + 1}</Text>
                        
                        <TextInput
                          style={styles.repsInput}
                          keyboardType="number-pad"
                          value={set.reps ? set.reps.toString() : ''}
                          onChangeText={value => 
                            updateSetData(exerciseIndex, setIndex, 'reps', parseInt(value) || 0)
                          }
                          editable={!set.completed}
                        />
                        
                        <TextInput
                          style={styles.weightInput}
                          keyboardType="decimal-pad"
                          value={set.weight.toString()}
                          onChangeText={value => 
                            updateSetData(exerciseIndex, setIndex, 'weight', value)
                          }
                          editable={!set.completed}
                        />
                        
                        <TouchableOpacity 
                          style={[
                            styles.checkboxContainer,
                            set.completed && styles.checkboxContainerChecked
                          ]}
                          onPress={() => toggleSetCompletion(exerciseIndex, setIndex)}
                        >
                          {set.completed && (
                            <Check size={16} color={theme.colors.white} />
                          )}
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.actionContainer}>
            <Button
              title="Complete Workout"
              onPress={completeWorkout}
              style={styles.completeButton}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    backgroundColor: theme.colors.white,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
  checkButton: {
    padding: 8,
  },
  noWorkoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noWorkoutText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  goBackButton: {
    width: '50%',
  },
  startContainer: {
    flex: 1,
    padding: 20,
  },
  workoutDetails: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.small,
  },
  workoutType: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  workoutName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 6,
  },
  metaDivider: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginHorizontal: 8,
  },
  exercisePreview: {
    flex: 1,
    marginBottom: 20,
  },
  exercisePreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    ...theme.shadows.small,
  },
  exerciseNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumber: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  exerciseSets: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  startButton: {
    width: '100%',
  },
  workoutContainer: {
    flex: 1,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  timerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exercisesContainer: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  exerciseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setsContainer: {
    padding: 16,
  },
  setHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    marginBottom: 8,
  },
  setLabel: {
    width: '15%',
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
  },
  repsLabel: {
    width: '25%',
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
  },
  weightLabel: {
    width: '35%',
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
  },
  doneLabel: {
    width: '25%',
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  setNumber: {
    width: '15%',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: theme.colors.text,
  },
  repsInput: {
    width: '25%',
    height: 36,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  weightInput: {
    width: '35%',
    height: 36,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    paddingHorizontal: 8,
    textAlign: 'center',
    marginLeft: 8,
  },
  checkboxContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  checkboxContainerChecked: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  actionContainer: {
    padding: 16,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  completeButton: {
    width: '100%',
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  completedIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  completedTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 8,
  },
  completedSubtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
    color: theme.colors.textLight,
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 40,
    ...theme.shadows.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.borderLight,
    marginHorizontal: 20,
  },
  statValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  backHomeButton: {
    width: '100%',
  },
});