import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText as Text } from './AppText';
import { useTheme } from '../theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle, showBack, right }) => {
  const { colors, spacing } = useTheme();
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
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.surfaceAlt,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.sm,
            }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Pressable>
        ) : null}
        <View style={{ flexShrink: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: '800', letterSpacing: -0.3, color: colors.text }} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ fontSize: 12, fontWeight: '700', letterSpacing: 0.4, color: colors.textMuted, marginTop: 2 }}>
              {subtitle.toUpperCase()}
            </Text>
          ) : null}
        </View>
      </View>
      {right}
    </View>
  );
};
