import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Chrome as Home, Building2 } from 'lucide-react-native';

interface LocationSelectorProps {
  selected: string;
  onSelect: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  selected, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.locationCard,
          selected === 'home' && styles.selectedCard
        ]}
        onPress={() => onSelect('home')}
      >
        <View 
          style={[
            styles.iconContainer,
            selected === 'home' && styles.selectedIconContainer
          ]}
        >
          <Home 
            size={36} 
            color={selected === 'home' ? theme.colors.primary : theme.colors.textLight} 
          />
        </View>
        <Text 
          style={[
            styles.locationTitle,
            selected === 'home' && styles.selectedText
          ]}
        >
          Home
        </Text>
        <Text style={styles.locationDescription}>
          Limited equipment, bodyweight focus
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.locationCard,
          selected === 'gym' && styles.selectedCard
        ]}
        onPress={() => onSelect('gym')}
      >
        <View 
          style={[
            styles.iconContainer,
            selected === 'gym' && styles.selectedIconContainer
          ]}
        >
          <Building2 
            size={36} 
            color={selected === 'gym' ? theme.colors.primary : theme.colors.textLight} 
          />
        </View>
        <Text 
          style={[
            styles.locationTitle,
            selected === 'gym' && styles.selectedText
          ]}
        >
          Gym
        </Text>
        <Text style={styles.locationDescription}>
          Full range of equipment available
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryExtraLight,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  selectedIconContainer: {
    backgroundColor: theme.colors.primaryLight,
  },
  locationTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 8,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  locationDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

export default LocationSelector;