import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { getGreeting, getWeekStart } from '@/utils/helpers';
import { Dumbbell } from 'lucide-react-native';
import ProgressStats from '@/components/home/ProgressStats';
import WeeklyWorkoutCard from '@/components/home/WeeklyWorkoutCard';

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useAuthStore();
  const { currentPlan, workoutHistory, skippedWorkouts } = useWorkoutStore();

  const startOfWeek = getWeekStart();

  // Workouts completed this week
  const completedThisWeek = workoutHistory?.filter(w => {
    const date = new Date(w.date);
    return date >= startOfWeek;
  }) || [];

  const skippedThisWeek = skippedWorkouts?.filter(
    w => w.weekStart === startOfWeek.toISOString()
  ) || [];
  const skippedIndices = skippedThisWeek.map(w => w.index);

  const totalPerWeek = currentPlan?.workouts?.length || 0;

  const nextIndex = completedThisWeek.length + skippedIndices.length;
  const allDone = nextIndex >= totalPerWeek;

  const completedIndices: number[] = [];
  for (let i = 0; i < nextIndex; i++) {
    if (!skippedIndices.includes(i)) {
      completedIndices.push(i);
    }
  }

  const workoutsWithStatus =
    currentPlan?.workouts?.map((w, idx) => {
      let status: 'Pending' | 'Completed' | 'Skipped';
      if (skippedIndices.includes(idx)) status = 'Skipped';
      else if (completedIndices.includes(idx)) status = 'Completed';
      else status = 'Pending';
      return { workout: w, status };
    }) || [];

  
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

            <ProgressStats
              completed={completedThisWeek.length}
              total={totalPerWeek}
              totalWorkouts={workoutHistory.length}
            />

            {allDone ? (
              <View style={styles.allDoneContainer}>
                <Text style={styles.emptyTitle}>You’ve smashed your plan for the week!</Text>
                <Button
                  title="Repeat a workout"
                  onPress={() => router.push('/workout/bonus')}
                  type="secondary"
                  style={styles.createButton}
                />
              </View>
            ) : null}

            <View style={styles.weekList}>
              {workoutsWithStatus.map((item, index) => (
                <WeeklyWorkoutCard
                  key={index}
                  index={index}
                  workout={item.workout}
                  status={item.status as any}
                  isNext={index === nextIndex}
                  onPress={() =>
                    router.push({
                      pathname: '/workout/session',
                      params: { id: index.toString() }
                    })
                  }
                />
              ))}
            </View>

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
  weekList: {
    marginTop: 20,
  },
  allDoneContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    ...theme.shadows.small,
  },
  planContainer: {
    padding: 20,
  },
});
