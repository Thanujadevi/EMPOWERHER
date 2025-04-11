import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { theme } from '../theme/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
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
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EmpowerHer</Text>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileImagePlaceholder} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Sarah!</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary }]}>
              <Ionicons name="people" size={24} color={theme.colors.background} />
            </View>
            <Text style={styles.actionText}>Find Mentor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.secondary }]}>
              <Ionicons name="book" size={24} color={theme.colors.background} />
            </View>
            <Text style={styles.actionText}>Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent }]}>
              <Ionicons name="chatbubbles" size={24} color={theme.colors.background} />
            </View>
            <Text style={styles.actionText}>Community</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventImagePlaceholder} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Women in Tech Meetup</Text>
              <Text style={styles.eventDate}>Tomorrow, 2:00 PM</Text>
              <View style={styles.eventMeta}>
                <View style={styles.eventMetaItem}>
                  <Ionicons name="location-outline" size={14} color={theme.colors.textLight} />
                  <Text style={styles.eventMetaText}>Virtual</Text>
                </View>
                <View style={styles.eventMetaItem}>
                  <Ionicons name="people-outline" size={14} color={theme.colors.textLight} />
                  <Text style={styles.eventMetaText}>24 attending</Text>
                </View>
              </View>
            </View>
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  welcomeSection: {
    padding: theme.spacing.md,
  },
  welcomeText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textLight,
  },
  userName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  eventImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
  },
  eventInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  eventTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  eventDate: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventMetaText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
}); 