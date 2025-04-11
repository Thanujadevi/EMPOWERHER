import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';

const SettingItem = ({ title, description, icon, onPress, rightElement }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIconContainer}>
      <Icon name={icon} size={24} color={theme.colors.primary} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {description && <Text style={styles.settingDescription}>{description}</Text>}
    </View>
    {rightElement || <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />}
  </TouchableOpacity>
);

const Settings = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSOSEnabled, setAutoSOSEnabled] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const success = await logout();
            if (success) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Here you would implement account deletion logic
            console.log('Account deletion requested');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            title="Push Notifications"
            description="Receive alerts and updates"
            icon="bell-outline"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#fff' : notificationsEnabled ? theme.colors.primary : theme.colors.border}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <SettingItem
            title="Location Tracking"
            description="Allow app to track your location"
            icon="map-marker-outline"
            rightElement={
              <Switch
                value={locationTrackingEnabled}
                onValueChange={setLocationTrackingEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#fff' : locationTrackingEnabled ? theme.colors.primary : theme.colors.border}
              />
            }
          />
          <SettingItem
            title="Auto SOS"
            description="Automatically trigger SOS in emergencies"
            icon="alert-circle-outline"
            rightElement={
              <Switch
                value={autoSOSEnabled}
                onValueChange={setAutoSOSEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#fff' : autoSOSEnabled ? theme.colors.primary : theme.colors.border}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingItem
            title="Dark Mode"
            description="Use dark theme"
            icon="theme-light-dark"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#fff' : darkModeEnabled ? theme.colors.primary : theme.colors.border}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            title="Emergency Contacts"
            description="Manage your emergency contacts"
            icon="account-group-outline"
            onPress={() => navigation.navigate('EmergencyContactSetup')}
          />
          <SettingItem
            title="Voice Enrollment"
            description="Update your voice samples"
            icon="microphone-outline"
            onPress={() => navigation.navigate('VoiceEnrollment')}
          />
          <SettingItem
            title="Privacy Policy"
            description="Read our privacy policy"
            icon="shield-check-outline"
            onPress={() => console.log('Privacy Policy pressed')}
          />
          <SettingItem
            title="Terms of Service"
            description="Read our terms of service"
            icon="file-document-outline"
            onPress={() => console.log('Terms of Service pressed')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            title="Help & FAQ"
            description="Get help with using the app"
            icon="help-circle-outline"
            onPress={() => console.log('Help & FAQ pressed')}
          />
          <SettingItem
            title="Contact Support"
            description="Get in touch with our support team"
            icon="email-outline"
            onPress={() => console.log('Contact Support pressed')}
          />
          <SettingItem
            title="App Version"
            description="1.0.0"
            icon="information-outline"
            onPress={() => console.log('App Version pressed')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
          <Button
            title="Delete Account"
            variant="outline"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
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
  backButton: {
    padding: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.typography.md,
    fontWeight: '500',
    color: theme.colors.text,
  },
  settingDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  buttonContainer: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  logoutButton: {
    marginBottom: theme.spacing.md,
  },
  deleteButton: {
    borderColor: theme.colors.error,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
});

export default Settings; 