import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const PermissionItem = ({ title, description, icon, status, onRequest }) => (
  <View style={styles.permissionItem}>
    <View style={styles.permissionIcon}>
      <Icon name={icon} size={32} color={theme.colors.primary} />
    </View>
    <View style={styles.permissionContent}>
      <Text style={styles.permissionTitle}>{title}</Text>
      <Text style={styles.permissionDescription}>{description}</Text>
      <Text style={[
        styles.permissionStatus,
        status === 'granted' && styles.statusGranted,
        status === 'denied' && styles.statusDenied,
      ]}>
        {status === 'granted' ? 'Permission Granted' : 
         status === 'denied' ? 'Permission Denied' : 'Permission Required'}
      </Text>
    </View>
    <Button
      title={status === 'granted' ? 'Granted' : 'Allow'}
      variant={status === 'granted' ? 'outline' : 'primary'}
      size="small"
      disabled={status === 'granted'}
      onPress={onRequest}
    />
  </View>
);

const PermissionRequestScreen = () => {
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState({
    camera: 'undetermined',
    location: 'undetermined',
    notifications: 'undetermined',
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Check camera permission
      const cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
      setPermissions(prev => ({
        ...prev,
        camera: cameraStatus.status,
      }));

      // Check location permission
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setPermissions(prev => ({
        ...prev,
        location: locationStatus.status,
      }));

      // Check notification permission
      const notificationStatus = await Notifications.getPermissionsAsync();
      setPermissions(prev => ({
        ...prev,
        notifications: notificationStatus.status,
      }));
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setPermissions(prev => ({
        ...prev,
        camera: status,
      }));
      
      if (status === 'denied') {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to record emergency evidence. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissions(prev => ({
        ...prev,
        location: status,
      }));
      
      if (status === 'denied') {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to provide emergency services with your location. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissions(prev => ({
        ...prev,
        notifications: status,
      }));
      
      if (status === 'denied') {
        Alert.alert(
          'Notification Permission Required',
          'This app needs notification access to alert you about emergencies. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleContinue = () => {
    // Check if all permissions are granted
    const allGranted = Object.values(permissions).every(status => status === 'granted');
    
    if (allGranted) {
      navigation.navigate('EmergencyContactSetup');
    } else {
      Alert.alert(
        'Permissions Required',
        'Please grant all permissions to continue. These permissions are essential for the app to function properly.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Permissions Required</Text>
          <Text style={styles.subtitle}>
            The following permissions are needed for the app to function properly
          </Text>
        </View>

        <View style={styles.permissionsContainer}>
          <PermissionItem
            title="Camera Access"
            description="Required to record emergency evidence"
            icon="camera"
            status={permissions.camera}
            onRequest={requestCameraPermission}
          />
          
          <PermissionItem
            title="Location Access"
            description="Required to share your location during emergencies"
            icon="map-marker"
            status={permissions.location}
            onRequest={requestLocationPermission}
          />
          
          <PermissionItem
            title="Notifications"
            description="Required to receive emergency alerts"
            icon="bell"
            status={permissions.notifications}
            onRequest={requestNotificationPermission}
          />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={Object.values(permissions).some(status => status !== 'granted')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
  permissionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  permissionDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  permissionStatus: {
    fontSize: theme.typography.xs,
    color: theme.colors.warning,
  },
  statusGranted: {
    color: theme.colors.success,
  },
  statusDenied: {
    color: theme.colors.error,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default PermissionRequestScreen; 