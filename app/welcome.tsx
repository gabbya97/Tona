import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { Dumbbell } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Dumbbell size={60} color={theme.colors.primary} />
          <Text style={styles.appName}>Tona</Text>
        </View>

        <Text style={styles.title}>Welcome to Tona</Text>
        <Text style={styles.subtitle}>
          Smart strength training, built for you.
        </Text>
        <Text style={styles.description}>
          Let's create a plan that fits your time, space, and goals.
        </Text>

        <Button
          title="Get started"
          onPress={() => router.push('/signup')}
          style={styles.button}
        />
      </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    color: theme.colors.primary,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 32,
    color: theme.colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: theme.colors.textLight,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
});