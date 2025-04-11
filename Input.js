import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export const Input = ({
  label,
  error,
  icon,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        error && styles.inputError,
        icon && styles.inputWithIcon
      ]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIconText, inputStyle]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.md,
    color: theme.colors.text,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  iconContainer: {
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWithIconText: {
    paddingLeft: 0,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sm,
    marginTop: theme.spacing.xs,
  },
}); 