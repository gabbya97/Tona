import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface TimerProps {
  time: number;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ time, isActive }) => {
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.timerText,
        isActive ? styles.activeTimer : styles.pausedTimer
      ]}>
        {formatTime(time)}
      </Text>
      <Text style={styles.timerLabel}>
        {isActive ? 'Workout in progress' : 'Timer paused'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    marginBottom: 4,
  },
  activeTimer: {
    color: theme.colors.primary,
  },
  pausedTimer: {
    color: theme.colors.textLight,
  },
  timerLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
});

export default Timer;