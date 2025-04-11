import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';

const CrimeReportItem = ({ report }) => (
  <TouchableOpacity style={styles.reportItem}>
    <View style={styles.reportHeader}>
      <View style={styles.reportTypeContainer}>
        <Icon 
          name={report.type === 'theft' ? 'shopping' : 
                report.type === 'assault' ? 'alert' : 
                report.type === 'vandalism' ? 'image-broken' : 'alert-circle'} 
          size={24} 
          color={theme.colors.primary} 
        />
        <Text style={styles.reportType}>
          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
        </Text>
      </View>
      <Text style={styles.reportTime}>{report.time}</Text>
    </View>
    
    <Text style={styles.reportLocation}>{report.location}</Text>
    <Text style={styles.reportDescription}>{report.description}</Text>
    
    <View style={styles.reportFooter}>
      <View style={styles.reportDistance}>
        <Icon name="map-marker-distance" size={16} color={theme.colors.textSecondary} />
        <Text style={styles.distanceText}>{report.distance} km away</Text>
      </View>
      <Text style={styles.reportDate}>{report.date}</Text>
    </View>
  </TouchableOpacity>
);

const CrimeReports = () => {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchUserLocation();
    fetchReports();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch reports from your backend
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReports = [
        {
          id: '1',
          type: 'theft',
          location: '123 Main St, Downtown',
          description: 'Reported theft of personal belongings from a parked vehicle.',
          time: '2 hours ago',
          date: 'May 15, 2023',
          distance: 0.8,
        },
        {
          id: '2',
          type: 'assault',
          location: '456 Park Ave, Midtown',
          description: 'Verbal altercation reported between two individuals.',
          time: '5 hours ago',
          date: 'May 15, 2023',
          distance: 1.2,
        },
        {
          id: '3',
          type: 'vandalism',
          location: '789 Oak St, Uptown',
          description: 'Graffiti reported on public property.',
          time: '1 day ago',
          date: 'May 14, 2023',
          distance: 2.5,
        },
        {
          id: '4',
          type: 'other',
          location: '321 Pine St, Downtown',
          description: 'Suspicious activity reported in the area.',
          time: '2 days ago',
          date: 'May 13, 2023',
          distance: 0.5,
        },
      ];
      
      setReports(mockReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="alert-circle-outline" size={64} color={theme.colors.textSecondary} />
      <Text style={styles.emptyText}>No crime reports available in your area</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crime Reports</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}
        >
          <Icon name="filter-variant" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading reports...</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          renderItem={({ item }) => <CrimeReportItem report={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
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
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  listContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  reportItem: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportType: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  reportTime: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
  },
  reportLocation: {
    fontSize: theme.typography.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  reportDescription: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  reportDate: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default CrimeReports; 