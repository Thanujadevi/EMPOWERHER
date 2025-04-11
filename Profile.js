import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';

const ProfileItem = ({ title, value, icon, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemIcon}>
      <Icon name={icon} size={24} color={theme.colors.primary} />
    </View>
    <View style={styles.profileItemContent}>
      <Text style={styles.profileItemTitle}>{title}</Text>
      <Text style={styles.profileItemValue}>{value}</Text>
    </View>
    <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
  </TouchableOpacity>
);

const Profile = () => {
  const navigation = useNavigation();
  const { user, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [isEditing, setIsEditing] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant camera roll permissions to change your profile picture.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        // In a real app, you would upload this image to your backend
        // For now, we'll just update the local state
        updateUserProfile({ profileImage: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    // In a real app, you would navigate to an edit profile screen
    // For now, we'll just show an alert
    Alert.alert(
      'Edit Profile',
      'This feature is coming soon!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const handleEmergencyContacts = () => {
    navigation.navigate('EmergencyContactSetup');
  };

  const handleVoiceEnrollment = () => {
    navigation.navigate('VoiceEnrollment');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Icon name="cog" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Icon name="account" size={40} color={theme.colors.textSecondary} />
                </View>
              )}
              <View style={styles.editImageButton}>
                <Icon name="camera" size={16} color={theme.colors.background} />
              </View>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
          
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={handleEditProfile}
            style={styles.editButton}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <ProfileItem
            title="Full Name"
            value={user?.name || 'Not set'}
            icon="account"
            onPress={handleEditProfile}
          />
          <ProfileItem
            title="Email"
            value={user?.email || 'Not set'}
            icon="email"
            onPress={handleEditProfile}
          />
          <ProfileItem
            title="Phone"
            value={user?.phone || 'Not set'}
            icon="phone"
            onPress={handleEditProfile}
          />
          <ProfileItem
            title="Address"
            value={user?.address || 'Not set'}
            icon="map-marker"
            onPress={handleEditProfile}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          <ProfileItem
            title="Emergency Contacts"
            value={`${user?.emergencyContacts?.length || 0} contacts`}
            icon="account-group"
            onPress={handleEmergencyContacts}
          />
          <ProfileItem
            title="Voice Enrollment"
            value={user?.voiceEnrolled ? 'Enrolled' : 'Not enrolled'}
            icon="microphone"
            onPress={handleVoiceEnrollment}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileItem
            title="Account Type"
            value="Standard User"
            icon="shield-account"
            onPress={() => {}}
          />
          <ProfileItem
            title="Member Since"
            value={user?.createdAt || 'January 2023'}
            icon="calendar"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 60 : theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  settingsButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  profileName: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  editButton: {
    width: '50%',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  profileItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  profileItemContent: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: theme.typography.md,
    fontWeight: '500',
    color: theme.colors.text,
  },
  profileItemValue: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});

export default Profile; 