import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { AppText as Text } from './AppText';

interface IconTileProps {
  /** Ionicon name, or pass `emoji` instead. */
  icon?: keyof typeof Ionicons.glyphMap;
  emoji?: string;
  /** Index into the theme's pastel tile palette — pass a stable value (e.g. list index). */
  variant?: number;
  size?: number;
  /** Overrides the palette fill. */
  background?: string;
  /** Overrides the palette icon colour. */
  color?: string;
  style?: ViewStyle;
}

/** Rounded pastel square holding an icon or emoji — the reference design's
 * category/module marker. Colours cycle through the theme's tile palette. */
export const IconTile: React.FC<IconTileProps> = ({
  icon,
  emoji,
  variant = 0,
  size = 52,
  background,
  color,
  style,
}) => {
  const { colors, radius } = useTheme();
  const slot = ((variant % colors.tiles.length) + colors.tiles.length) % colors.tiles.length;
  const fill = background ?? colors.tiles[slot];
  const tint = color ?? colors.tileIcons[slot];

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size >= 48 ? radius.tile : radius.sm,
          backgroundColor: fill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {emoji ? (
        <Text style={{ fontSize: size * 0.46 }}>{emoji}</Text>
      ) : icon ? (
        <Ionicons name={icon} size={size * 0.44} color={tint} />
      ) : null}
    </View>
  );
};
