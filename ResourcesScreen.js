import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { theme } from '../theme/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function ResourcesScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Resources</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search resources..."
              placeholderTextColor={theme.colors.textLight}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
              <Text style={[styles.categoryText, styles.activeCategoryText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Career</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Education</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Leadership</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Wellness</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Featured Resources */}
        <View style={styles.resourcesContainer}>
          <Text style={styles.sectionTitle}>Featured Resources</Text>
          
          <TouchableOpacity style={styles.resourceCard}>
            <View style={styles.resourceImage} />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Breaking the Glass Ceiling</Text>
              <Text style={styles.resourceDescription}>A guide to overcoming workplace barriers and achieving leadership positions.</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceType}>Article</Text>
                <Text style={styles.resourceTime}>5 min read</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceCard}>
            <View style={styles.resourceImage} />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Women in Tech Podcast</Text>
              <Text style={styles.resourceDescription}>Weekly interviews with successful women in technology sharing their journeys and advice.</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceType}>Podcast</Text>
                <Text style={styles.resourceTime}>45 min</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceCard}>
            <View style={styles.resourceImage} />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Financial Independence Workshop</Text>
              <Text style={styles.resourceDescription}>Learn about investing, budgeting, and building wealth for long-term financial security.</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceType}>Workshop</Text>
                <Text style={styles.resourceTime}>2 hours</Text>
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
    padding: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  searchContainer: {
    padding: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
  },
  searchIcon: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.textLight,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  categoriesContainer: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  activeCategory: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
  },
  activeCategoryText: {
    color: theme.colors.background,
  },
  resourcesContainer: {
    padding: theme.spacing.md,
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  resourceImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
  },
  resourceInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  resourceTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  resourceDescription: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  resourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceType: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary,
  },
  resourceTime: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
  },
}); 