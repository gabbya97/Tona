import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { Dumbbell } from 'lucide-react-native';
import { Workout } from '@/stores/workoutStore';

interface WorkoutPlanCardProps {
  workout: Workout;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ workout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Dumbbell size={24} color={theme.colors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.workoutType}>{workout.type}</Text>
          <Text style={styles.workoutName}>{workout.name}</Text>
        </View>
      </View>
      
      <View style={styles.exercisesContainer}>
        <Text style={styles.exercisesTitle}>Exercises</Text>
        
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  workoutType: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  workoutName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
  exercisesContainer: {
    marginTop: 8,
  },
  exercisesTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 2,
  },
  exerciseSets: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: theme.colors.textLight,
  },
});

export default WorkoutPlanCard;