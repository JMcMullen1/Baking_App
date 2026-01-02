import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { BaileyMascot, NellieMascot } from '../../assets/images';
import { colors, spacing, typography } from '../../utils/theme';
import { MascotType } from '../../types';

interface MascotTipProps {
  mascot: MascotType;
  tip: string;
}

export const MascotTip: React.FC<MascotTipProps> = ({ mascot, tip }) => {
  const isBailey = mascot === 'bailey';
  const MascotComponent = isBailey ? BaileyMascot : NellieMascot;
  const mascotName = isBailey ? 'Bailey' : 'Nellie';

  return (
    <Card variant={mascot} style={styles.container}>
      <View style={styles.header}>
        <MascotComponent size={40} />
        <Text style={styles.name}>{mascotName}'s Baking Tip</Text>
      </View>
      <Text style={styles.tipText}>{tip}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  tipText: {
    ...typography.body,
    color: colors.text,
    fontStyle: 'italic',
  },
});
