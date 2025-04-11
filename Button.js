import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.border,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        };
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textSecondary;
    switch (variant) {
      case 'primary':
        return theme.colors.background;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return theme.colors.text;
      default:
        return theme.colors.background;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              icon && styles.textWithIcon,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
  },
  text: {
    fontSize: theme.typography.md,
    fontWeight: '600',
  },
  textWithIcon: {
    marginLeft: theme.spacing.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button; 