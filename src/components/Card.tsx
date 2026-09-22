import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padded?: boolean;
  elevated?: boolean;
  /** 'sm' for list rows, 'md' for feature cards. */
  level?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  padded = true,
  elevated = true,
  level = 'sm',
}) => {
  const { colors, radius, spacing, lift } = useTheme();

  const base: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: padded ? spacing.lg : 0,
    ...(elevated ? lift(level) : {}),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          base,
          style,
          { opacity: pressed ? 0.94 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[base, style]}>{children}</View>;
};
