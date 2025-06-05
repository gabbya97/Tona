import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  User, 
  Settings, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Dumbbell, 
  LogOut,
  Bell
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { saveUserProfile } from '@/utils/storage';
import Button from '@/components/ui/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, setUserProfile, updateUserProfile } = useUserStore();
  const { setIsOnboarded } = useOnboardingStore();
  
  const pickImage = async () => {
    // Ask for media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Update user avatar
      const updatedProfile = {
        ...userProfile,
        avatar: result.assets[0].uri
      };
      updateUserProfile(updatedProfile);
      saveUserProfile(updatedProfile);
    }
  };
  
  const logOut = () => {
    // Reset onboarding state
    setIsOnboarded(false);
    
    // Clear user profile
    setUserProfile(null);
    
    // Navigate to onboarding
    router.replace('/welcome');
  };

  const notificationSettings = [
    { 
      id: 'workoutReminders', 
      title: 'Workout Reminders', 
      description: 'Receive reminders for scheduled workouts',
      value: userProfile?.settings?.workoutReminders ?? true
    },
    { 
      id: 'progressUpdates', 
      title: 'Progress Updates', 
      description: 'Get weekly progress summaries',
      value: userProfile?.settings?.progressUpdates ?? true
    }
  ];
  
  const toggleSetting = (id) => {
    const updatedSettings = {
      ...userProfile.settings,
      [id]: !userProfile.settings?.[id]
    };
    
    const updatedProfile = {
      ...userProfile,
      settings: updatedSettings
    };
    
    updateUserProfile(updatedProfile);
    saveUserProfile(updatedProfile);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/profile/settings')}
        >
          <Settings size={22} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={pickImage}
          >
            {userProfile?.avatar ? (
              <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <User size={40} color={theme.colors.primaryLight} />
              </View>
            )}
            <View style={styles.editAvatarButton}>
              <Text style={styles.editAvatarText}>Edit</Text>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.userName}>{userProfile?.name || 'Tona User'}</Text>
          <Text style={styles.userInfo}>{userProfile?.fitnessLevel || 'Beginner'} • {userProfile?.goal || 'Get Stronger'}</Text>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/profile/edit')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Workout Preferences</Text>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceIcon}>
              <Dumbbell size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Workout Location</Text>
              <Text style={styles.preferenceValue}>{userProfile?.workoutLocation || 'Gym'}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textLight} />
          </View>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceIcon}>
              <Calendar size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Workouts Per Week</Text>
              <Text style={styles.preferenceValue}>{userProfile?.daysPerWeek || 3} days</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textLight} />
          </View>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceIcon}>
              <Clock size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Workout Duration</Text>
              <Text style={styles.preferenceValue}>{userProfile?.workoutDuration || 45} minutes</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textLight} />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          {notificationSettings.map((setting) => (
            <View key={setting.id} style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Bell size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
              <Switch
                value={setting.value}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: theme.colors.borderLight, true: theme.colors.primaryLight }}
                thumbColor={setting.value ? theme.colors.primary : theme.colors.textLight}
              />
            </View>
          ))}
        </View>
        
        <View style={styles.logoutContainer}>
          <Button
            title="Log Out"
            type="outline"
            icon={<LogOut size={18} color={theme.colors.error} />}
            textStyle={{ color: theme.colors.error }}
            style={styles.logoutButton}
            onPress={logOut}
          />
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
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
  },
  profileCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editAvatarText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.white,
  },
  userName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: 4,
  },
  userInfo: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editProfileText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  sectionContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    ...theme.shadows.small,
  },
  sectionTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 2,
  },
  preferenceValue: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  logoutButton: {
    width: '100%',
  },
});