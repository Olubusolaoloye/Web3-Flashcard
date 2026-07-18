import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padded?: boolean;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style, padded = true, elevated = true }) => {
  const { colors, radius, spacing, shadow } = useTheme();

  const base: ViewStyle = {
    backgroundColor: colors.glassOverlay,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderTopColor: colors.glassHighlight,
    padding: padded ? spacing.lg : 0,
    ...(elevated ? shadow.sm : {}),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [base, style, { opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] }]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[base, style]}>{children}</View>;
};
