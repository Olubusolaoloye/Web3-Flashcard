import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'soft';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  /** Renders after the label instead of before it. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  icon,
  iconRight,
  fullWidth,
  size = 'lg',
  style,
}) => {
  const { colors, radius, shadow } = useTheme();

  const backgroundColor = {
    primary: colors.primary,
    secondary: colors.text,
    outline: 'transparent',
    ghost: 'transparent',
    success: colors.success,
    soft: colors.primaryMuted,
  }[variant];

  const textColor = {
    primary: colors.onPrimary,
    secondary: colors.textInverse,
    outline: colors.text,
    ghost: colors.primary,
    success: colors.onPrimary,
    soft: colors.primary,
  }[variant];

  const paddingVertical = size === 'lg' ? 17 : size === 'md' ? 13 : 10;
  const fontSize = size === 'lg' ? 15 : size === 'md' ? 14 : 13;

  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor: variant === 'outline' ? colors.border : 'transparent',
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderRadius: radius.full,
          opacity: disabled ? 0.45 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          width: fullWidth ? '100%' : undefined,
          paddingVertical,
        },
        variant === 'primary' && !disabled ? shadow.primary : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
          <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
          {iconRight ? <View style={{ marginLeft: 8 }}>{iconRight}</View> : null}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});
