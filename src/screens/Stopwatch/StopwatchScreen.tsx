import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Split, StopwatchState } from '../../types';
import { formatTimeWithMilliseconds } from '../../utils/conversions';
import { colors, spacing, typography } from '../../utils/theme';
import { BaileyMascot, NellieMascot } from '../../assets/images';

export const StopwatchScreen = () => {
  const [stopwatch, setStopwatch] = useState<StopwatchState>({
    isRunning: false,
    isPaused: false,
    elapsedTime: 0,
    splits: [],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (stopwatch.isRunning && !stopwatch.isPaused) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current + (stopwatch.elapsedTime || 0);
        setStopwatch((prev) => ({ ...prev, elapsedTime: elapsed }));
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stopwatch.isRunning, stopwatch.isPaused]);

  const start = () => {
    startTimeRef.current = Date.now();
    setStopwatch((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startedAt: Date.now(),
    }));
  };

  const pause = () => {
    setStopwatch((prev) => ({
      ...prev,
      isPaused: true,
      pausedAt: Date.now(),
    }));
  };

  const resume = () => {
    startTimeRef.current = Date.now();
    setStopwatch((prev) => ({
      ...prev,
      isPaused: false,
    }));
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStopwatch({
      isRunning: false,
      isPaused: false,
      elapsedTime: 0,
      splits: [],
    });
  };

  const recordSplit = () => {
    const previousSplitTime =
      stopwatch.splits.length > 0
        ? stopwatch.splits[stopwatch.splits.length - 1].time
        : 0;

    const split: Split = {
      id: `split-${Date.now()}`,
      time: stopwatch.elapsedTime,
      lapTime: stopwatch.elapsedTime - previousSplitTime,
      timestamp: Date.now(),
    };

    setStopwatch((prev) => ({
      ...prev,
      splits: [...prev.splits, split],
    }));
  };

  const renderSplit = ({ item, index }: { item: Split; index: number }) => {
    const splitNumber = stopwatch.splits.length - index;
    return (
      <View style={styles.splitRow}>
        <Text style={styles.splitNumber}>#{splitNumber}</Text>
        <Text style={styles.splitTime}>
          {formatTimeWithMilliseconds(item.lapTime)}
        </Text>
        <Text style={styles.splitTotal}>
          {formatTimeWithMilliseconds(item.time)}
        </Text>
      </View>
    );
  };

  const showMascotReaction =
    stopwatch.splits.length > 0 && stopwatch.splits.length % 5 === 0;
  const mascotMessage =
    stopwatch.splits.length % 10 === 0
      ? "Wow! You're really timing everything! 🎉"
      : "Great split! Keep it up! 💪";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⏲️ Stopwatch</Text>

        {/* Main Stopwatch Display */}
        <Card style={styles.displayCard}>
          <View style={styles.mascotRow}>
            <BaileyMascot size={50} />
            <NellieMascot size={50} />
          </View>
          <Text style={styles.timeDisplay}>
            {formatTimeWithMilliseconds(stopwatch.elapsedTime)}
          </Text>

          {/* Controls */}
          <View style={styles.controls}>
            {!stopwatch.isRunning ? (
              <>
                <Button
                  title="Start"
                  onPress={start}
                  variant="primary"
                  size="large"
                  style={styles.controlButton}
                />
                {stopwatch.elapsedTime > 0 && (
                  <Button
                    title="Reset"
                    onPress={reset}
                    variant="outline"
                    size="large"
                    style={styles.controlButton}
                  />
                )}
              </>
            ) : stopwatch.isPaused ? (
              <>
                <Button
                  title="Resume"
                  onPress={resume}
                  variant="primary"
                  size="large"
                  style={styles.controlButton}
                />
                <Button
                  title="Reset"
                  onPress={reset}
                  variant="danger"
                  size="large"
                  style={styles.controlButton}
                />
              </>
            ) : (
              <>
                <Button
                  title="Pause"
                  onPress={pause}
                  variant="secondary"
                  size="large"
                  style={styles.controlButton}
                />
                <Button
                  title="Split"
                  onPress={recordSplit}
                  variant="primary"
                  size="large"
                  style={styles.controlButton}
                />
              </>
            )}
          </View>
        </Card>

        {/* Mascot Reaction */}
        {showMascotReaction && stopwatch.isRunning && (
          <Card variant="bailey" style={styles.mascotReaction}>
            <Text style={styles.mascotMessage}>{mascotMessage}</Text>
          </Card>
        )}

        {/* Splits List */}
        {stopwatch.splits.length > 0 && (
          <Card style={styles.splitsCard}>
            <View style={styles.splitsHeader}>
              <Text style={styles.splitsTitle}>
                Splits ({stopwatch.splits.length})
              </Text>
              <Text style={styles.splitsHeaderLabel}>Lap / Total</Text>
            </View>
            <FlatList
              data={[...stopwatch.splits].reverse()}
              renderItem={renderSplit}
              keyExtractor={(item) => item.id}
              style={styles.splitsList}
              showsVerticalScrollIndicator={false}
            />
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  displayCard: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mascotRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing.md,
  },
  timeDisplay: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.primary,
    marginVertical: spacing.lg,
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  mascotReaction: {
    marginBottom: spacing.md,
  },
  mascotMessage: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
  },
  splitsCard: {
    flex: 1,
  },
  splitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  splitsTitle: {
    ...typography.h3,
    color: colors.text,
  },
  splitsHeaderLabel: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  splitsList: {
    flex: 1,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  splitNumber: {
    ...typography.button,
    color: colors.primary,
    width: 50,
  },
  splitTime: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  splitTotal: {
    ...typography.body,
    color: colors.textLight,
    fontVariant: ['tabular-nums'],
  },
});
