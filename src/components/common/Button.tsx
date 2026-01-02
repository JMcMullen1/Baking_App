import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, borderRadius, spacing, typography, shadows } from '../../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`${size}Button`],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.textInverse}
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  text: {
    ...typography.button,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  secondaryText: {
    color: colors.textInverse,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  dangerText: {
    color: colors.textInverse,
  },

  // Sizes
  smallButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  smallText: {
    fontSize: 14,
  },
  mediumButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  mediumText: {
    fontSize: 16,
  },
  largeButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  largeText: {
    fontSize: 18,
  },

  disabled: {
    opacity: 0.5,
  },
});
