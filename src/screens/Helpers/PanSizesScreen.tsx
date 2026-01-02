import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { PAN_SIZES } from '../../utils/conversions';
import { colors, spacing, typography } from '../../utils/theme';

export const PanSizesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🍰 Pan Size Guide</Text>

        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>
            When substituting pan sizes, adjust baking time and temperature as needed.
            Larger pans = thinner batter = shorter time. Smaller pans = thicker batter =
            longer time.
          </Text>
        </Card>

        {PAN_SIZES.map((pan, index) => (
          <Card key={index} style={styles.panCard}>
            <Text style={styles.panName}>{pan.name}</Text>
            <View style={styles.panDetail}>
              <Text style={styles.panLabel}>Dimensions:</Text>
              <Text style={styles.panValue}>{pan.dimensions}</Text>
            </View>
            <View style={styles.panDetail}>
              <Text style={styles.panLabel}>Volume:</Text>
              <Text style={styles.panValue}>{pan.volume}</Text>
            </View>
            <View style={styles.panDetail}>
              <Text style={styles.panLabel}>Equivalent to:</Text>
              <Text style={styles.panValue}>{pan.equivalent}</Text>
            </View>
          </Card>
        ))}

        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Pan Substitution Tips</Text>
          <Text style={styles.tipText}>
            • Fill pans 1/2 to 2/3 full for best results{'\n'}
            • Dark pans: reduce oven temp by 25°F{'\n'}
            • Glass pans: reduce oven temp by 25°F{'\n'}
            • If batter is shallower, reduce baking time by 25%{'\n'}
            • If batter is deeper, increase baking time by 25%{'\n'}
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
  content: {
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.info,
    marginBottom: spacing.lg,
  },
  infoText: {
    ...typography.body,
    color: colors.text,
  },
  panCard: {
    marginBottom: spacing.md,
  },
  panName: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  panDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  panLabel: {
    ...typography.body,
    color: colors.textLight,
  },
  panValue: {
    ...typography.button,
    color: colors.text,
  },
  tipsCard: {
    backgroundColor: colors.success,
    marginTop: spacing.lg,
  },
  tipsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  },
});
