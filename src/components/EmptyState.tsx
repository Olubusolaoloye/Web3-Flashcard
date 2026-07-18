import React from 'react';
import { View } from 'react-native';
import { AppText as Text } from './AppText';
import { useTheme } from '../theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '🔍', title, message }) => {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl, paddingHorizontal: spacing.xl }}>
      <Text style={{ fontSize: 40, marginBottom: spacing.sm }}>{icon}</Text>
      <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 }}>{title}</Text>
      {message ? (
        <Text style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 19 }}>{message}</Text>
      ) : null}
    </View>
  );
};
