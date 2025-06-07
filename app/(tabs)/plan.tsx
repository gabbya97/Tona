import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar as CalendarIcon, CreditCard as Edit3, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { theme } from '@/constants/theme';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useUserStore } from '@/stores/userStore';
import WorkoutPlanCard from '@/components/plan/WorkoutPlanCard';
import Button from '@/components/ui/Button';
import { formatDate, getDayName } from '@/utils/helpers';

export default function PlanScreen() {
  const router = useRouter();
  const { currentPlan, workoutHistory } = useWorkoutStore();
  const { userProfile } = useUserStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const getMarkedDates = () => {
    const markedDates = {};
    
    if (currentPlan?.workouts) {
      // Get all dates in the current month
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        // Check if there's a workout scheduled for this day of week
        const hasWorkout = currentPlan.workouts.some(
          workout => Number(workout.day) === date.getDay()
        );
        
        if (hasWorkout) {
          // Format date as YYYY-MM-DD
          const formattedDate = formatDate(date);
          
          // Check if the workout was completed
          const wasCompleted = workoutHistory?.some(history => 
            formatDate(new Date(history.date)) === formattedDate
          );
          
          markedDates[formattedDate] = {
            marked: true,
            dotColor: wasCompleted ? theme.colors.success : theme.colors.primary,
            selected: formatDate(date) === formatDate(selectedDate),
            selectedColor: theme.colors.primaryLight,
          };
        }
      }
    }
    
    return markedDates;
  };
  
  const getSelectedDayWorkout = () => {
    if (!currentPlan?.workouts) return null;
    
    // Find workout for the selected day of the week
    return currentPlan.workouts.find(
      workout => Number(workout.day) === selectedDate.getDay()
    );
  };
  
  const selectedWorkout = getSelectedDayWorkout();
  const isToday = formatDate(selectedDate) === formatDate(new Date());
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Workout Plan</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/plan/edit')}
        >
          <Edit3 size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <Calendar
            theme={{
              calendarBackground: theme.colors.white,
              textSectionTitleColor: theme.colors.text,
              todayTextColor: theme.colors.primary,
              dayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.textLight,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.white,
              dotColor: theme.colors.primary,
              selectedDotColor: theme.colors.white,
              monthTextColor: theme.colors.text,
              arrowColor: theme.colors.primary,
              textDayFontFamily: 'Outfit-Regular',
              textMonthFontFamily: 'Outfit-SemiBold',
              textDayHeaderFontFamily: 'Outfit-Medium',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
            markedDates={getMarkedDates()}
            onDayPress={day => {
              setSelectedDate(new Date(day.dateString));
            }}
            monthFormat={'MMMM yyyy'}
            enableSwipeMonths={true}
            hideExtraDays={false}
          />
        </View>
        
        <View style={styles.workoutSection}>
          <View style={styles.dateHeaderContainer}>
            <CalendarIcon size={20} color={theme.colors.primary} />
            <Text style={styles.dateHeader}>
              {isToday ? 'Today' : getDayName(selectedDate)}
              {' • '}
              {selectedDate.toLocaleDateString('en-US', {
                month: 'short', 
                day: 'numeric'
              })}
            </Text>
          </View>
          
          {selectedWorkout ? (
            <>
              <WorkoutPlanCard workout={selectedWorkout} />
              
              {isToday && (
                <View style={styles.actionContainer}>
                  <Button 
                    title="Start Workout" 
                    onPress={() => router.push('/workout/session')}
                    style={styles.startButton}
                  />
                </View>
              )}
            </>
          ) : (
            <View style={styles.restDayContainer}>
              <View style={styles.restDayIcon}>
                <AlertCircle size={24} color={theme.colors.textLight} />
              </View>
              <Text style={styles.restDayTitle}>Rest Day</Text>
              <Text style={styles.restDayText}>
                No workout scheduled for this day. Rest and recovery are essential parts of your progress!
              </Text>
              
              {isToday && (
                <TouchableOpacity 
                  style={styles.bonusButton}
                  onPress={() => router.push('/workout/bonus')}
                >
                  <Text style={styles.bonusButtonText}>See Bonus Workouts</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.planSummaryContainer}>
          <Text style={styles.planSummaryTitle}>Your Plan: {currentPlan?.name || 'Custom Plan'}</Text>
          <Text style={styles.planSummaryText}>
            {userProfile?.daysPerWeek || 0} workouts per week • 
            {userProfile?.workoutDuration || 45} min sessions
          </Text>
          <TouchableOpacity 
            style={styles.viewPlanButton}
            onPress={() => router.push('/plan/details')}
          >
            <Text style={styles.viewPlanButtonText}>View Full Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: theme.colors.text,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
  },
  calendarContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  workoutSection: {
    marginHorizontal: 20,
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateHeader: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  startButton: {
    width: '100%',
  },
  restDayContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    ...theme.shadows.small,
  },
  restDayIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  restDayTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  restDayText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  bonusButton: {
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  bonusButtonText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  planSummaryContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    ...theme.shadows.small,
  },
  planSummaryTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 4,
  },
  planSummaryText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginBottom: 16,
  },
  viewPlanButton: {
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  viewPlanButtonText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
});