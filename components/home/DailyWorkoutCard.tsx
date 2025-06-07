import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Clock, ChevronRight, Dumbbell } from 'lucide-react-native';
import { Workout } from '@/stores/workoutStore';

interface DailyWorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  onSkip?: () => void;
}

const DailyWorkoutCard: React.FC<DailyWorkoutCardProps> = ({ workout, onPress, onSkip }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Dumbbell size={24} color={theme.colors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.workoutType}>{workout.type}</Text>
          <Text style={styles.workoutName}>{workout.name}</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Clock size={16} color={theme.colors.textLight} />
          <Text style={styles.detailText}>{workout.duration || 45} min</Text>
        </View>
        <Text style={styles.detailDivider}>•</Text>
        <Text style={styles.detailText}>{workout.exercises.length} exercises</Text>
      </View>
      
      <View style={styles.exercisePreview}>
        {workout.exercises.slice(0, 3).map((exercise, index) => (
          <Text key={index} style={styles.exerciseText}>
            {exercise.name} ({exercise.sets} × {exercise.reps})
          </Text>
        ))}
        {workout.exercises.length > 3 && (
          <Text style={styles.moreExercises}>
            +{workout.exercises.length - 3} more
          </Text>
        )}
      </View>
      
      <View style={styles.footer}>
        {onSkip && (
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        <View style={styles.startContainer}>
          <Text style={styles.startText}>Start Workout</Text>
          <ChevronRight size={20} color={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
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
    marginBottom: 12,
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
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 6,
  },
  detailDivider: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginHorizontal: 8,
  },
  exercisePreview: {
    marginBottom: 16,
  },
  exerciseText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  moreExercises: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  skipButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  skipText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: 4,
  },
});

export default DailyWorkoutCard;