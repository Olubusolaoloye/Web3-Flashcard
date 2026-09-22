import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText as Text } from './AppText';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GlossaryTerm } from '../types';
import { useTheme } from '../theme';

interface FlashcardProps {
  card: GlossaryTerm;
  isMastered?: boolean;
  onToggleMastered?: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, isMastered, onToggleMastered }) => {
  const { colors, radius, spacing, lift } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // reset to front whenever the underlying card changes
    setIsFlipped(false);
    rotation.value = 0;
  }, [card.id, rotation]);

  const flip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    const next = !isFlipped;
    setIsFlipped(next);
    rotation.value = withTiming(next ? 180 : 0, { duration: 450 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` }],
    opacity: interpolate(rotation.value, [0, 89, 90, 180], [1, 1, 0, 0]),
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` }],
    opacity: interpolate(rotation.value, [0, 89, 90, 180], [0, 0, 1, 1]),
  }));

  return (
    <Pressable onPress={flip} style={{ width: '100%', aspectRatio: 0.72 }}>
      <Animated.View
        style={[
          frontStyle,
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: colors.surface,
            borderRadius: radius.card,
            padding: spacing.xl,
            justifyContent: 'space-between',
            backfaceVisibility: 'hidden',
            ...lift('md'),
          },
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 44, fontWeight: '900', color: colors.primary, opacity: 0.18 }}>{card.letter}</Text>
          {isMastered ? (
            <View
              style={{
                backgroundColor: colors.successMuted,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: radius.full,
              }}
            >
              <Text style={{ color: colors.success, fontSize: 10.5, fontWeight: '800' }}>Mastered</Text>
            </View>
          ) : null}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center' }}>{card.term}</Text>
          <Text style={{ marginTop: 8, fontSize: 12.5, fontWeight: '600', color: colors.textMuted }}>
            {card.category}
          </Text>
        </View>
        <Text style={{ fontSize: 11, color: colors.textMuted, textAlign: 'center' }}>Tap to reveal definition</Text>
      </Animated.View>

      <Animated.View
        style={[
          backStyle,
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: radius.card,
            padding: spacing.xl,
            justifyContent: 'space-between',
            backfaceVisibility: 'hidden',
            overflow: 'hidden',
          },
        ]}
      >
        <LinearGradient
          colors={colors.accentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: '#FFFFFF', opacity: 0.7, fontWeight: '800', fontSize: 15 }}>{card.term}</Text>
          {onToggleMastered ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                onToggleMastered();
              }}
              hitSlop={10}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: isMastered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
            </Pressable>
          ) : null}
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', lineHeight: 22, marginBottom: 14 }}>
            {card.definition}
          </Text>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.14)', padding: 12, borderRadius: radius.md }}>
            <Text style={{ color: '#FFFFFF', opacity: 0.75, fontSize: 10, fontWeight: '800', marginBottom: 4 }}>
              Example
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontStyle: 'italic', opacity: 0.95 }}>
              {card.example}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 11, color: '#FFFFFF', opacity: 0.7, textAlign: 'center' }}>Tap to flip back</Text>
      </Animated.View>
    </Pressable>
  );
};
