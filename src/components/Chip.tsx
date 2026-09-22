import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
  icon?: React.ReactNode;
  /** Tinted-on-muted look instead of the default neutral pill. */
  tone?: 'neutral' | 'tint';
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onPress, color, icon, tone = 'neutral', style }) => {
  const { colors, radius } = useTheme();
  const accent = color ?? colors.primary;

  const backgroundColor = active ? accent : tone === 'tint' ? accent + '1F' : colors.surfaceAlt;
  const textColor = active ? colors.onPrimary : tone === 'tint' ? accent : colors.textMuted;

  const inner = (
    <>
      {icon ? <View style={{ marginRight: 5 }}>{icon}</View> : null}
      <Text style={{ fontSize: 12.5, fontWeight: '700', color: textColor, letterSpacing: -0.1 }} numberOfLines={1}>
        {label}
      </Text>
    </>
  );

  const base: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: onPress ? 15 : 12,
    paddingVertical: onPress ? 9 : 7,
    borderRadius: radius.full,
    backgroundColor,
    maxWidth: '100%',
    flexShrink: 1,
  };

  if (!onPress) {
    return <View style={[base, style]}>{inner}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [base, { opacity: pressed ? 0.8 : 1 }, style]}>
      {inner}
    </Pressable>
  );
};
