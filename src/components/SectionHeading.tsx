import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

interface SectionHeadingProps {
  title: string;
  /** Renders a trailing text action, e.g. "See all". */
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, actionLabel, onAction, style }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ ...typography.heading, color: colors.text, flexShrink: 1 }} numberOfLines={1}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          hitSlop={8}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.6 : 1 })}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', color: colors.primary }}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} style={{ marginLeft: 1 }} />
        </Pressable>
      ) : null}
    </View>
  );
};
