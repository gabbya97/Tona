import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Workout } from '@/stores/workoutStore';

interface WeeklyWorkoutCardProps {
  index: number;
  workout: Workout;
  status: 'Pending' | 'Completed' | 'Skipped';
  isNext: boolean;
  onPress: () => void;
}

const WeeklyWorkoutCard: React.FC<WeeklyWorkoutCardProps> = ({
  index,
  workout,
  status,
  isNext,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isNext && styles.nextContainer]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Workout {index + 1}</Text>
        <Text
          style={[
            styles.status,
            status === 'Completed'
              ? styles.completed
              : status === 'Skipped'
              ? styles.skipped
              : styles.pending
          ]}
        >
          {status}
        </Text>
      </View>
      <Text style={styles.name}>{workout.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...theme.shadows.small
  },
  nextContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  title: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text
  },
  status: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14
  },
  completed: {
    color: theme.colors.success
  },
  skipped: {
    color: theme.colors.warning
  },
  pending: {
    color: theme.colors.textLight
  },
  name: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.text
  }
});

export default WeeklyWorkoutCard;
