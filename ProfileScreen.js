import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { theme } from '../theme/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function ProfileScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage} />
          </View>
          <Text style={styles.name}>Sarah Johnson</Text>
          <Text style={styles.bio}>Tech Enthusiast | Mentor | Community Builder</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Mentors</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon} />
            <Text style={styles.menuText}>My Mentors</Text>
            <View style={styles.menuArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Resources</Text>
            <View style={styles.menuArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon} />
            <Text style={styles.menuText}>My Events</Text>
            <View style={styles.menuArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
            <View style={styles.menuArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
            <View style={styles.menuArrow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.text,
  },
  profileInfo: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  name: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bio: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
  },
  menuContainer: {
    padding: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  menuIcon: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  menuText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  menuArrow: {
    width: 16,
    height: 16,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.border,
  },
}); 