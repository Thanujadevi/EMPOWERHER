import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { theme } from '../theme/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function CommunityScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Community</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {/* Community Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Groups</Text>
          </View>
        </View>

        {/* Join Community Button */}
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Community</Text>
        </TouchableOpacity>

        {/* Featured Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Groups</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupsScroll}>
            <TouchableOpacity style={styles.groupCard}>
              <View style={styles.groupImage} />
              <Text style={styles.groupName}>Women in Tech</Text>
              <Text style={styles.groupMembers}>342 members</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.groupCard}>
              <View style={styles.groupImage} />
              <Text style={styles.groupName}>Leadership Circle</Text>
              <Text style={styles.groupMembers}>218 members</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.groupCard}>
              <View style={styles.groupImage} />
              <Text style={styles.groupName}>Entrepreneurs</Text>
              <Text style={styles.groupMembers}>156 members</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Upcoming Meetups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Meetups</Text>
          
          <TouchableOpacity style={styles.meetupCard}>
            <View style={styles.meetupImage} />
            <View style={styles.meetupInfo}>
              <Text style={styles.meetupTitle}>Virtual Coffee Chat</Text>
              <Text style={styles.meetupDate}>Tomorrow, 10:00 AM</Text>
              <View style={styles.meetupMeta}>
                <Text style={styles.meetupAttendees}>24 attending</Text>
                <TouchableOpacity style={styles.joinMeetupButton}>
                  <Text style={styles.joinMeetupText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.meetupCard}>
            <View style={styles.meetupImage} />
            <View style={styles.meetupInfo}>
              <Text style={styles.meetupTitle}>Career Development Workshop</Text>
              <Text style={styles.meetupDate}>Friday, 2:00 PM</Text>
              <View style={styles.meetupMeta}>
                <Text style={styles.meetupAttendees}>18 attending</Text>
                <TouchableOpacity style={styles.joinMeetupButton}>
                  <Text style={styles.joinMeetupText}>Join</Text>
                </TouchableOpacity>
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
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
  joinButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.background,
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
  groupsScroll: {
    flexDirection: 'row',
  },
  groupCard: {
    width: 150,
    marginRight: theme.spacing.md,
    alignItems: 'center',
  },
  groupImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  groupName: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
  },
  groupMembers: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  meetupCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  meetupImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
  },
  meetupInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  meetupTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  meetupDate: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  meetupMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meetupAttendees: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
  },
  joinMeetupButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  joinMeetupText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
  },
}); 