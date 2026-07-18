import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText as Text } from './AppText';
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
        color: active ? colors.onPrimary : colors.textMuted,
      }}
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
          maxWidth: '100%',
          flexShrink: 1,
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
        maxWidth: '100%',
        flexShrink: 1,
      })}
    >
      {content}
    </Pressable>
  );
};
