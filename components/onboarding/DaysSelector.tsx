import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface DaysSelectorProps {
  selected: number;
  onSelect: (days: number) => void;
}

const DaysSelector: React.FC<DaysSelectorProps> = ({ selected, onSelect }) => {
  // Days options from 2 to 6
  const daysOptions = [2, 3, 4, 5, 6];
  
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {daysOptions.map((days) => (
          <TouchableOpacity
            key={days}
            style={[
              styles.option,
              selected === days && styles.selectedOption
            ]}
            onPress={() => onSelect(days)}
          >
            <Text 
              style={[
                styles.optionText,
                selected === days && styles.selectedOptionText
              ]}
            >
              {days}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>
          {selected} days per week
        </Text>
        <Text style={styles.descriptionText}>
          {selected <= 3 
            ? 'Full body workouts, perfect for beginners or busy schedules' 
            : selected === 4 
              ? 'Upper/lower split, great for building strength and muscle' 
              : 'Push/pull/legs split, ideal for focused muscle development'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  option: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 20,
    color: theme.colors.text,
  },
  selectedOptionText: {
    color: theme.colors.white,
  },
  descriptionContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  descriptionTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
});

export default DaysSelector;