import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

/**
 * Reserved space for the brand logo.
 *
 * The artwork isn't in the repo yet, so this renders a neutral placeholder at the
 * exact final dimensions — nothing will shift when the real file lands. To ship the
 * logo: drop it at `assets/logo.png` (and `assets/logo-light.png` if the dark scheme
 * needs a lighter lockup), then set LOGO_SOURCES below. Every screen picks it up.
 */
const LOGO_SOURCES: { light: ImageSourcePropType | null; dark: ImageSourcePropType | null } = {
  light: null,
  dark: null,
};

type Variant = 'mark' | 'full';

interface LogoSlotProps {
  /** 'mark' is the square app icon; 'full' is the horizontal lockup with wordmark. */
  variant?: Variant;
  /** Height in px. Width follows the variant's aspect ratio. */
  height?: number;
  style?: ViewStyle;
}

const ASPECT: Record<Variant, number> = { mark: 1, full: 3.4 };

export const LogoSlot: React.FC<LogoSlotProps> = ({ variant = 'mark', height = 56, style }) => {
  const { colors, radius, scheme } = useTheme();
  const width = height * ASPECT[variant];
  const source = LOGO_SOURCES[scheme] ?? LOGO_SOURCES.light;

  if (source) {
    return (
      <Image
        source={source}
        style={[{ width, height }, style as StyleProp<ImageStyle>]}
        resizeMode="contain"
        accessibilityLabel="Web3 Academy"
      />
    );
  }

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: variant === 'mark' ? radius.md : radius.sm,
          backgroundColor: colors.primaryMuted,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: colors.primary + '33',
          borderStyle: 'dashed',
        },
        style,
      ]}
      accessibilityLabel="Logo placeholder"
    >
      <Text
        style={{
          fontSize: variant === 'mark' ? Math.min(height * 0.34, 22) : Math.min(height * 0.36, 17),
          fontWeight: '900',
          color: colors.primary,
          letterSpacing: variant === 'mark' ? -0.5 : -0.3,
        }}
      >
        {variant === 'mark' ? 'W3' : 'Web3 Academy'}
      </Text>
    </View>
  );
};
