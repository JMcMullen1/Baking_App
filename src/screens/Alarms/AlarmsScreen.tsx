import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Alarm } from '../../types';
import { ALARM_PRESETS } from '../../data/alarmPresets';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { NotificationService } from '../../services/notifications';
import { StorageService } from '../../services/storage';
import { STORAGE_KEYS } from '../../types';

export const AlarmsScreen = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    initializeNotifications();
    loadAlarms();
  }, []);

  const initializeNotifications = async () => {
    const granted = await NotificationService.requestPermissions();
    setPermissionGranted(granted);
    if (!granted) {
      Alert.alert(
        'Notifications Disabled',
        'Please enable notifications in your device settings to use alarms.'
      );
    }
  };

  const loadAlarms = async () => {
    const savedAlarms = await StorageService.getItem<Alarm[]>(STORAGE_KEYS.ALARMS);
    if (savedAlarms) {
      setAlarms(savedAlarms);
    }
  };

  const saveAlarms = async (updatedAlarms: Alarm[]) => {
    await StorageService.setItem(STORAGE_KEYS.ALARMS, updatedAlarms);
    setAlarms(updatedAlarms);
  };

  const createAlarmFromPreset = async (presetId: string) => {
    const preset = ALARM_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const now = new Date();
    const futureTime = new Date(now.getTime() + preset.duration * 60 * 1000);

    const alarm: Alarm = {
      id: `alarm-${Date.now()}`,
      label: preset.label,
      time: `${futureTime.getHours().toString().padStart(2, '0')}:${futureTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
      enabled: true,
      repeat: 'once',
      sound: 'default',
      snoozeEnabled: true,
      snoozeDuration: 5,
      createdAt: new Date().toISOString(),
    };

    const [hours, minutes] = alarm.time.split(':').map(Number);

    if (permissionGranted) {
      await NotificationService.scheduleAlarm(
        alarm.id,
        preset.icon + ' ' + alarm.label,
        'Time to check your baking!',
        hours,
        minutes,
        false
      );
    }

    const updatedAlarms = [...alarms, alarm];
    await saveAlarms(updatedAlarms);
  };

  const toggleAlarm = async (id: string) => {
    const updatedAlarms = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    );
    await saveAlarms(updatedAlarms);
  };

  const deleteAlarm = async (id: string) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    await saveAlarms(updatedAlarms);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>⏰ Alarms</Text>

        {!permissionGranted && (
          <Card style={styles.warningCard}>
            <Text style={styles.warningText}>
              ⚠️ Notifications are disabled. Alarms won't work without notification
              permissions. Please enable them in Settings.
            </Text>
          </Card>
        )}

        {/* Preset Alarms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Alarm Presets</Text>
          <View style={styles.presetsGrid}>
            {ALARM_PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={styles.presetCard}
                onPress={() => createAlarmFromPreset(preset.id)}
              >
                <Text style={styles.presetIcon}>{preset.icon}</Text>
                <Text style={styles.presetLabel}>{preset.label}</Text>
                <Text style={styles.presetDuration}>{preset.duration} min</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Alarms */}
        {alarms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Alarms</Text>
            {alarms.map((alarm) => (
              <Card key={alarm.id} style={styles.alarmCard}>
                <View style={styles.alarmHeader}>
                  <View style={styles.alarmInfo}>
                    <Text style={styles.alarmTime}>{alarm.time}</Text>
                    <Text style={styles.alarmLabel}>{alarm.label}</Text>
                    <Text style={styles.alarmRepeat}>
                      {alarm.repeat === 'once'
                        ? 'One time'
                        : alarm.repeat === 'daily'
                        ? 'Every day'
                        : alarm.repeat === 'weekdays'
                        ? 'Weekdays'
                        : 'Custom'}
                    </Text>
                  </View>
                  <Switch
                    value={alarm.enabled}
                    onValueChange={() => toggleAlarm(alarm.id)}
                    trackColor={{ false: colors.textLight, true: colors.primary }}
                    thumbColor={colors.surface}
                  />
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteAlarm(alarm.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}

        {/* Note about limitations */}
        <Card style={styles.noteCard}>
          <Text style={styles.noteTitle}>📝 About Alarms</Text>
          <Text style={styles.noteText}>
            • Alarms work best when the app is running in the background{'\n'}
            • Some devices may limit background notifications{'\n'}
            • For critical timings, use device system alarms{'\n'}
            • Alarm presets create one-time notifications{'\n'}
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
  warningCard: {
    backgroundColor: colors.warning,
    marginBottom: spacing.lg,
  },
  warningText: {
    ...typography.body,
    color: colors.text,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  presetCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    margin: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  presetIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  presetLabel: {
    ...typography.button,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  presetDuration: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  alarmCard: {
    marginBottom: spacing.md,
  },
  alarmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 36,
  },
  alarmLabel: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.xs,
  },
  alarmRepeat: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  deleteButton: {
    marginTop: spacing.md,
    padding: spacing.sm,
    alignSelf: 'flex-start',
  },
  deleteText: {
    ...typography.button,
    color: colors.error,
  },
  noteCard: {
    backgroundColor: colors.info,
    marginTop: spacing.lg,
  },
  noteTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  noteText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
  },
});
