import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText as Text, EmptyState, Flashcard, ProgressBar, ScreenHeader } from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { slugify } from '../../../src/utils/slug';

export default function Deck() {
  const { deckId, focus } = useLocalSearchParams<{ deckId: string; focus?: string }>();
  const { colors, spacing, radius, lift } = useTheme();
  const { progress, toggleTermMastered } = useProgress();
  const { glossary } = useContent();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const deck = useMemo(() => {
    if (deckId === 'all') return glossary;
    return glossary.filter((t) => slugify(t.category) === deckId);
  }, [deckId, glossary]);

  const initialIndex = useMemo(() => {
    if (!focus) return 0;
    const i = deck.findIndex((t) => t.id === focus);
    return i >= 0 ? i : 0;
  }, [deck, focus]);

  const [index, setIndex] = useState(initialIndex);

  if (deck.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        <ScreenHeader title="Flashcards" showBack />
        <EmptyState icon="🗂️" title="No cards in this deck" />
      </View>
    );
  }

  const safeIndex = Math.min(index, deck.length - 1);
  const card = deck[safeIndex];
  const deckTitle = deckId === 'all' ? 'All terms' : card.category;

  const goNext = () => setIndex((i) => (i + 1) % deck.length);
  const goPrev = () => setIndex((i) => (i - 1 + deck.length) % deck.length);

  const NavButton = ({
    icon,
    onPress,
    primary,
    label,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    primary?: boolean;
    label: string;
  }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        width: primary ? 62 : 54,
        height: primary ? 62 : 54,
        borderRadius: radius.full,
        backgroundColor: primary ? colors.primary : colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
        ...lift('sm'),
      })}
    >
      <Ionicons name={icon} size={primary ? 24 : 22} color={primary ? colors.onPrimary : colors.text} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <ScreenHeader title={deckTitle} subtitle={`Card ${safeIndex + 1} of ${deck.length}`} showBack />

      <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
        <ProgressBar fraction={(safeIndex + 1) / deck.length} height={5} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: spacing.xl, justifyContent: 'center' }}>
        <Flashcard
          card={card}
          isMastered={progress.masteredTermIds.includes(card.id)}
          onToggleMastered={() => toggleTermMastered(card.id)}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: spacing.lg,
          paddingBottom: spacing.lg,
          gap: spacing.xl,
        }}
      >
        <NavButton icon="chevron-back" onPress={goPrev} label="Previous card" />
        <NavButton
          icon="flash"
          primary
          onPress={() => router.push(`/quiz/deck-${deckId}` as never)}
          label="Quiz this deck"
        />
        <NavButton icon="chevron-forward" onPress={goNext} label="Next card" />
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: colors.textMuted,
          paddingBottom: spacing.sm,
        }}
      >
        Tap the card to flip · {progress.masteredTermIds.length} mastered
      </Text>
    </View>
  );
}
