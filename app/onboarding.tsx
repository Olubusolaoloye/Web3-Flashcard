import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { AppText as Text } from '../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../src/components';
import { useProgress } from '../src/state/ProgressContext';
import { useTheme } from '../src/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: '🌐',
    title: 'Learn Web3, one bite at a time',
    body: 'Bite-sized lessons take you from total beginner to confidently fluent in blockchain, DeFi, and NFTs.',
  },
  {
    icon: '🃏',
    title: 'Flashcards that stick',
    body: 'Flip through a growing glossary of terms, mark what you’ve mastered, and quiz yourself to lock it in.',
  },
  {
    icon: '🏆',
    title: 'Track streaks & earn badges',
    body: 'Build a daily streak, level up, and unlock achievements as you explore chains and ace quizzes.',
  },
];

export default function Onboarding() {
  const { colors, spacing } = useTheme();
  const { completeOnboarding } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const p = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(p);
  };

  const finish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const next = () => {
    if (page < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      finish();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
          <View key={idx} style={{ width, paddingTop: insets.top + spacing.xxxl, paddingHorizontal: spacing.xxl, alignItems: 'center' }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: colors.primaryMuted,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.xxl,
              }}
            >
              <Text style={{ fontSize: 56 }}>{slide.icon}</Text>
            </View>
            <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: spacing.md }}>
              {slide.title}
            </Text>
            <Text style={{ fontSize: 15, color: colors.textMuted, textAlign: 'center', lineHeight: 22 }}>{slide.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: spacing.xxl, paddingBottom: insets.bottom + spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xl }}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={{
                width: idx === page ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: idx === page ? colors.primary : colors.border,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
        <Button title={page === SLIDES.length - 1 ? 'Get Started' : 'Next'} onPress={next} fullWidth />
        {page < SLIDES.length - 1 ? (
          <View style={{ marginTop: spacing.sm, alignItems: 'center' }}>
            <Text onPress={finish} style={{ color: colors.textMuted, fontSize: 13, fontWeight: '700', padding: 8 }}>
              Skip
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
