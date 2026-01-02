import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { SUBSTITUTIONS } from '../../utils/substitutions';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

export const SubstitutionsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubstitutions = SUBSTITUTIONS.filter(
    (sub) =>
      sub.ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSubstitution = ({ item }: { item: typeof SUBSTITUTIONS[0] }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.ingredient}>{item.ingredient}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      {item.substitutes.map((substitute, index) => (
        <View key={index} style={styles.substitute}>
          <View style={styles.substituteHeader}>
            <Text style={styles.substituteName}>✓ {substitute.name}</Text>
            <Text style={styles.ratio}>{substitute.ratio}</Text>
          </View>
          <Text style={styles.notes}>{substitute.notes}</Text>
        </View>
      ))}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🔄 Ingredient Substitutions</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search ingredients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textLight}
        />

        <Text style={styles.resultsCount}>
          {filteredSubstitutions.length} ingredient
          {filteredSubstitutions.length !== 1 ? 's' : ''}
        </Text>

        <FlatList
          data={filteredSubstitutions}
          renderItem={renderSubstitution}
          keyExtractor={(item) => item.ingredient}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultsCount: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ingredient: {
    ...typography.h3,
    color: colors.text,
  },
  category: {
    ...typography.bodySmall,
    color: colors.primary,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  substitute: {
    marginBottom: spacing.md,
  },
  substituteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  substituteName: {
    ...typography.button,
    color: colors.text,
  },
  ratio: {
    ...typography.bodySmall,
    color: colors.primary,
    backgroundColor: colors.baileySecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  notes: {
    ...typography.bodySmall,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});
