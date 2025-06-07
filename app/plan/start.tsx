import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { useWorkoutStore } from '@/stores/workoutStore';
// Simple template-based generator
import { generateSimplePlan } from '@/utils/simplePlanGenerator';
import GoalSelector from '@/components/plan/GoalSelector';
import LocationSelector from '@/components/plan/LocationSelector';
import DaysSelector from '@/components/plan/DaysSelector';
import DurationSelector from '@/components/plan/DurationSelector';
import FocusAreasSelector from '@/components/plan/FocusAreasSelector';
import { ArrowLeft } from 'lucide-react-native';

export default function PlanStartScreen() {
  const router = useRouter();
  const { setCurrentPlan } = useWorkoutStore();
  
  const [step, setStep] = useState(0);
  const [planData, setPlanData] = useState({
    goal: '',
    location: '',
    trainingFocus: [] as string[],
    daysPerWeek: 3,
    sessionDuration: 45,
  });
  
  const updatePlanData = (key: string, value: any) => {
    setPlanData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  
  const handlePlanSubmit = () => {
    const plan = generateSimplePlan({
      goal: planData.goal,
      location: planData.location,
      daysPerWeek: planData.daysPerWeek,
      workoutDuration: planData.sessionDuration,
    });
    console.log('Generated plan:', plan); // debug log

    // Ensure a valid workout array exists
    if (!plan.workouts || plan.workouts.length === 0) {
      // fallback dummy workout if planner fails
      plan.workouts = [
        {
          day: new Date().getDay(),
          name: 'Full Body Workout',
          type: 'Full Body',
          duration: planData.sessionDuration,
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 10 },
            { name: 'Squats', sets: 3, reps: 15 },
          ],
        },
      ];
    }

    setCurrentPlan(plan);
    router.replace('/(tabs)');
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 0:
        return !planData.goal;
      case 1:
        return !planData.location;
      case 2:
        return planData.trainingFocus.length === 0;
      case 3:
        return !planData.daysPerWeek;
      case 4:
        return !planData.sessionDuration;
      default:
        return false;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          icon={<ArrowLeft size={24} color={theme.colors.text} />}
          onPress={handleBack}
          type="outline"
          style={styles.backButton}
        />
        <Text style={styles.title}>Create Your Plan</Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {step === 0 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>What's your goal?</Text>
            <Text style={styles.stepDescription}>
              Choose your primary fitness goal and we'll customize your plan accordingly.
            </Text>
            <GoalSelector
              selected={planData.goal}
              onSelect={(goal) => updatePlanData('goal', goal)}
            />
          </View>
        )}
        
        {step === 1 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>Where do you train?</Text>
            <Text style={styles.stepDescription}>
              We'll tailor your workouts based on available equipment.
            </Text>
            <LocationSelector
              selected={planData.location}
              onSelect={(location) => updatePlanData('location', location)}
            />
          </View>
        )}
        
        {step === 2 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>What areas would you like to focus on?</Text>
            <Text style={styles.stepDescription}>
              Choose as many as you like — this helps us tailor your training.
            </Text>
            <FocusAreasSelector
              selected={planData.trainingFocus}
              onSelect={(areas) => updatePlanData('trainingFocus', areas)}
            />
          </View>
        )}

        {step === 3 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>How many days can you train?</Text>
            <Text style={styles.stepDescription}>
              Choose a schedule that fits your lifestyle.
            </Text>
            <DaysSelector
              selected={planData.daysPerWeek}
              onSelect={(days) => updatePlanData('daysPerWeek', days)}
            />
          </View>
        )}

        {step === 4 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>How long is each session?</Text>
            <Text style={styles.stepDescription}>
              Select a duration that works best for you.
            </Text>
            <DurationSelector
              selected={planData.sessionDuration}
              onSelect={(duration) => updatePlanData('sessionDuration', duration)}
            />
          </View>
        )}
        
      </ScrollView>
      
      <View style={styles.footer}>
        {step === 4 ? (
          <Button
            title="Create My Plan"
            onPress={handlePlanSubmit}
            disabled={isNextDisabled()}
            style={styles.nextButton}
          />
        ) : (
          <Button
            title="Continue"
            onPress={handleNext}
            disabled={isNextDisabled()}
            style={styles.nextButton}
          />
        )}
      </View>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  step: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: theme.colors.textLight,
    marginBottom: 24,
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  nextButton: {
    width: '100%',
  },
});