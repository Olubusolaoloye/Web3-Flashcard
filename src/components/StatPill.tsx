import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';
import { IconTile } from './IconTile';

interface StatPillProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  /** Index into the pastel tile palette. */
  variant?: number;
  color?: string;
}

export const StatPill: React.FC<StatPillProps> = ({ icon, label, value, variant = 0, color }) => {
  const { colors, radius, spacing, lift } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xs,
        alignItems: 'center',
        ...lift('sm'),
      }}
    >
      <IconTile icon={icon} variant={variant} size={38} color={color} style={{ marginBottom: 8 }} />
      <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, letterSpacing: -0.4 }}>{value}</Text>
      <Text
        style={{ fontSize: 11, fontWeight: '600', color: colors.textMuted, marginTop: 1 }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};
