import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Dumbbell, Clock, ChartBar as BarChart } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useWorkoutStore } from '@/stores/workoutStore';
import Button from '@/components/ui/Button';
import WorkoutHistoryCard from '@/components/workout/WorkoutHistoryCard';
import { formatDate } from '@/utils/helpers';

export default function WorkoutScreen() {
  const router = useRouter();
  const { currentPlan, workoutHistory } = useWorkoutStore();
  const [activeTab, setActiveTab] = useState('today');
  
  // Get today's workout if any
  const today = new Date();
  const todayWorkout = currentPlan?.workouts?.find(
    workout => workout.day === today.getDay()
  );
  
  // Get last completed workout
  const lastWorkout = workoutHistory && workoutHistory.length > 0 
    ? workoutHistory[0] 
    : null;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout</Text>
      </View>
      
      <View style={styles.tabs}>
        <View 
          style={[
            styles.tabButton, 
            activeTab === 'today' && styles.activeTabButton
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'today' && styles.activeTabText
            ]}
            onPress={() => setActiveTab('today')}
          >
            Today
          </Text>
        </View>
        <View 
          style={[
            styles.tabButton, 
            activeTab === 'history' && styles.activeTabButton
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'history' && styles.activeTabText
            ]}
            onPress={() => setActiveTab('history')}
          >
            History
          </Text>
        </View>
      </View>
      
      {activeTab === 'today' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {todayWorkout ? (
            <View style={styles.todayWorkoutContainer}>
              <View style={styles.workoutCardHeader}>
                <View style={styles.workoutIconContainer}>
                  <Dumbbell size={24} color={theme.colors.white} />
                </View>
                <View style={styles.workoutTitleContainer}>
                  <Text style={styles.workoutType}>{todayWorkout.type}</Text>
                  <Text style={styles.workoutTitle}>{todayWorkout.name}</Text>
                </View>
              </View>
              
              <View style={styles.workoutDetailsContainer}>
                <View style={styles.workoutDetail}>
                  <Clock size={16} color={theme.colors.textLight} />
                  <Text style={styles.workoutDetailText}>
                    {todayWorkout.duration || 45} minutes
                  </Text>
                </View>
                <View style={styles.workoutDetail}>
                  <BarChart size={16} color={theme.colors.textLight} />
                  <Text style={styles.workoutDetailText}>
                    {todayWorkout.exercises?.length || 0} exercises
                  </Text>
                </View>
              </View>
              
              <View style={styles.exerciseListContainer}>
                <Text style={styles.exerciseListTitle}>Exercises</Text>
                {todayWorkout.exercises?.map((exercise, index) => (
                  <View key={index} style={styles.exerciseItem}>
                    <View style={styles.exerciseNumberContainer}>
                      <Text style={styles.exerciseNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseSets}>
                        {exercise.sets} sets • {exercise.reps} reps
                        {exercise.rest && ` • ${exercise.rest}s rest`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              
              <Button 
                title="Start Workout" 
                onPress={() => router.push('/workout/session')}
                style={styles.startButton}
              />
            </View>
          ) : (
            <View style={styles.restDayContainer}>
              <View style={styles.restDayIconContainer}>
                <Dumbbell size={36} color={theme.colors.primaryLight} />
              </View>
              <Text style={styles.restDayTitle}>Rest Day</Text>
              <Text style={styles.restDayText}>
                No workout scheduled for today. Rest and recovery are essential for your progress!
              </Text>
              <Button 
                title="See Bonus Workouts" 
                onPress={() => router.push('/workout/bonus')}
                style={styles.bonusButton}
                type="secondary"
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.historyTitle}>Recent Workouts</Text>
          
          {workoutHistory && workoutHistory.length > 0 ? (
            workoutHistory.map((workout, index) => (
              <WorkoutHistoryCard 
                key={index} 
                workout={workout} 
                onPress={() => router.push({
                  pathname: '/workout/details',
                  params: { id: workout.id }
                })}
              />
            ))
          ) : (
            <View style={styles.emptyHistoryContainer}>
              <Text style={styles.emptyHistoryText}>
                You haven't completed any workouts yet. Start your fitness journey today!
              </Text>
              <Button 
                title="Start First Workout" 
                onPress={() => {
                  setActiveTab('today');
                  if (todayWorkout) {
                    router.push('/workout/session');
                  } else {
                    router.push('/workout/bonus');
                  }
                }}
                style={styles.startFirstButton}
              />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: theme.colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  tabText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todayWorkoutContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.small,
  },
  workoutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  workoutTitleContainer: {
    flex: 1,
  },
  workoutType: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  workoutTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
  workoutDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  workoutDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  workoutDetailText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 6,
  },
  exerciseListContainer: {
    marginBottom: 20,
  },
  exerciseListTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  exerciseNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumber: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 2,
  },
  exerciseSets: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: theme.colors.textLight,
  },
  startButton: {
    width: '100%',
  },
  restDayContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    ...theme.shadows.small,
  },
  restDayIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primaryExtraLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  restDayTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 8,
  },
  restDayText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  bonusButton: {
    width: '100%',
  },
  historyTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
  emptyHistoryContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  emptyHistoryText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  startFirstButton: {
    width: '100%',
  },
});