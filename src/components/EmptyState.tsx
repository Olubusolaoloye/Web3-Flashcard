import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';
import { IconTile } from './IconTile';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '🔍', title, message }) => {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.xxl, paddingHorizontal: spacing.xl }}>
      <IconTile emoji={icon} size={64} variant={0} style={{ marginBottom: spacing.md }} />
      <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 5, letterSpacing: -0.2 }}>
        {title}
      </Text>
      {message ? (
        <Text style={{ fontSize: 13.5, color: colors.textMuted, textAlign: 'center', lineHeight: 20 }}>{message}</Text>
      ) : null}
    </View>
  );
};
