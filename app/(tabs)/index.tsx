import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { getGreeting } from '@/utils/helpers';
import { Dumbbell } from 'lucide-react-native';
import DailyWorkoutCard from '@/components/home/DailyWorkoutCard';
import ProgressStats from '@/components/home/ProgressStats';

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useAuthStore();
  const { currentPlan, workoutHistory } = useWorkoutStore();

  const today = new Date();

  // Determine today's workout based on the plan order rather than the
  // numerical day of the week. This prevents mismatches when the plan
  // length doesn't align with a 7‑day week.
  const todayIndex = new Date().getDay() % (currentPlan?.workouts?.length || 1);
  const todayWorkout = currentPlan?.workouts?.[todayIndex];

  // A workout is considered available today if it's not a rest day and has
  // at least one exercise.
  const hasWorkoutToday =
    todayWorkout?.name !== 'Rest' &&
    (todayWorkout?.exercises?.length || 0) > 0;

  const startWorkout = () => {
    router.push('/workout/session');
  };

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const completedThisWeek = workoutHistory.filter(h => {
    const d = new Date(h.date);
    return d >= startOfWeek && d <= endOfWeek;
  }).length;

  const totalWorkoutsThisWeek = currentPlan?.workouts?.length || 0;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {!currentPlan || !currentPlan.workouts || currentPlan.workouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.greeting}>
              {getGreeting()}, {userData?.fullName?.split(' ')[0]} 👋
            </Text>
            
            <View style={styles.emptyStateContent}>
              <View style={styles.iconContainer}>
                <Dumbbell size={48} color={theme.colors.primary} />
              </View>
              
              <Text style={styles.emptyTitle}>Ready to start your journey?</Text>
              <Text style={styles.emptyDescription}>
                Start your strength journey with a personalised workout plan.
              </Text>
              
              <Button
                title="Create My Plan"
                onPress={() => router.push('/plan/start')}
                style={styles.createButton}
              />
            </View>
          </View>
        ) : (
          <View style={styles.planContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}, {userData?.fullName?.split(' ')[0]} 👋
            </Text>

            {hasWorkoutToday ? (
              <DailyWorkoutCard workout={todayWorkout} onPress={startWorkout} />
            ) : (
              <View style={styles.emptyStateContent}>
                <Text style={styles.emptyTitle}>Rest Day</Text>
                <Text style={styles.emptyDescription}>
                  No workout scheduled for today.
                </Text>
              </View>
            )}

            <ProgressStats
              completed={completedThisWeek}
              total={totalWorkoutsThisWeek}
              totalWorkouts={workoutHistory.length}
            />
            <Button
              title="Change My Plan"
              type="outline"
              onPress={() => router.push('/plan/start')}
              style={styles.changePlanButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 24,
  },
  emptyStateContent: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  createButton: {
    width: '100%',
  },
  changePlanButton: {
    marginTop: 20,
    width: '100%',
  },
  planContainer: {
    padding: 20,
  },
});
