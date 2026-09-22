import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { AlphaSpotlight } from '../types';
import { useTheme } from '../theme';
import { formatTimeRemaining } from '../utils/time';
import { AppText as Text } from './AppText';

interface AlphaCarouselProps {
  alphas: AlphaSpotlight[];
}

/**
 * Horizontally paged promo strip for Alpha Spotlights.
 *
 * Width is measured with onLayout rather than read from Dimensions, because
 * `pagingEnabled` snaps by the ScrollView's own width — children sized from the
 * window width instead of the container width page out of alignment.
 */
export const AlphaCarousel: React.FC<AlphaCarouselProps> = ({ alphas }) => {
  const { colors, radius, spacing, lift } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const [index, setIndex] = useState(0);

  if (alphas.length === 0) return null;

  const openLink = (link: string) => {
    // Opens in the device's browser, not an in-app webview.
    Linking.openURL(link).catch(() => {});
  };

  return (
    <View onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      {containerWidth > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={alphas.length > 1}
          onMomentumScrollEnd={(e) =>
            setIndex(Math.round(e.nativeEvent.contentOffset.x / Math.max(1, containerWidth)))
          }
        >
          {alphas.map((alpha) => (
            <View key={alpha.id} style={{ width: containerWidth }}>
              <Pressable
                onPress={() => openLink(alpha.link)}
                accessibilityRole="link"
                accessibilityLabel={`${alpha.title} — opens in your browser`}
                style={({ pressed }) => ({
                  backgroundColor: colors.surface,
                  borderRadius: radius.card,
                  overflow: 'hidden',
                  opacity: pressed ? 0.94 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                  ...lift('md'),
                })}
              >
                <View style={{ position: 'relative' }}>
                  <Image
                    source={{ uri: alpha.imageUrl }}
                    style={{ width: '100%', height: 148, backgroundColor: colors.surfaceAlt }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: spacing.sm,
                      left: spacing.sm,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: radius.full,
                      backgroundColor: 'rgba(20, 18, 31, 0.6)',
                    }}
                  >
                    <Text style={{ fontSize: 10.5, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.4 }}>
                      {alpha.category.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: spacing.sm,
                      right: spacing.sm,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                      borderRadius: radius.full,
                      backgroundColor: 'rgba(20, 18, 31, 0.6)',
                    }}
                  >
                    <Ionicons name="time-outline" size={11} color="#FFFFFF" />
                    <Text style={{ fontSize: 10.5, fontWeight: '700', color: '#FFFFFF', marginLeft: 4 }}>
                      {formatTimeRemaining(alpha.expiresAt)}
                    </Text>
                  </View>
                </View>

                <View style={{ padding: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text
                      style={{ fontSize: 15.5, fontWeight: '800', color: colors.text, letterSpacing: -0.3, flex: 1 }}
                      numberOfLines={1}
                    >
                      {alpha.title}
                    </Text>
                    <Ionicons name="open-outline" size={15} color={colors.primary} style={{ marginLeft: 8 }} />
                  </View>
                  <Text
                    style={{ fontSize: 13, color: colors.textMuted, lineHeight: 19, marginTop: 3 }}
                    numberOfLines={2}
                  >
                    {alpha.description}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ height: 240 }} />
      )}

      {alphas.length > 1 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm }}>
          {alphas.map((alpha, i) => (
            <View
              key={alpha.id}
              style={{
                width: i === index ? 18 : 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 3,
                backgroundColor: i === index ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};
