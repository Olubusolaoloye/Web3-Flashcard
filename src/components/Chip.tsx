import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onPress, color }) => {
  const { colors, radius } = useTheme();
  const accent = color ?? colors.primary;

  const content = (
    <Text
      style={{
        fontSize: 12,
        fontWeight: '800',
        color: active ? colors.textInverse : colors.textMuted,
      }}
      numberOfLines={1}
    >
      {label}
    </Text>
  );

  if (!onPress) {
    return (
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: radius.full,
          backgroundColor: active ? accent : colors.surfaceAlt,
        }}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: radius.full,
        backgroundColor: active ? accent : colors.surfaceAlt,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {content}
    </Pressable>
  );
};
