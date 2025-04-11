import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';

const ActiveEmergency = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    // Start location tracking
    let locationSubscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for emergency tracking.');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          setLocation(location);
          // Here you would send the location to your backend
        }
      );
    })();

    // Start vibration pattern
    const vibrationPattern = [0, 1000, 500, 1000];
    Vibration.vibrate(vibrationPattern, true);

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      Vibration.cancel();
    };
  }, []);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      // Here you would upload the recording to your backend
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const handleCancelEmergency = () => {
    Alert.alert(
      'Cancel Emergency',
      'Are you sure you want to cancel the emergency alert?',
      [
        {
          text: 'No, Keep Active',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            Vibration.cancel();
            navigation.navigate('UserDashboard');
          },
        },
      ]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Active</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <Icon name="alert-octagon" size={48} color={theme.colors.error} />
          <Text style={styles.statusText}>Emergency Services Notified</Text>
          <Text style={styles.statusSubtext}>
            Your location is being tracked and shared with emergency contacts
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, isRecording && styles.recordingActive]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Icon
              name={isRecording ? 'stop' : 'microphone'}
              size={32}
              color={isRecording ? theme.colors.error : theme.colors.primary}
            />
            <Text style={styles.actionButtonText}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancelEmergency}
          >
            <Icon name="close" size={32} color={theme.colors.error} />
            <Text style={[styles.actionButtonText, styles.cancelText]}>
              Cancel Emergency
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: theme.colors.error + '10',
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.error,
  },
  timer: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.error,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  statusText: {
    fontSize: theme.typography.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  statusSubtext: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  actionButtons: {
    marginTop: 'auto',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.inputBackground,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  recordingActive: {
    backgroundColor: theme.colors.error + '20',
  },
  actionButtonText: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  cancelButton: {
    backgroundColor: theme.colors.error + '10',
  },
  cancelText: {
    color: theme.colors.error,
  },
});

export default ActiveEmergency; 