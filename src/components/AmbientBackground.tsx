import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme';

function Blob({ color, size, startX, startY, driftX, driftY, duration, opacity }: {
  color: string;
  size: number;
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  duration: number;
  opacity: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [progress, duration]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: startX + progress.value * driftX },
      { translateY: startY + progress.value * driftY },
    ],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
        },
      ]}
    />
  );
}

/** Full-screen ambient backdrop: base gradient + slow-drifting color blobs + a blur pass,
 * mounted once at the root so translucent "glass" cards throughout the app read as frosted
 * panels floating over it. */
export const AmbientBackground: React.FC = () => {
  const { colors, scheme } = useTheme();
  const { width, height } = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={colors.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Blob
        color={colors.primary}
        size={width * 0.9}
        startX={width * 0.15}
        startY={height * 0.02}
        driftX={40}
        driftY={30}
        duration={14000}
        opacity={scheme === 'dark' ? 0.22 : 0.16}
      />
      <Blob
        color={colors.secondary}
        size={width * 0.8}
        startX={-width * 0.25}
        startY={height * 0.45}
        driftX={-30}
        driftY={40}
        duration={17000}
        opacity={scheme === 'dark' ? 0.2 : 0.14}
      />
      <BlurView intensity={70} tint={colors.glassTint} style={StyleSheet.absoluteFill} />
    </View>
  );
};
