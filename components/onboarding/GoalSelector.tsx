import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Dumbbell, Zap, Heart, Target } from 'lucide-react-native';

interface GoalSelectorProps {
  selected: string;
  onSelect: (goal: string) => void;
}

const GoalSelector: React.FC<GoalSelectorProps> = ({ selected, onSelect }) => {
  const goals = [
    {
      id: 'strength',
      title: 'Strength',
      description: 'Focus on getting stronger and building functional fitness',
      icon: (isSelected: boolean) => (
        <Dumbbell 
          size={28} 
          color={isSelected ? theme.colors.primary : theme.colors.textLight} 
        />
      ),
    },
    {
      id: 'toning',
      title: 'Toning',
      description: 'Focus on sculpting and defining your physique',
      icon: (isSelected: boolean) => (
        <Heart 
          size={28} 
          color={isSelected ? theme.colors.primary : theme.colors.textLight} 
        />
      ),
    },
    {
      id: 'confidence',
      title: 'Confidence',
      description: 'Balanced approach to feeling stronger and more capable',
      icon: (isSelected: boolean) => (
        <Target 
          size={28} 
          color={isSelected ? theme.colors.primary : theme.colors.textLight} 
        />
      ),
    },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              selected === goal.id && styles.selectedCard
            ]}
            onPress={() => onSelect(goal.id)}
          >
            <View 
              style={[
                styles.iconContainer,
                selected === goal.id && styles.selectedIconContainer
              ]}
            >
              {goal.icon(selected === goal.id)}
            </View>
            <Text 
              style={[
                styles.goalTitle,
                selected === goal.id && styles.selectedText
              ]}
            >
              {goal.title}
            </Text>
            <Text style={styles.goalDescription}>{goal.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryExtraLight,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  selectedIconContainer: {
    backgroundColor: theme.colors.primaryLight,
  },
  goalTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  goalDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

export default GoalSelector;