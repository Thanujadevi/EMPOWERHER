import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardOption = ({ title, icon, onPress, description }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <View style={styles.optionIconContainer}>
      <Icon name={icon} size={32} color={theme.colors.primary} />
    </View>
    <View style={styles.optionContent}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
    <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
  </TouchableOpacity>
);

const AuthorityDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const dashboardOptions = [
    {
      title: 'Manage Crime Account',
      icon: 'file-document-edit',
      description: 'Add and edit case details',
      onPress: () => navigation.navigate('ManageCrime'),
    },
    {
      title: 'View Crime Reports',
      icon: 'file-document',
      description: 'Review your registered cases',
      onPress: () => navigation.navigate('CrimeReports'),
    },
    {
      title: 'View Complaints',
      icon: 'message-alert',
      description: 'Check user-submitted complaints',
      onPress: () => navigation.navigate('Complaints'),
    },
    {
      title: 'Profile Settings',
      icon: 'account-cog',
      description: 'Manage your account settings',
      onPress: () => navigation.navigate('ProfileSettings'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userRole}>{user?.designation}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>Active Cases</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>New Complaints</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        {dashboardOptions.map((option, index) => (
          <DashboardOption
            key={index}
            title={option.title}
            icon={option.icon}
            description={option.description}
            onPress={option.onPress}
          />
        ))}
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
    alignItems: 'flex-start',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  welcomeText: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  userRole: {
    fontSize: theme.typography.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.xxl,
    fontWeight: 'bold',
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.sm,
    color: theme.colors.background,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  optionDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
  },
});

export default AuthorityDashboard; 