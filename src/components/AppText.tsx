import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

const WEIGHT_TO_FAMILY: Record<string, string> = {
  '400': 'Inter_400Regular',
  normal: 'Inter_400Regular',
  '500': 'Inter_500Medium',
  '600': 'Inter_600SemiBold',
  '700': 'Inter_700Bold',
  bold: 'Inter_700Bold',
  '800': 'Inter_800ExtraBold',
  '900': 'Inter_900Black',
};

/** Drop-in replacement for RN's Text that maps `fontWeight` to the matching static Inter cut,
 * since Android can't synthesize weights from a single non-variable font file. */
export const AppText: React.FC<TextProps> = ({ style, ...props }) => {
  const flattened = StyleSheet.flatten(style) ?? {};
  const fontFamily = flattened.fontFamily ?? WEIGHT_TO_FAMILY[String(flattened.fontWeight ?? '400')] ?? 'Inter_400Regular';

  return <RNText {...props} style={[style, { fontFamily }]} />;
};

export default AppText;
