import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Zap, Timer, Flame } from 'lucide-react-native';

interface ExtrasSelectorProps {
  selected: string[];
  onSelect: (extras: string[]) => void;
}

const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({ selected, onSelect }) => {
  const extras = [
    {
      id: 'quick',
      title: 'Quick Workouts',
      description: '15-20 minute express sessions',
      icon: Timer,
    },
    {
      id: 'finishers',
      title: 'Finishers',
      description: '5-minute intense workout endings',
      icon: Flame,
    },
    {
      id: 'challenges',
      title: 'Weekly Challenges',
      description: 'Optional bonus exercises',
      icon: Zap,
    },
  ];
  
  const toggleExtra = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(item => item !== id));
    } else {
      onSelect([...selected, id]);
    }
  };
  
  return (
    <View style={styles.container}>
      {extras.map((extra) => {
        const Icon = extra.icon;
        const isSelected = selected.includes(extra.id);
        
        return (
          <TouchableOpacity
            key={extra.id}
            style={[
              styles.extraItem,
              isSelected && styles.selectedItem
            ]}
            onPress={() => toggleExtra(extra.id)}
          >
            <View style={[
              styles.iconContainer,
              isSelected && styles.selectedIconContainer
            ]}>
              <Icon
                size={24}
                color={isSelected ? theme.colors.primary : theme.colors.textLight}
              />
            </View>
            
            <Text style={[
              styles.title,
              isSelected && styles.selectedTitle
            ]}>
              {extra.title}
            </Text>
            
            <Text style={[
              styles.description,
              isSelected && styles.selectedDescription
            ]}>
              {extra.description}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  extraItem: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    alignItems: 'center',
  },
  selectedItem: {
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
  title: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 4,
  },
  selectedTitle: {
    color: theme.colors.primary,
  },
  description: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  selectedDescription: {
    color: theme.colors.text,
  },
});

export default ExtrasSelector;