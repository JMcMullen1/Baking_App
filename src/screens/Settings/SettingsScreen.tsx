import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Settings } from '../../types';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { StorageService } from '../../services/storage';
import { STORAGE_KEYS } from '../../types';

const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: 'fahrenheit',
  measurementSystem: 'metric',
  notificationsEnabled: true,
  soundEnabled: true,
  defaultAlarmSound: 'default',
  theme: 'light',
  userName: 'Simone',
};

export const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await StorageService.getItem<Settings>(
      STORAGE_KEYS.SETTINGS
    );
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      await StorageService.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }
  };

  const saveSettings = async (updatedSettings: Settings) => {
    setSettings(updatedSettings);
    await StorageService.setItem(STORAGE_KEYS.SETTINGS, updatedSettings);
  };

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    const updated = { ...settings, [key]: value };
    saveSettings(updated);
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all recipes, alarms, timers, and settings. This action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clear();
            Alert.alert('Success', 'All data has been cleared');
            loadSettings();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>⚙️ Settings</Text>

        {/* User Settings */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>User Profile</Text>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={settings.userName}
            onChangeText={(value) => updateSetting('userName', value)}
            placeholder="Enter your name"
            placeholderTextColor={colors.textLight}
          />
        </Card>

        {/* Measurement Settings */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Measurements</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Temperature Unit</Text>
            <View style={styles.segmentControl}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  settings.temperatureUnit === 'celsius' && styles.segmentButtonActive,
                ]}
                onPress={() => updateSetting('temperatureUnit', 'celsius')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    settings.temperatureUnit === 'celsius' &&
                      styles.segmentTextActive,
                  ]}
                >
                  °C
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  settings.temperatureUnit === 'fahrenheit' &&
                    styles.segmentButtonActive,
                ]}
                onPress={() => updateSetting('temperatureUnit', 'fahrenheit')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    settings.temperatureUnit === 'fahrenheit' &&
                      styles.segmentTextActive,
                  ]}
                >
                  °F
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Measurement System</Text>
            <View style={styles.segmentControl}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  settings.measurementSystem === 'metric' &&
                    styles.segmentButtonActive,
                ]}
                onPress={() => updateSetting('measurementSystem', 'metric')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    settings.measurementSystem === 'metric' &&
                      styles.segmentTextActive,
                  ]}
                >
                  Metric
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  settings.measurementSystem === 'imperial' &&
                    styles.segmentButtonActive,
                ]}
                onPress={() => updateSetting('measurementSystem', 'imperial')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    settings.measurementSystem === 'imperial' &&
                      styles.segmentTextActive,
                  ]}
                >
                  Imperial
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Notifications */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications & Sounds</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Notifications</Text>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => updateSetting('notificationsEnabled', value)}
              trackColor={{ false: colors.textLight, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Sounds</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSetting('soundEnabled', value)}
              trackColor={{ false: colors.textLight, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        {/* Helper Tools */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Baking Helpers</Text>
          <Button
            title="Unit Converter 📏"
            onPress={() => navigation.navigate('Converter')}
            variant="outline"
            style={styles.helperButton}
          />
          <Button
            title="Ingredient Substitutions 🔄"
            onPress={() => navigation.navigate('Substitutions')}
            variant="outline"
            style={styles.helperButton}
          />
          <Button
            title="Pan Size Guide 🍰"
            onPress={() => navigation.navigate('PanSizes')}
            variant="outline"
            style={styles.helperButton}
          />
        </Card>

        {/* Data Management */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <Button
            title="Clear All Data"
            onPress={clearAllData}
            variant="danger"
          />
          <Text style={styles.warningText}>
            ⚠️ This will delete all your recipes, alarms, timers, and settings.
          </Text>
        </Card>

        {/* App Info */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About Baking App</Text>
          <Text style={styles.aboutText}>
            Version 1.0.0{'\n\n'}
            A cute, cozy baking companion for Simone, featuring Bailey the King Charles
            Cavalier and Nellie the Golden Retriever!{'\n\n'}
            Made with ❤️ for all your baking adventures.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  settingRow: {
    marginBottom: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  segmentControl: {
    flexDirection: 'row',
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14,
  },
  segmentTextActive: {
    color: colors.textInverse,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  switchLabel: {
    ...typography.body,
    color: colors.text,
  },
  helperButton: {
    marginBottom: spacing.sm,
  },
  warningText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  aboutText: {
    ...typography.body,
    color: colors.textLight,
    lineHeight: 24,
  },
});
