import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import { Input } from '../components/Input';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

const AuthorityRegistration = ({ navigation, route }) => {
  const { mobileNumber } = route.params;
  const { registerAuthority, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: new Date(),
    division: '',
    designation: '',
    badgeNumber: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword ||
        !formData.gender || !formData.division || !formData.designation || !formData.badgeNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const registrationData = {
      ...formData,
      mobileNumber,
      dateOfBirth: formData.dateOfBirth.toISOString().split('T')[0],
    };

    try {
      const success = await registerAuthority(registrationData);
      if (success) {
        Alert.alert(
          'Success',
          'Registration successful! Please login with your credentials.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login', { isAuthorityUser: true }),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Authority Registration</Text>
          <Text style={styles.subtitle}>Complete your profile</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry
          />

          <Input
            label="Gender"
            placeholder="Select gender"
            value={formData.gender}
            onChangeText={(value) => handleInputChange('gender', value)}
          />

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date of Birth</Text>
            <Button
              title={formData.dateOfBirth.toLocaleDateString()}
              variant="outline"
              size="small"
              onPress={() => setShowDatePicker(true)}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Input
            label="Division"
            placeholder="Enter your division"
            value={formData.division}
            onChangeText={(value) => handleInputChange('division', value)}
          />

          <Input
            label="Designation"
            placeholder="Enter your designation"
            value={formData.designation}
            onChangeText={(value) => handleInputChange('designation', value)}
          />

          <Input
            label="Badge Number"
            placeholder="Enter your badge number"
            value={formData.badgeNumber}
            onChangeText={(value) => handleInputChange('badgeNumber', value)}
          />

          <Button
            title="Register"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  form: {
    width: '100%',
  },
  dateContainer: {
    marginBottom: theme.spacing.md,
  },
  dateLabel: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
});

export default AuthorityRegistration; 