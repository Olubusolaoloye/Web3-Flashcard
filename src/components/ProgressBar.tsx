import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../theme';

interface ProgressBarProps {
  fraction: number; // 0-1
  height?: number;
  color?: string;
  trackColor?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ fraction, height = 10, color, trackColor, style }) => {
  const { colors, radius } = useTheme();
  const clamped = Math.max(0, Math.min(1, fraction));
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(clamped * 100, { duration: 600 });
  }, [clamped, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View
      style={[
        {
          height,
          borderRadius: radius.full,
          backgroundColor: trackColor ?? colors.surfaceAlt,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            borderRadius: radius.full,
            backgroundColor: color ?? colors.primary,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
