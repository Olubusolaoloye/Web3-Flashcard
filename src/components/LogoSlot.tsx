import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

/**
 * The Web3 Academy brand mark.
 *
 * The artwork is a monogram with no wordmark of its own, so `variant="full"` pairs it
 * with the app name as type; `variant="mark"` renders the monogram alone.
 *
 * Two colourways ship because the brand violet (#5A1CC7) all but vanishes against the
 * dark canvas (#12101F) — `logo-light.png` is the same art recoloured to the dark
 * scheme's brightened primary. If the placeholder ever needs to come back (new art in
 * flight, say), set a source to null and that scheme falls back to a sized placeholder
 * so nothing shifts.
 */
const LOGO_SOURCES: { light: ImageSourcePropType | null; dark: ImageSourcePropType | null } = {
  light: require('../../assets/logo.png'),
  dark: require('../../assets/logo-light.png'),
};

/** Intrinsic aspect ratio of the artwork, trimmed of its transparent margin. */
const MARK_ASPECT = 1024 / 684;

type Variant = 'mark' | 'full';

interface LogoSlotProps {
  /** 'mark' is the monogram alone; 'full' adds the "Web3 Academy" wordmark beside it. */
  variant?: Variant;
  /** Height of the monogram in px. The wordmark scales from it. */
  height?: number;
  style?: ViewStyle;
}

export const LogoSlot: React.FC<LogoSlotProps> = ({ variant = 'mark', height = 56, style }) => {
  const { colors, radius, scheme } = useTheme();
  const source = LOGO_SOURCES[scheme] ?? LOGO_SOURCES.light;
  const width = height * MARK_ASPECT;

  const mark = source ? (
    <Image
      source={source}
      style={{ width, height } as StyleProp<ImageStyle>}
      resizeMode="contain"
      accessibilityLabel="Web3 Academy"
    />
  ) : (
    <View
      style={{
        width,
        height,
        borderRadius: radius.sm,
        backgroundColor: colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primary + '33',
        borderStyle: 'dashed',
      }}
      accessibilityLabel="Logo placeholder"
    >
      <Text style={{ fontSize: Math.min(height * 0.34, 22), fontWeight: '900', color: colors.primary }}>WA</Text>
    </View>
  );

  if (variant === 'mark') {
    return <View style={style}>{mark}</View>;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {mark}
      <Text
        style={{
          marginLeft: height * 0.22,
          fontSize: height * 0.46,
          fontWeight: '800',
          letterSpacing: -0.5,
          color: colors.text,
        }}
      >
        Web3 Academy
      </Text>
    </View>
  );
};
