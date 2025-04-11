import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

const VoiceEnrollment = () => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Please grant microphone access to record your voice.');
        return;
      }

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
      setRecordings([...recordings, uri]);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const handleSave = async () => {
    if (recordings.length < 3) {
      Alert.alert('Incomplete', 'Please record at least 3 voice samples for better accuracy.');
      return;
    }

    try {
      setLoading(true);
      // Here you would upload the recordings to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the next screen
      navigation.navigate('UserDashboard');
    } catch (error) {
      console.error('Error saving voice samples:', error);
      Alert.alert('Error', 'Failed to save voice samples. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Enrollment</Text>
        <Text style={styles.subtitle}>
          Record your voice saying "Help" or "Emergency" in different tones. This will help us detect when you need assistance.
        </Text>
      </View>

      <View style={styles.recordingsContainer}>
        {recordings.map((uri, index) => (
          <View key={index} style={styles.recordingItem}>
            <Icon name="microphone" size={24} color={theme.colors.primary} />
            <Text style={styles.recordingText}>Recording {index + 1}</Text>
          </View>
        ))}
      </View>

      <View style={styles.recordingControls}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingActive]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Icon
            name={isRecording ? 'stop' : 'microphone'}
            size={32}
            color={isRecording ? theme.colors.error : theme.colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.recordingStatus}>
          {isRecording ? 'Recording...' : 'Tap to record'}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Save & Continue"
          loading={loading}
          disabled={loading || recordings.length < 3}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  recordingsContainer: {
    flex: 1,
    marginBottom: theme.spacing.xl,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  recordingText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.md,
    color: theme.colors.text,
  },
  recordingControls: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  recordingActive: {
    backgroundColor: theme.colors.error + '20',
  },
  recordingStatus: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
  footer: {
    marginTop: 'auto',
  },
});

export default VoiceEnrollment; 