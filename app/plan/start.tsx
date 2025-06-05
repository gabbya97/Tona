import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { useWorkoutStore } from '@/stores/workoutStore';
import { generateWorkoutPlan } from '@/utils/workoutPlanner';
import GoalSelector from '@/components/plan/GoalSelector';
import LocationSelector from '@/components/plan/LocationSelector';
import DaysSelector from '@/components/plan/DaysSelector';
import DurationSelector from '@/components/plan/DurationSelector';
import ExtrasSelector from '@/components/plan/ExtrasSelector';
import { ArrowLeft } from 'lucide-react-native';

export default function PlanStartScreen() {
  const router = useRouter();
  const { setCurrentPlan } = useWorkoutStore();
  
  const [step, setStep] = useState(0);
  const [planData, setPlanData] = useState({
    goal: '',
    location: '',
    daysPerWeek: 3,
    sessionDuration: 45,
    extras: [],
  });
  
  const updatePlanData = (key: string, value: any) => {
    setPlanData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      completePlanSetup();
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  
  const completePlanSetup = () => {
    const plan = generateWorkoutPlan({
      goal: planData.goal,
      workoutLocation: planData.location,
      daysPerWeek: planData.daysPerWeek,
      workoutDuration: planData.sessionDuration,
      extras: planData.extras,
    });
    
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
        return !planData.daysPerWeek;
      case 3:
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
        
        {step === 3 && (
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
        
        {step === 4 && (
          <View style={styles.step}>
            <Text style={styles.stepTitle}>Any extras?</Text>
            <Text style={styles.stepDescription}>
              Optional add-ons to enhance your training.
            </Text>
            <ExtrasSelector
              selected={planData.extras}
              onSelect={(extras) => updatePlanData('extras', extras)}
            />
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={step === 4 ? "Create My Plan" : "Continue"}
          onPress={handleNext}
          disabled={isNextDisabled()}
          style={styles.nextButton}
        />
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