import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { AppText as Text } from '../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, Flashcard, ScreenHeader } from '../../../src/components';
import { GLOSSARY } from '../../../src/data/glossary';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { slugify } from '../../../src/utils/slug';

export default function Deck() {
  const { deckId, focus } = useLocalSearchParams<{ deckId: string; focus?: string }>();
  const { colors, spacing } = useTheme();
  const { progress, toggleTermMastered } = useProgress();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const deck = useMemo(() => {
    if (deckId === 'all') return GLOSSARY;
    return GLOSSARY.filter((t) => slugify(t.category) === deckId);
  }, [deckId]);

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

  const card = deck[index];
  const deckTitle = deckId === 'all' ? 'All Terms' : card.category;

  const goNext = () => setIndex((i) => (i + 1) % deck.length);
  const goPrev = () => setIndex((i) => (i - 1 + deck.length) % deck.length);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <ScreenHeader title={deckTitle} subtitle={`${index + 1} of ${deck.length}`} showBack right={<View style={{ width: 36 }} />} />

      <View style={{ flex: 1, paddingHorizontal: spacing.xl, justifyContent: 'center' }}>
        <Flashcard card={card} isMastered={progress.masteredTermIds.includes(card.id)} onToggleMastered={() => toggleTermMastered(card.id)} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: insets.bottom + spacing.lg + 84,
          gap: spacing.xl,
        }}
      >
        <Pressable
          onPress={goPrev}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Pressable
          onPress={() => router.push(`/quiz/deck-${deckId}`)}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="flash" size={22} color={colors.onPrimary} />
        </Pressable>
        <Pressable
          onPress={goNext}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="chevron-forward" size={22} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}
