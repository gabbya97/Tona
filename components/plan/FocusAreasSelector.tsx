import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface FocusAreasSelectorProps {
  selected: string[];
  onSelect: (areas: string[]) => void;
}

const FocusAreasSelector: React.FC<FocusAreasSelectorProps> = ({ selected, onSelect }) => {
  const areas = [
    { id: 'glutes_legs', title: 'Glutes and Legs' },
    { id: 'upper_body', title: 'Upper Body (Arms, Shoulders, Back)' },
    { id: 'core_abs', title: 'Core and Abs' },
    { id: 'mobility', title: 'Mobility and Flexibility' },
    { id: 'conditioning', title: 'Conditioning' },
    { id: 'full_body', title: 'Full Body Strength' },
  ];

  const toggleArea = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(item => item !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  return (
    <View style={styles.container}>
      {areas.map(area => {
        const isSelected = selected.includes(area.id);
        return (
          <TouchableOpacity
            key={area.id}
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => toggleArea(area.id)}
          >
            <Text style={[styles.title, isSelected && styles.selectedTitle]}>
              {area.title}
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
  item: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedItem: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryExtraLight,
  },
  title: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
  },
  selectedTitle: {
    color: theme.colors.primary,
  },
});

export default FocusAreasSelector;
