import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface FitnessLevelSelectorProps {
  selected: string;
  onSelect: (level: string) => void;
}

const FitnessLevelSelector: React.FC<FitnessLevelSelectorProps> = ({ 
  selected, 
  onSelect 
}) => {
  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'New to strength training or returning after a long break',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Some experience with strength training, consistent for 6+ months',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Extensive experience, training consistently for 2+ years',
    },
  ];
  
  return (
    <View style={styles.container}>
      {levels.map((level) => (
        <TouchableOpacity
          key={level.id}
          style={[
            styles.levelCard,
            selected === level.id && styles.selectedCard
          ]}
          onPress={() => onSelect(level.id)}
        >
          <View style={styles.levelTitleContainer}>
            <View 
              style={[
                styles.radioButton,
                selected === level.id && styles.radioButtonSelected
              ]}
            >
              {selected === level.id && <View style={styles.radioButtonInner} />}
            </View>
            <Text 
              style={[
                styles.levelTitle,
                selected === level.id && styles.selectedText
              ]}
            >
              {level.title}
            </Text>
          </View>
          <Text 
            style={[
              styles.levelDescription,
              selected === level.id && styles.selectedDescription
            ]}
          >
            {level.description}
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
  levelCard: {
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
  levelTitleContainer: {
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
  levelTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  levelDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    paddingLeft: 30,
  },
  selectedDescription: {
    color: theme.colors.text,
  },
});

export default FitnessLevelSelector;