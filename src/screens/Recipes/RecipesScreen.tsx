import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Recipe, RecipeCategory } from '../../types';
import { DEFAULT_RECIPES } from '../../data/recipes';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { StorageService } from '../../services/storage';
import { STORAGE_KEYS } from '../../types';

export const RecipesScreen = () => {
  const navigation = useNavigation<any>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'All'>('All');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const savedRecipes = await StorageService.getItem<Recipe[]>(STORAGE_KEYS.RECIPES);
    if (savedRecipes && savedRecipes.length > 0) {
      setRecipes(savedRecipes);
    } else {
      // Load default recipes
      setRecipes(DEFAULT_RECIPES);
      await StorageService.setItem(STORAGE_KEYS.RECIPES, DEFAULT_RECIPES);
    }
  };

  const categories: (RecipeCategory | 'All')[] = [
    'All',
    'Cookies',
    'Cakes',
    'Bread',
    'Pastries',
    'Desserts',
    'Other',
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Card style={styles.recipeCard}>
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          {item.isFavorite && <Text style={styles.favoriteIcon}>⭐</Text>}
        </View>
        <Text style={styles.recipeCategory}>{item.category}</Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeDetail}>
            ⏱️ {item.prepTime + item.bakeTime} min
          </Text>
          <Text style={styles.recipeDetail}>
            🌡️ {item.temperature.fahrenheit}°F
          </Text>
          <Text style={styles.recipeDetail}>
            🍽️ {item.servings} servings
          </Text>
        </View>
        <View style={styles.recipeTags}>
          {item.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📖 Recipe Book</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textLight}
        />

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recipes List */}
        <Text style={styles.resultsCount}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </Text>

        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.recipesList}
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
  categoriesScroll: {
    marginBottom: spacing.md,
  },
  categoriesContent: {
    paddingRight: spacing.md,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14,
  },
  categoryTextActive: {
    color: colors.textInverse,
  },
  resultsCount: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  recipesList: {
    paddingBottom: spacing.xl,
  },
  recipeCard: {
    marginBottom: spacing.md,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  recipeTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  favoriteIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },
  recipeCategory: {
    ...typography.bodySmall,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  recipeDescription: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  recipeDetail: {
    ...typography.bodySmall,
    color: colors.text,
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    marginTop: spacing.xs,
  },
  tagText: {
    ...typography.caption,
    color: colors.text,
  },
});
