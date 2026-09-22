import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText as Text, Button, IconTile, LogoSlot } from '../src/components';
import { useProgress } from '../src/state/ProgressContext';
import { useTheme } from '../src/theme';

const SLIDES: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  {
    icon: 'school',
    title: 'Learn Web3, one bite at a time',
    body: 'Short lessons take you from total beginner to confidently fluent in blockchain, DeFi, and NFTs.',
  },
  {
    icon: 'albums',
    title: 'Flashcards that stick',
    body: 'Flip through a growing glossary, mark what you’ve mastered, and quiz yourself to lock it in.',
  },
  {
    icon: 'trophy',
    title: 'Track streaks & earn badges',
    body: 'Build a daily streak, level up, and unlock achievements as you explore chains and ace quizzes.',
  },
];

export default function Onboarding() {
  const { colors, spacing, typography } = useTheme();
  const { completeOnboarding } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width <= 0) return;
    setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const finish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const next = () => {
    if (page < SLIDES.length - 1 && width > 0) {
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      finish();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <View style={{ alignItems: 'center', paddingTop: insets.top + spacing.xl }}>
        <LogoSlot variant="full" height={44} />
      </View>

      {width > 0 ? (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {SLIDES.map((slide, idx) => (
            <View
              key={slide.title}
              style={{
                width,
                paddingHorizontal: spacing.xxl,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconTile icon={slide.icon} variant={idx} size={132} style={{ marginBottom: spacing.xxl }} />
              <Text style={{ ...typography.display, color: colors.text, textAlign: 'center', marginBottom: spacing.sm }}>
                {slide.title}
              </Text>
              <Text style={{ fontSize: 15, color: colors.textMuted, textAlign: 'center', lineHeight: 23 }}>
                {slide.body}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      <View style={{ paddingHorizontal: spacing.xxl, paddingBottom: insets.bottom + spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xl }}>
          {SLIDES.map((slide, idx) => (
            <View
              key={slide.title}
              style={{
                width: idx === page ? 22 : 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: idx === page ? colors.primary : colors.border,
                marginHorizontal: 3.5,
              }}
            />
          ))}
        </View>
        <Button title={page === SLIDES.length - 1 ? 'Get started' : 'Next'} onPress={next} fullWidth />
        {page < SLIDES.length - 1 ? (
          <Pressable onPress={finish} style={{ marginTop: spacing.sm, alignItems: 'center', padding: 8 }}>
            <Text style={{ color: colors.textMuted, fontSize: 13.5, fontWeight: '700' }}>Skip</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
