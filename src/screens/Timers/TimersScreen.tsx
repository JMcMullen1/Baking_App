import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Timer } from '../../types';
import { formatTime } from '../../utils/conversions';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { NotificationService } from '../../services/notifications';

export const TimersScreen = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [newTimerLabel, setNewTimerLabel] = useState('');
  const [newTimerMinutes, setNewTimerMinutes] = useState('');
  const [newTimerSeconds, setNewTimerSeconds] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (!timer.isRunning || timer.isPaused) return timer;

          const newRemaining = timer.remaining - 1;

          if (newRemaining <= 0) {
            // Timer finished
            NotificationService.scheduleTimer(
              timer.id,
              '⏱️ Timer Complete!',
              `${timer.label || 'Your timer'} has finished!`,
              0
            );
            return { ...timer, remaining: 0, isRunning: false };
          }

          return { ...timer, remaining: newRemaining };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    const minutes = parseInt(newTimerMinutes) || 0;
    const seconds = parseInt(newTimerSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      Alert.alert('Invalid Time', 'Please enter a valid time');
      return;
    }

    const timer: Timer = {
      id: `timer-${Date.now()}`,
      label: newTimerLabel || 'Timer',
      duration: totalSeconds,
      remaining: totalSeconds,
      isRunning: false,
      isPaused: false,
      createdAt: new Date().toISOString(),
    };

    setTimers([...timers, timer]);
    setShowAddTimer(false);
    setNewTimerLabel('');
    setNewTimerMinutes('');
    setNewTimerSeconds('');
  };

  const startTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, isRunning: true, isPaused: false, startedAt: new Date().toISOString() }
          : timer
      )
    );
  };

  const pauseTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isPaused: true } : timer
      )
    );
  };

  const resumeTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isPaused: false } : timer
      )
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, remaining: timer.duration, isRunning: false, isPaused: false }
          : timer
      )
    );
  };

  const deleteTimer = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  const presetTimers = [
    { label: 'Quick Check', minutes: 5, icon: '👀' },
    { label: 'Cookies', minutes: 10, icon: '🍪' },
    { label: 'Cake Layer', minutes: 25, icon: '🎂' },
    { label: 'Bread Rise', minutes: 60, icon: '🍞' },
  ];

  const addPresetTimer = (label: string, minutes: number) => {
    const timer: Timer = {
      id: `timer-${Date.now()}`,
      label,
      duration: minutes * 60,
      remaining: minutes * 60,
      isRunning: false,
      isPaused: false,
      createdAt: new Date().toISOString(),
    };

    setTimers([...timers, timer]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>⏱️ Timers</Text>

        {/* Preset Timers */}
        <View style={styles.presetsContainer}>
          <Text style={styles.sectionTitle}>Quick Timers</Text>
          <View style={styles.presetsGrid}>
            {presetTimers.map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetButton}
                onPress={() => addPresetTimer(preset.label, preset.minutes)}
              >
                <Text style={styles.presetIcon}>{preset.icon}</Text>
                <Text style={styles.presetLabel}>{preset.label}</Text>
                <Text style={styles.presetTime}>{preset.minutes}min</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Timers */}
        {timers.length > 0 && (
          <View style={styles.timersContainer}>
            <Text style={styles.sectionTitle}>Active Timers</Text>
            {timers.map((timer) => (
              <Card key={timer.id} style={styles.timerCard}>
                <View style={styles.timerHeader}>
                  <Text style={styles.timerLabel}>{timer.label}</Text>
                  <TouchableOpacity onPress={() => deleteTimer(timer.id)}>
                    <Text style={styles.deleteButton}>🗑️</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    styles.timerTime,
                    timer.remaining === 0 && styles.timerFinished,
                  ]}
                >
                  {formatTime(timer.remaining * 1000)}
                </Text>
                <View style={styles.timerControls}>
                  {!timer.isRunning || timer.remaining === 0 ? (
                    <Button
                      title="Start"
                      onPress={() => startTimer(timer.id)}
                      variant="primary"
                      size="small"
                      disabled={timer.remaining === 0}
                    />
                  ) : timer.isPaused ? (
                    <Button
                      title="Resume"
                      onPress={() => resumeTimer(timer.id)}
                      variant="primary"
                      size="small"
                    />
                  ) : (
                    <Button
                      title="Pause"
                      onPress={() => pauseTimer(timer.id)}
                      variant="secondary"
                      size="small"
                    />
                  )}
                  <Button
                    title="Reset"
                    onPress={() => resetTimer(timer.id)}
                    variant="outline"
                    size="small"
                    style={styles.resetButton}
                  />
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Add Custom Timer */}
        {showAddTimer ? (
          <Card style={styles.addTimerCard}>
            <Text style={styles.addTimerTitle}>Add Custom Timer</Text>
            <TextInput
              style={styles.input}
              placeholder="Timer label (e.g., Cookies)"
              value={newTimerLabel}
              onChangeText={setNewTimerLabel}
              placeholderTextColor={colors.textLight}
            />
            <View style={styles.timeInputs}>
              <View style={styles.timeInputGroup}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Min"
                  value={newTimerMinutes}
                  onChangeText={setNewTimerMinutes}
                  keyboardType="number-pad"
                  maxLength={3}
                  placeholderTextColor={colors.textLight}
                />
                <Text style={styles.timeLabel}>min</Text>
              </View>
              <View style={styles.timeInputGroup}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Sec"
                  value={newTimerSeconds}
                  onChangeText={setNewTimerSeconds}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholderTextColor={colors.textLight}
                />
                <Text style={styles.timeLabel}>sec</Text>
              </View>
            </View>
            <View style={styles.addTimerButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowAddTimer(false)}
                variant="outline"
                size="small"
                style={styles.addTimerButton}
              />
              <Button
                title="Add Timer"
                onPress={addTimer}
                variant="primary"
                size="small"
                style={styles.addTimerButton}
              />
            </View>
          </Card>
        ) : (
          <Button
            title="+ Add Custom Timer"
            onPress={() => setShowAddTimer(true)}
            variant="outline"
            style={styles.addButton}
          />
        )}
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
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  presetsContainer: {
    marginBottom: spacing.lg,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  presetButton: {
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
    marginBottom: spacing.xs,
  },
  presetTime: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  timersContainer: {
    marginBottom: spacing.lg,
  },
  timerCard: {
    marginBottom: spacing.md,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timerLabel: {
    ...typography.h3,
    color: colors.text,
  },
  deleteButton: {
    fontSize: 24,
  },
  timerTime: {
    ...typography.h1,
    fontSize: 48,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  timerFinished: {
    color: colors.success,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetButton: {
    marginLeft: spacing.sm,
  },
  addTimerCard: {
    marginBottom: spacing.lg,
  },
  addTimerTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  timeInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    width: 80,
    textAlign: 'center',
    ...typography.h3,
    color: colors.text,
  },
  timeLabel: {
    ...typography.body,
    color: colors.textLight,
    marginLeft: spacing.sm,
  },
  addTimerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addTimerButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  addButton: {
    marginBottom: spacing.lg,
  },
});
