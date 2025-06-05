import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, CirclePlus as PlusCircle, TrendingUp, Trophy } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '@/constants/theme';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useProgressStore } from '@/stores/progressStore';
import ProgressChart from '@/components/progress/ProgressChart';
import PersonalRecordCard from '@/components/progress/PersonalRecordCard';
import Button from '@/components/ui/Button';

export default function ProgressScreen() {
  const router = useRouter();
  const { workoutHistory } = useWorkoutStore();
  const { progressPhotos, addProgressPhoto, personalRecords } = useProgressStore();
  const [activeTab, setActiveTab] = useState('stats');
  
  const takePhoto = async () => {
    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Add photo to progress photos
      addProgressPhoto({
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        date: new Date().toISOString(),
        note: 'Progress photo',
      });
    }
  };
  
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
      aspect: [3, 4],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Add photo to progress photos
      addProgressPhoto({
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        date: new Date().toISOString(),
        note: 'Progress photo',
      });
    }
  };
  
  // Calculate workout streak
  const calculateStreak = () => {
    if (!workoutHistory || workoutHistory.length === 0) return 0;
    
    let streak = 1;
    let lastWorkoutDate = new Date(workoutHistory[0].date);
    
    for (let i = 1; i < workoutHistory.length; i++) {
      const currentWorkoutDate = new Date(workoutHistory[i].date);
      const dayDiff = Math.floor(
        (lastWorkoutDate.getTime() - currentWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff <= 2) { // Allow 1 day gap
        streak++;
        lastWorkoutDate = currentWorkoutDate;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
      </View>
      
      <View style={styles.tabs}>
        <View 
          style={[
            styles.tabButton, 
            activeTab === 'stats' && styles.activeTabButton
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'stats' && styles.activeTabText
            ]}
            onPress={() => setActiveTab('stats')}
          >
            Stats
          </Text>
        </View>
        <View 
          style={[
            styles.tabButton, 
            activeTab === 'photos' && styles.activeTabButton
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'photos' && styles.activeTabText
            ]}
            onPress={() => setActiveTab('photos')}
          >
            Photos
          </Text>
        </View>
        <View 
          style={[
            styles.tabButton, 
            activeTab === 'records' && styles.activeTabButton
          ]}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'records' && styles.activeTabText
            ]}
            onPress={() => setActiveTab('records')}
          >
            Records
          </Text>
        </View>
      </View>
      
      {activeTab === 'stats' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Trophy size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>
                {workoutHistory?.length || 0}
              </Text>
              <Text style={styles.statLabel}>
                Workouts
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <TrendingUp size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>
                {calculateStreak()}
              </Text>
              <Text style={styles.statLabel}>
                Streak
              </Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Trophy size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>
                {personalRecords?.length || 0}
              </Text>
              <Text style={styles.statLabel}>
                PRs Set
              </Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Weekly Workouts</Text>
            <ProgressChart workoutHistory={workoutHistory} />
          </View>
          
          <View style={styles.recentRecordsContainer}>
            <Text style={styles.recentRecordsTitle}>Recent Personal Records</Text>
            
            {personalRecords && personalRecords.length > 0 ? (
              personalRecords.slice(0, 3).map((record, index) => (
                <PersonalRecordCard key={index} record={record} />
              ))
            ) : (
              <View style={styles.emptyRecordsContainer}>
                <Text style={styles.emptyRecordsText}>
                  No personal records yet. Complete workouts to set new records!
                </Text>
              </View>
            )}
            
            {personalRecords && personalRecords.length > 0 && (
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => setActiveTab('records')}
              >
                <Text style={styles.viewAllButtonText}>View All Records</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
      
      {activeTab === 'photos' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.photoActions}>
            <Button 
              title="Take New Photo" 
              icon={<Camera size={18} color={theme.colors.white} />}
              onPress={takePhoto}
              style={styles.photoButton}
            />
            <Button 
              title="Upload from Gallery" 
              type="secondary"
              onPress={pickImage}
              style={styles.photoButton}
            />
          </View>
          
          <Text style={styles.photoGalleryTitle}>Progress Gallery</Text>
          
          {progressPhotos && progressPhotos.length > 0 ? (
            <View style={styles.photoGrid}>
              {progressPhotos.map((photo, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.photoItem}
                  onPress={() => router.push({
                    pathname: '/progress/photo-detail',
                    params: { id: photo.id }
                  })}
                >
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                  <Text style={styles.photoDate}>
                    {new Date(photo.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyPhotosContainer}>
              <View style={styles.emptyPhotosIcon}>
                <Camera size={40} color={theme.colors.textLight} />
              </View>
              <Text style={styles.emptyPhotosText}>
                No progress photos yet. Take your first photo to start tracking your physical changes!
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      
      {activeTab === 'records' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.recordsTitle}>Your Personal Records</Text>
          
          {personalRecords && personalRecords.length > 0 ? (
            personalRecords.map((record, index) => (
              <PersonalRecordCard key={index} record={record} />
            ))
          ) : (
            <View style={styles.emptyRecordsContainer}>
              <View style={styles.emptyRecordsIcon}>
                <Trophy size={40} color={theme.colors.textLight} />
              </View>
              <Text style={styles.emptyRecordsText}>
                No personal records yet. Complete workouts to set new records!
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: theme.colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  tabText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.textLight,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
    ...theme.shadows.small,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
    ...theme.shadows.small,
  },
  statCard: {
    width: '30%',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.textLight,
  },
  chartContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...theme.shadows.small,
  },
  chartTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 16,
  },
  recentRecordsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    ...theme.shadows.small,
  },
  recentRecordsTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 16,
  },
  emptyRecordsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyRecordsText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  emptyRecordsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  viewAllButtonText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photoButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  photoGalleryTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  photoItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  photoDate: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: theme.colors.white,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  emptyPhotosContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    ...theme.shadows.small,
  },
  emptyPhotosIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyPhotosText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  recordsTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
});