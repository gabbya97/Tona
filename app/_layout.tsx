import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold
} from '@expo-google-fonts/outfit';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { useAuthStore } from '@/stores/authStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { loadCurrentPlan } from '@/utils/storage';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const { isAuthenticated } = useAuthStore();
  const { setCurrentPlan } = useWorkoutStore();

  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Regular': Outfit_400Regular,
    'Outfit-Medium': Outfit_500Medium,
    'Outfit-SemiBold': Outfit_600SemiBold,
    'Outfit-Bold': Outfit_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Medium': Montserrat_500Medium,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Load saved workout plan on startup
  useEffect(() => {
    (async () => {
      const storedPlan = await loadCurrentPlan();
      if (storedPlan) {
        setCurrentPlan(storedPlan);
      }
    })();
  }, []);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="welcome" options={{ animation: 'fade' }} />
            <Stack.Screen name="signup" options={{ animation: 'slide-from-right' }} />
          </>
        ) : (
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        )}
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
