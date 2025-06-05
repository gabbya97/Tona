import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { WorkoutHistory } from '@/stores/workoutStore';

interface ProgressChartProps {
  workoutHistory: WorkoutHistory[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workoutHistory }) => {
  // Get the last 7 days
  const getDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      days.push({
        date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1),
        hasWorkout: false,
        workoutCount: 0,
      });
    }
    
    // Mark days with workouts
    if (workoutHistory) {
      workoutHistory.forEach(workout => {
        const workoutDate = new Date(workout.date);
        
        days.forEach(day => {
          if (
            workoutDate.getDate() === day.date.getDate() &&
            workoutDate.getMonth() === day.date.getMonth() &&
            workoutDate.getFullYear() === day.date.getFullYear()
          ) {
            day.hasWorkout = true;
            day.workoutCount += 1;
          }
        });
      });
    }
    
    return days;
  };
  
  const days = getDays();
  
  // Get the max workout count for scaling
  const maxWorkoutCount = Math.max(
    ...days.map(day => day.workoutCount),
    1 // Ensure at least 1 to avoid division by zero
  );
  
  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayColumn}>
          <View style={styles.barContainer}>
            <View 
              style={[
                styles.bar,
                day.hasWorkout ? styles.activeBar : styles.inactiveBar,
                { 
                  height: day.workoutCount > 0 
                    ? `${(day.workoutCount / maxWorkoutCount) * 100}%` 
                    : 4
                }
              ]}
            />
          </View>
          <Text style={styles.dayLabel}>{day.day}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    height: 120,
    width: 12,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    minHeight: 4,
  },
  activeBar: {
    backgroundColor: theme.colors.primary,
  },
  inactiveBar: {
    backgroundColor: theme.colors.backgroundLight,
  },
  dayLabel: {
    marginTop: 8,
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
  },
});

export default ProgressChart;