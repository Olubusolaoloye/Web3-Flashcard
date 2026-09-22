import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
  /** Renders the title at display size (used for top-level tab screens). */
  large?: boolean;
}

/** Round icon button on a raised white circle — the back/action affordance
 * used across the redesigned screens. */
export const IconButton: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  badge?: boolean;
  accessibilityLabel?: string;
}> = ({ icon, onPress, size = 42, badge, accessibilityLabel }) => {
  const { colors, radius, lift } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.8 : 1,
        ...lift('sm'),
      })}
    >
      <Ionicons name={icon} size={size * 0.45} color={colors.text} />
      {badge ? (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.primary,
            borderWidth: 1.5,
            borderColor: colors.surface,
          }}
        />
      ) : null}
    </Pressable>
  );
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle, showBack, right, large }) => {
  const { colors, spacing, typography } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
        {showBack ? (
          <View style={{ marginRight: spacing.sm }}>
            <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel="Go back" />
          </View>
        ) : null}
        <View style={{ flexShrink: 1 }}>
          {subtitle ? (
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: colors.textMuted, marginBottom: 2 }}>
              {subtitle}
            </Text>
          ) : null}
          <Text
            style={{ ...(large ? typography.display : typography.title), color: colors.text }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </View>
      {right}
    </View>
  );
};
