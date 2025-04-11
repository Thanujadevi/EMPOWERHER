import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/safety-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Safety App</Text>
          <Text style={styles.subtitle}>
            Your personal safety companion for emergency situations
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="shield-check"
            title="Emergency SOS"
            description="Quick access to emergency services and contacts"
          />
          <FeatureItem
            icon="map-marker-path"
            title="Journey Tracker"
            description="Share your location with trusted contacts"
          />
          <FeatureItem
            icon="alert-circle"
            title="Crime Reports"
            description="Stay informed about safety in your area"
          />
        </View>

        <View style={styles.actions}>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
          
          <Button
            title="Create Account"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          />
          
          <View style={styles.socialLogin}>
            <Text style={styles.socialText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => navigation.navigate('Login', { method: 'google' })}
              >
                <Icon name="google" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => navigation.navigate('Login', { method: 'apple' })}
              >
                <Icon name="apple" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Icon name={icon} size={24} color={theme.colors.primary} />
    </View>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.md,
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
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  features: {
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
  },
  actions: {
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  socialLogin: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  socialText: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
});

export default WelcomeScreen; 