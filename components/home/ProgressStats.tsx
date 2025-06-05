import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { calculatePercentage } from '@/utils/helpers';

interface ProgressStatsProps {
  completed: number;
  total: number;
  totalWorkouts: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ 
  completed, 
  total,
  totalWorkouts 
}) => {
  const percentage = calculatePercentage(completed, total);
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Weekly Progress</Text>
        <Text style={styles.subtitle}>
          {completed} of {total} workouts completed
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${percentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    ...theme.shadows.small,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  percentage: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 14,
    color: theme.colors.primary,
    width: 40,
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.borderLight,
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
});

export default ProgressStats;