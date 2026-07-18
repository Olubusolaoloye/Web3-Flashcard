import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { AppText as Text } from './AppText';
import { useTheme } from '../theme';

interface StatPillProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  color?: string;
}

export const StatPill: React.FC<StatPillProps> = ({ icon, label, value, color }) => {
  const { colors, radius, spacing } = useTheme();
  const accent = color ?? colors.primary;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: accent + '1A',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 6,
        }}
      >
        <Ionicons name={icon} size={17} color={accent} />
      </View>
      <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>{value}</Text>
      <Text style={{ fontSize: 10, fontWeight: '700', color: colors.textMuted, marginTop: 2, letterSpacing: 0.3 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
};
