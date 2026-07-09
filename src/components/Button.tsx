import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  icon,
  fullWidth,
  size = 'lg',
  style,
}) => {
  const { colors, radius } = useTheme();

  const backgroundColor = {
    primary: colors.primary,
    secondary: colors.text,
    outline: 'transparent',
    ghost: 'transparent',
    success: colors.success,
  }[variant];

  const textColor = variant === 'outline' || variant === 'ghost' ? colors.text : colors.textInverse;

  const borderColor = variant === 'outline' ? colors.border : 'transparent';

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
          borderColor,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderRadius: radius.lg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          width: fullWidth ? '100%' : undefined,
          paddingVertical: size === 'lg' ? 16 : 12,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text
            style={[
              styles.text,
              { color: textColor, fontSize: size === 'lg' ? 15 : 13 },
              icon ? { marginLeft: 8 } : null,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
