import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Recipe } from '../../types';
import { DEFAULT_RECIPES } from '../../data/recipes';
import { scaleRecipe } from '../../utils/conversions';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { StorageService } from '../../services/storage';
import { STORAGE_KEYS } from '../../types';

export const RecipeDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    const recipes = await StorageService.getItem<Recipe[]>(STORAGE_KEYS.RECIPES);
    const allRecipes = recipes || DEFAULT_RECIPES;
    const found = allRecipes.find((r) => r.id === recipeId);
    if (found) {
      setRecipe(found);
    }
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading recipe...</Text>
      </SafeAreaView>
    );
  }

  const scaleFactors = [0.5, 1, 2, 3];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.category}>{recipe.category}</Text>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>

        {/* Recipe Info */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prep Time</Text>
              <Text style={styles.infoValue}>{recipe.prepTime} min</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Bake Time</Text>
              <Text style={styles.infoValue}>{recipe.bakeTime} min</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Total</Text>
              <Text style={styles.infoValue}>
                {recipe.prepTime + recipe.bakeTime} min
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Temperature</Text>
              <Text style={styles.infoValue}>
                {recipe.temperature.fahrenheit}°F / {recipe.temperature.celsius}°C
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Servings</Text>
              <Text style={styles.infoValue}>
                {Math.round(recipe.servings * scaleFactor)}
              </Text>
            </View>
          </View>
        </Card>

        {/* Scale Factor */}
        <Card style={styles.scaleCard}>
          <Text style={styles.sectionTitle}>Scale Recipe</Text>
          <View style={styles.scaleButtons}>
            {scaleFactors.map((factor) => (
              <TouchableOpacity
                key={factor}
                style={[
                  styles.scaleButton,
                  scaleFactor === factor && styles.scaleButtonActive,
                ]}
                onPress={() => setScaleFactor(factor)}
              >
                <Text
                  style={[
                    styles.scaleButtonText,
                    scaleFactor === factor && styles.scaleButtonTextActive,
                  ]}
                >
                  {factor}×
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Ingredients */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>
            🥣 Ingredients ({recipe.ingredients.length})
          </Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Text style={styles.ingredientBullet}>•</Text>
              <Text style={styles.ingredientText}>
                <Text style={styles.ingredientAmount}>
                  {scaleRecipe(ingredient.amount, scaleFactor)} {ingredient.unit}
                </Text>{' '}
                {ingredient.name}
                {ingredient.notes && (
                  <Text style={styles.ingredientNotes}> ({ingredient.notes})</Text>
                )}
              </Text>
            </View>
          ))}
        </Card>

        {/* Steps */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>
            📝 Instructions ({recipe.steps.length} steps)
          </Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        {/* Notes */}
        {recipe.notes && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Baker's Notes</Text>
            <Text style={styles.notesText}>{recipe.notes}</Text>
          </Card>
        )}

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {recipe.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
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
  loading: {
    ...typography.h2,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backText: {
    ...typography.button,
    color: colors.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  category: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textLight,
  },
  infoCard: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.button,
    color: colors.text,
  },
  scaleCard: {
    marginBottom: spacing.md,
  },
  scaleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scaleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  scaleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  scaleButtonText: {
    ...typography.button,
    color: colors.text,
  },
  scaleButtonTextActive: {
    color: colors.textInverse,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  ingredientRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  ingredientBullet: {
    ...typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  ingredientText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  ingredientAmount: {
    fontWeight: '600',
  },
  ingredientNotes: {
    ...typography.bodySmall,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    ...typography.button,
    color: colors.textInverse,
  },
  stepText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  notesText: {
    ...typography.body,
    color: colors.text,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
  },
  tag: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    ...typography.bodySmall,
    color: colors.text,
  },
});
