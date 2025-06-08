import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { UserProfile } from '@/stores/userStore';

// Fallback storage for web platform
const webStorage = {
  userProfile: null,
};

// Save user profile to storage
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const jsonValue = JSON.stringify(profile);
    
    if (Platform.OS === 'web') {
      localStorage.setItem('tona_user_profile', jsonValue);
    } else {
      await SecureStore.setItemAsync('tona_user_profile', jsonValue);
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
}

// Load user profile from storage
export async function loadUserProfile(): Promise<UserProfile | null> {
  try {
    let jsonValue;
    
    if (Platform.OS === 'web') {
      jsonValue = localStorage.getItem('tona_user_profile');
    } else {
      jsonValue = await SecureStore.getItemAsync('tona_user_profile');
    }
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
}

// Clear user profile from storage
export async function clearUserProfile(): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('tona_user_profile');
    } else {
      await SecureStore.deleteItemAsync('tona_user_profile');
    }
  } catch (error) {
    console.error('Error clearing user profile:', error);
  }
}

// Save workout plan to storage
export async function saveCurrentPlan(plan: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(plan);

    if (Platform.OS === 'web') {
      localStorage.setItem('tona_current_plan', jsonValue);
    } else {
      await AsyncStorage.setItem('tona_current_plan', jsonValue);
    }
  } catch (error) {
    console.error('Error saving workout plan:', error);
  }
}

// Load workout plan from storage
export async function loadCurrentPlan(): Promise<any | null> {
  try {
    let jsonValue;

    if (Platform.OS === 'web') {
      jsonValue = localStorage.getItem('tona_current_plan');
    } else {
      jsonValue = await AsyncStorage.getItem('tona_current_plan');
    }

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading workout plan:', error);
    return null;
  }
}

// Clear workout plan from storage
export async function clearCurrentPlan(): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('tona_current_plan');
    } else {
      await AsyncStorage.removeItem('tona_current_plan');
    }
  } catch (error) {
    console.error('Error clearing workout plan:', error);
  }
}
export const saveWorkoutPlan = async (plan: any) => {
  try {
    await AsyncStorage.setItem('userWorkoutPlan', JSON.stringify(plan));
  } catch (error) {
    console.error('Error saving workout plan:', error);
  }
};

export const getWorkoutPlan = async () => {
  try {
    const storedPlan = await AsyncStorage.getItem('userWorkoutPlan');
    return storedPlan ? JSON.parse(storedPlan) : null;
  } catch (error) {
    console.error('Error loading workout plan:', error);
    return null;
  }
};