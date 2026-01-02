import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MascotTip } from '../../components/mascot/MascotTip';
import { BaileyMascot, NellieMascot } from '../../assets/images';
import { getRandomTip } from '../../data/mascotTips';
import { colors, spacing, typography } from '../../utils/theme';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [currentTip, setCurrentTip] = useState(getRandomTip());
  const [userName] = useState('Simone');

  const encouragements = [
    "Let's bake something amazing today!",
    "Ready to create some delicious magic?",
    "The kitchen awaits your talents!",
    "Time to make something wonderful!",
    "Let's fill the kitchen with yummy smells!",
  ];

  const [encouragement, setEncouragement] = useState(
    encouragements[Math.floor(Math.random() * encouragements.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 30000); // Change tip every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: 'Start Timer',
      icon: '⏱️',
      color: colors.primary,
      onPress: () => navigation.navigate('Timers'),
    },
    {
      title: 'Browse Recipes',
      icon: '📖',
      color: colors.secondary,
      onPress: () => navigation.navigate('Recipes'),
    },
    {
      title: 'Stopwatch',
      icon: '⏲️',
      color: colors.accent,
      onPress: () => navigation.navigate('Stopwatch'),
    },
    {
      title: 'Set Alarm',
      icon: '⏰',
      color: colors.success,
      onPress: () => navigation.navigate('Alarms'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with mascots */}
        <View style={styles.header}>
          <BaileyMascot size={60} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi {userName}! 👋</Text>
            <Text style={styles.encouragement}>{encouragement}</Text>
          </View>
          <NellieMascot size={60} />
        </View>

        {/* Today's Bake Plan */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Bake Plan 📅</Text>
          <Text style={styles.sectionContent}>
            You have no baking sessions planned yet. Start by browsing recipes or
            setting timers for your next bake!
          </Text>
          <Button
            title="View Recipes"
            onPress={() => navigation.navigate('Recipes')}
            variant="primary"
            style={styles.sectionButton}
          />
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions ⚡</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickAction, { backgroundColor: action.color }]}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mascot Tip */}
        <MascotTip mascot={currentTip.mascot} tip={currentTip.text} />

        {/* Settings Link */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️ Settings</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  greetingContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  greeting: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  encouragement: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionContent: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  sectionButton: {
    marginTop: spacing.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  quickAction: {
    width: '48%',
    aspectRatio: 1,
    margin: spacing.xs,
    borderRadius: 16,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    ...typography.button,
    color: colors.textInverse,
    textAlign: 'center',
  },
  settingsButton: {
    alignSelf: 'center',
    padding: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  settingsText: {
    ...typography.body,
    color: colors.textLight,
  },
});
