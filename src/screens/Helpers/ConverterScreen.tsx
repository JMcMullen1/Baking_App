import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convert,
} from '../../utils/conversions';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

export const ConverterScreen = () => {
  const [activeTab, setActiveTab] = useState<'temp' | 'weight' | 'volume'>('temp');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('g');
  const [toUnit, setToUnit] = useState('oz');

  const convertValue = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '--';

    try {
      if (activeTab === 'temp') {
        return fromUnit === 'celsius'
          ? celsiusToFahrenheit(value)
          : fahrenheitToCelsius(value);
      } else {
        return convert(value, fromUnit as any, toUnit as any);
      }
    } catch (error) {
      return 'Error';
    }
  };

  const weightUnits = ['g', 'kg', 'oz', 'lb'];
  const volumeUnits = ['ml', 'l', 'cup', 'tbsp', 'tsp'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>📏 Unit Converter</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'temp' && styles.tabActive]}
            onPress={() => setActiveTab('temp')}
          >
            <Text
              style={[styles.tabText, activeTab === 'temp' && styles.tabTextActive]}
            >
              Temperature
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'weight' && styles.tabActive]}
            onPress={() => {
              setActiveTab('weight');
              setFromUnit('g');
              setToUnit('oz');
            }}
          >
            <Text
              style={[styles.tabText, activeTab === 'weight' && styles.tabTextActive]}
            >
              Weight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'volume' && styles.tabActive]}
            onPress={() => {
              setActiveTab('volume');
              setFromUnit('ml');
              setToUnit('cup');
            }}
          >
            <Text
              style={[styles.tabText, activeTab === 'volume' && styles.tabTextActive]}
            >
              Volume
            </Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.converterCard}>
          {/* Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="decimal-pad"
              placeholder="Enter amount"
              placeholderTextColor={colors.textLight}
            />
            {activeTab === 'temp' ? (
              <View style={styles.unitButtons}>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    fromUnit === 'celsius' && styles.unitButtonActive,
                  ]}
                  onPress={() => setFromUnit('celsius')}
                >
                  <Text style={styles.unitButtonText}>°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    fromUnit === 'fahrenheit' && styles.unitButtonActive,
                  ]}
                  onPress={() => setFromUnit('fahrenheit')}
                >
                  <Text style={styles.unitButtonText}>°F</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(activeTab === 'weight' ? weightUnits : volumeUnits).map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitButton,
                      fromUnit === unit && styles.unitButtonActive,
                    ]}
                    onPress={() => setFromUnit(unit)}
                  >
                    <Text style={styles.unitButtonText}>{unit}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Arrow */}
          <Text style={styles.arrow}>↓</Text>

          {/* Output */}
          <View style={styles.resultCard}>
            <Text style={styles.resultValue}>{convertValue()}</Text>
            {activeTab === 'temp' ? (
              <Text style={styles.resultUnit}>
                °{fromUnit === 'celsius' ? 'F' : 'C'}
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(activeTab === 'weight' ? weightUnits : volumeUnits).map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitButton,
                      toUnit === unit && styles.unitButtonActive,
                    ]}
                    onPress={() => setToUnit(unit)}
                  >
                    <Text style={styles.unitButtonText}>{unit}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
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
  tabs: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14,
  },
  tabTextActive: {
    color: colors.textInverse,
  },
  converterCard: {},
  inputRow: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  unitButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  unitButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unitButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unitButtonText: {
    ...typography.button,
    fontSize: 14,
    color: colors.text,
  },
  arrow: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.primary,
    marginVertical: spacing.md,
  },
  resultCard: {
    backgroundColor: colors.accent,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  resultValue: {
    ...typography.h1,
    fontSize: 48,
    color: colors.text,
    marginBottom: spacing.md,
  },
  resultUnit: {
    ...typography.h2,
    color: colors.textLight,
  },
});
