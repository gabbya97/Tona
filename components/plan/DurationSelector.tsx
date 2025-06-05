import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface DurationSelectorProps {
  selected: number;
  onSelect: (duration: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selected, 
  onSelect 
}) => {
  const durations = [30, 45, 60, 75];
  
  return (
    <View style={styles.container}>
      {durations.map((duration) => (
        <TouchableOpacity
          key={duration}
          style={[
            styles.durationCard,
            selected === duration && styles.selectedCard
          ]}
          onPress={() => onSelect(duration)}
        >
          <View style={styles.durationTitleContainer}>
            <View 
              style={[
                styles.radioButton,
                selected === duration && styles.radioButtonSelected
              ]}
            >
              {selected === duration && <View style={styles.radioButtonInner} />}
            </View>
            <Text 
              style={[
                styles.durationTitle,
                selected === duration && styles.selectedText
              ]}
            >
              {duration} minutes
            </Text>
          </View>
          <Text 
            style={[
              styles.durationDescription,
              selected === duration && styles.selectedDescription
            ]}
          >
            {duration === 30 
              ? 'Quick workouts, ideal for busy schedules'
              : duration === 45
                ? 'Balanced time commitment, efficient workouts'
                : duration === 60
                  ? 'Standard workout length with adequate rest'
                  : 'Extended sessions for comprehensive training'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  durationCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryExtraLight,
  },
  durationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  durationTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  durationDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    paddingLeft: 30,
  },
  selectedDescription: {
    color: theme.colors.text,
  },
});

export default DurationSelector;