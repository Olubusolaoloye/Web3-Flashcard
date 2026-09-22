import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

interface SegmentedTabsProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  style?: ViewStyle;
}

/** Pill-in-a-trough segmented control used for the detail-screen tabs. */
export function SegmentedTabs<T extends string>({ options, value, onChange, style }: SegmentedTabsProps<T>) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.surfaceAlt,
          borderRadius: radius.full,
          padding: 4,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => ({
              flex: 1,
              paddingVertical: 10,
              borderRadius: radius.full,
              backgroundColor: active ? colors.surface : 'transparent',
              alignItems: 'center',
              opacity: pressed && !active ? 0.6 : 1,
              ...(active && !colors.cardBordered
                ? {
                    shadowColor: '#2E1065',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : {}),
            })}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: active ? colors.text : colors.textMuted,
                letterSpacing: -0.1,
              }}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
