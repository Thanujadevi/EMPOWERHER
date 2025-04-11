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

const RegisterScreen = ({ navigation }) => {
  const { register, sendOtp, verifyOtp, loading } = useAuth();
  
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: new Date(),
    address: '',
    area: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSendOtp = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }
    
    try {
      const success = await sendOtp(mobileNumber);
      if (success) {
        setShowOtpInput(true);
        Alert.alert('Success', 'OTP has been sent to your mobile number');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    
    try {
      const success = await verifyOtp(mobileNumber, otp);
      if (success) {
        setStep(2);
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.address || !formData.area || 
        !formData.email || !formData.password || !formData.confirmPassword) {
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
      const success = await register(registrationData);
      if (success) {
        Alert.alert(
          'Success',
          'Registration successful! Please login with your credentials.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed. Please try again.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Step 1: Verify Your Mobile Number</Text>
      <Text style={styles.stepDescription}>
        We'll send a verification code to your mobile number
      </Text>
      
      <Input
        label="Mobile Number"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      
      {showOtpInput && (
        <Input
          label="OTP"
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
        />
      )}
      
      <Button
        title={showOtpInput ? "Verify OTP" : "Send OTP"}
        loading={loading}
        disabled={loading}
        onPress={showOtpInput ? handleVerifyOtp : handleSendOtp}
        style={styles.button}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Step 2: Personal Details</Text>
      <Text style={styles.stepDescription}>
        Please provide your personal information
      </Text>
      
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange('fullName', value)}
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
        label="Address"
        placeholder="Enter your address"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
        multiline
        numberOfLines={2}
      />
      
      <Input
        label="Area/Location"
        placeholder="Enter your area or location"
        value={formData.area}
        onChangeText={(value) => handleInputChange('area', value)}
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
      
      <Button
        title="Register"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit}
        style={styles.button}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us to enhance your personal safety
          </Text>
        </View>
        
        {step === 1 ? renderStep1() : renderStep2()}
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Button
            title="Sign In"
            variant="outline"
            size="small"
            onPress={() => navigation.navigate('Login')}
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
    marginBottom: theme.spacing.xl,
  },
  stepTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  stepDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
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
  button: {
    marginTop: theme.spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sm,
  },
});

export default RegisterScreen; 