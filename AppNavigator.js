import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

// Auth Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PermissionRequestScreen from '../screens/PermissionRequestScreen';
import EmergencyContactSetup from '../screens/EmergencyContactSetup';
import VoiceEnrollment from '../screens/VoiceEnrollment';

// User Screens
import UserDashboard from '../screens/UserDashboard';
import ActiveEmergency from '../screens/ActiveEmergency';
import CrimeReports from '../screens/CrimeReports';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

// Authority Screens
import AuthorityRegistration from '../screens/AuthorityRegistration';
import AuthorityDashboard from '../screens/AuthorityDashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={UserDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CrimeReports"
        component={CrimeReports}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PermissionRequest" component={PermissionRequestScreen} />
      <Stack.Screen name="EmergencyContactSetup" component={EmergencyContactSetup} />
      <Stack.Screen name="VoiceEnrollment" component={VoiceEnrollment} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserTabs" component={UserTabNavigator} />
      <Stack.Screen name="ActiveEmergency" component={ActiveEmergency} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const AuthorityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthorityRegistration" component={AuthorityRegistration} />
      <Stack.Screen name="AuthorityDashboard" component={AuthorityDashboard} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  // TODO: Replace with actual auth state
  const isAuthenticated = false;
  const isAuthority = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : isAuthority ? (
          <Stack.Screen name="Authority" component={AuthorityStack} />
        ) : (
          <Stack.Screen name="User" component={UserStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 