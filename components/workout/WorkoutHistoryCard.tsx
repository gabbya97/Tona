import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Calendar, Clock, ChevronRight } from 'lucide-react-native';
import { WorkoutHistory } from '@/stores/workoutStore';
import { formatDuration } from '@/utils/helpers';

interface WorkoutHistoryCardProps {
  workout: WorkoutHistory;
  onPress: () => void;
}

const WorkoutHistoryCard: React.FC<WorkoutHistoryCardProps> = ({ 
  workout, 
  onPress 
}) => {
  const workoutDate = new Date(workout.date);
  const formattedDate = workoutDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const totalSets = workout.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length,
    0
  );
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Calendar size={14} color={theme.colors.textLight} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Clock size={14} color={theme.colors.textLight} />
          <Text style={styles.durationText}>
            {formatDuration(workout.duration)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.workoutName}>{workout.name}</Text>
      <Text style={styles.workoutType}>{workout.type}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{workout.exercises.length}</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalSets}</Text>
          <Text style={styles.statLabel}>Sets</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.viewText}>View Details</Text>
        <ChevronRight size={16} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 6,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 6,
  },
  workoutName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 2,
  },
  workoutType: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: 12,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.borderLight,
  },
  statValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: theme.colors.textLight,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 4,
  },
});

export default WorkoutHistoryCard;