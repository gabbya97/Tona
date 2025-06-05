import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { Trophy } from 'lucide-react-native';
import { PersonalRecord } from '@/stores/progressStore';

interface PersonalRecordCardProps {
  record: PersonalRecord;
}

const PersonalRecordCard: React.FC<PersonalRecordCardProps> = ({ record }) => {
  const recordDate = new Date(record.date);
  const formattedDate = recordDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Trophy size={20} color={theme.colors.accent} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.exerciseName}>{record.exerciseName}</Text>
        <Text style={styles.recordDetails}>
          {record.weight} {record.weight === 1 ? 'lb' : 'lbs'} × {record.reps} {record.reps === 1 ? 'rep' : 'reps'}
        </Text>
      </View>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  exerciseName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 2,
  },
  recordDetails: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  date: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
  },
});

export default PersonalRecordCard;