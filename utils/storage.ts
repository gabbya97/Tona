import * as SecureStore from 'expo-secure-store';
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