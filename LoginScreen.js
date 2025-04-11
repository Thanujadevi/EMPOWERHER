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

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isAuthorityUser, setIsAuthorityUser] = useState(route?.params?.isAuthorityUser || false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { login, loading, error, sendOtp, verifyOtp } = useAuth();

  const handleLogin = async () => {
    if (isAuthorityUser && !showOtpInput) {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter both email and password');
        return;
      }
      const success = await login(email, password, 'authority');
      if (!success) {
        Alert.alert('Login Failed', error || 'Please check your credentials and try again');
      }
    } else if (!isAuthorityUser) {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter both email and password');
        return;
      }
      const success = await login(email, password, 'user');
      if (!success) {
        Alert.alert('Login Failed', error || 'Please check your credentials and try again');
      }
    }
  };

  const handleSendOtp = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }
    const success = await sendOtp(mobileNumber);
    if (success) {
      setShowOtpInput(true);
      Alert.alert('Success', 'OTP has been sent to your mobile number');
    } else {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    const success = await verifyOtp(mobileNumber, otp);
    if (success) {
      navigation.navigate('AuthorityRegistration', { mobileNumber });
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const renderAuthorityLogin = () => (
    <View style={styles.form}>
      {!showOtpInput ? (
        <>
          <View style={styles.loginTypeToggle}>
            <Button
              title="Existing User"
              variant={!showOtpInput ? "primary" : "outline"}
              size="small"
              onPress={() => setShowOtpInput(false)}
              style={styles.toggleButton}
            />
            <Button
              title="New User"
              variant={showOtpInput ? "primary" : "outline"}
              size="small"
              onPress={() => setShowOtpInput(true)}
              style={styles.toggleButton}
            />
          </View>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Sign In"
            loading={loading}
            disabled={loading}
            onPress={handleLogin}
            style={styles.loginButton}
          />
        </>
      ) : (
        <>
          <View style={styles.loginTypeToggle}>
            <Button
              title="Existing User"
              variant={!showOtpInput ? "primary" : "outline"}
              size="small"
              onPress={() => setShowOtpInput(false)}
              style={styles.toggleButton}
            />
            <Button
              title="New User"
              variant={showOtpInput ? "primary" : "outline"}
              size="small"
              onPress={() => setShowOtpInput(true)}
              style={styles.toggleButton}
            />
          </View>
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
            style={styles.loginButton}
          />
        </>
      )}
    </View>
  );

  const renderRegularLogin = () => (
    <View style={styles.form}>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Forgot Password?"
        variant="outline"
        size="small"
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ResetPassword')}
      />
      <Button
        title="Sign In"
        loading={loading}
        disabled={loading}
        onPress={handleLogin}
        style={styles.loginButton}
      />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Button
          title="Sign Up"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            {isAuthorityUser ? 'Authority Login' : 'Sign in to continue'}
          </Text>
        </View>
        {isAuthorityUser ? renderAuthorityLogin() : renderRegularLogin()}
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
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.xxl,
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
  loginTypeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  loginButton: {
    marginBottom: theme.spacing.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sm,
  },
});

export default LoginScreen; 