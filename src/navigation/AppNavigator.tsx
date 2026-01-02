import React from 'react';
import { Text as RNText } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { RecipesScreen } from '../screens/Recipes/RecipesScreen';
import { RecipeDetailScreen } from '../screens/Recipes/RecipeDetailScreen';
import { TimersScreen } from '../screens/Timers/TimersScreen';
import { StopwatchScreen } from '../screens/Stopwatch/StopwatchScreen';
import { AlarmsScreen } from '../screens/Alarms/AlarmsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { ConverterScreen } from '../screens/Helpers/ConverterScreen';
import { SubstitutionsScreen } from '../screens/Helpers/SubstitutionsScreen';
import { PanSizesScreen } from '../screens/Helpers/PanSizesScreen';
import { colors, typography } from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigators for each tab
function RecipesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="RecipesList" component={RecipesScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="Converter" component={ConverterScreen} />
      <Stack.Screen name="Substitutions" component={SubstitutionsScreen} />
      <Stack.Screen name="PanSizes" component={PanSizesScreen} />
    </Stack.Navigator>
  );
}

// Main tab navigator
export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="📖" color={color} />,
          tabBarLabel: 'Recipes',
        }}
      />
      <Tab.Screen
        name="Timers"
        component={TimersScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="⏱️" color={color} />,
          tabBarLabel: 'Timers',
        }}
      />
      <Tab.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="⏲️" color={color} />,
          tabBarLabel: 'Stopwatch',
        }}
      />
      <Tab.Screen
        name="Alarms"
        component={AlarmsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="⏰" color={color} />,
          tabBarLabel: 'Alarms',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="⚙️" color={color} />,
          tabBarLabel: 'Settings',
          tabBarButton: (props) => null, // Hidden from tab bar, accessible from Home
        }}
      />
    </Tab.Navigator>
  );
}

// Simple emoji icon component
function TabIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <RNText style={{ fontSize: 24, opacity: color === colors.primary ? 1 : 0.5 }}>
      {icon}
    </RNText>
  );
}
