import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  // Create an array of step indicators
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  
  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View 
          key={step}
          style={[
            styles.step,
            step === currentStep - 1 ? styles.activeStep : (
              step < currentStep - 1 ? styles.completedStep : styles.inactiveStep
            )
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeStep: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  completedStep: {
    backgroundColor: theme.colors.primaryLight,
  },
  inactiveStep: {
    backgroundColor: theme.colors.borderLight,
  },
});

export default OnboardingProgress;