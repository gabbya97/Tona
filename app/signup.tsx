import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      dateOfBirth: '',
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please use format MM/DD/YYYY';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      signUp(formData);
      router.replace('/(tabs)');
    }
  };

  const formatDateInput = (text: string) => {
  // Remove all non-digit characters
  const cleaned = text.replace(/\D+/g, '');

  let formatted = '';
  if (cleaned.length <= 2) {
    formatted = cleaned;
  } else if (cleaned.length <= 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }

  return formatted;
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          icon={<ArrowLeft size={24} color={theme.colors.text} />}
          onPress={() => router.back()}
          type="outline"
          style={styles.backButton}
        />
        <Text style={styles.title}>Create Account</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            placeholder="Choose a username"
            autoCapitalize="none"
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            placeholder="Create a password"
            secureTextEntry
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
<TextInput
  style={[styles.input, errors.dateOfBirth && styles.inputError]}
  value={formData.dateOfBirth}
  onChangeText={(text) =>
    setFormData({ ...formData, dateOfBirth: formatDateInput(text) })
  }
  placeholder="MM/DD/YYYY"
  keyboardType="number-pad"
/>
          {errors.dateOfBirth ? <Text style={styles.errorText}>{errors.dateOfBirth}</Text> : null}
        </View>

        <Button
          title="Create Account"
          onPress={handleSubmit}
          style={styles.button}
        />
      </ScrollView>
    </View>
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
    paddingTop: 60,
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.error,
    marginTop: 4,
  },
  button: {
    marginTop: 20,
  },
});