import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, QuizRunner } from '../../src/components';
import { GLOSSARY } from '../../src/data/glossary';
import { MODULES } from '../../src/data/modules';
import { MODULE_QUIZZES } from '../../src/data/quizzes';
import { useProgress } from '../../src/state/ProgressContext';
import { useTheme } from '../../src/theme';
import { QuizQuestion } from '../../src/types';
import { generateTermQuiz } from '../../src/utils/quizGenerator';
import { slugify } from '../../src/utils/slug';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { colors, spacing } = useTheme();
  const { recordQuizAttempt } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [seed, setSeed] = useState(0);

  const resolved = useMemo(() => {
    if (!quizId) return null;

    if (quizId === 'daily') {
      return { title: 'Daily Challenge', questions: generateTermQuiz(GLOSSARY, 8, 'daily') };
    }

    if (quizId.startsWith('quiz-')) {
      const moduleId = quizId.replace('quiz-', '');
      const staticQuiz = MODULE_QUIZZES.find((q) => q.id === quizId);
      const moduleTitle = MODULES.find((m) => m.id === moduleId)?.title ?? 'Module Quiz';
      if (staticQuiz) return { title: moduleTitle, questions: staticQuiz.questions as QuizQuestion[] };
      return null;
    }

    if (quizId.startsWith('deck-')) {
      const deckId = quizId.replace('deck-', '');
      const pool = deckId === 'all' ? GLOSSARY : GLOSSARY.filter((t) => slugify(t.category) === deckId);
      const title = deckId === 'all' ? 'All Terms' : pool[0]?.category ?? 'Deck Quiz';
      return { title: `${title} Quiz`, questions: generateTermQuiz(pool, 8, 'deck') };
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, seed]);

  if (!resolved || resolved.questions.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop: insets.top }}>
        <QuizHeader onClose={() => router.back()} colors={colors} spacing={spacing} />
        <EmptyState icon="🧠" title="No quiz available" message="This deck doesn't have enough cards yet." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop: insets.top }}>
      <QuizHeader onClose={() => router.back()} colors={colors} spacing={spacing} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}>
        <QuizRunner
          key={seed}
          title={resolved.title}
          questions={resolved.questions}
          onComplete={(score, total) => recordQuizAttempt(quizId, score, total)}
          onRetry={() => setSeed((s) => s + 1)}
          onExit={() => router.back()}
        />
      </ScrollView>
    </View>
  );
}

function QuizHeader({
  onClose,
  colors,
  spacing,
}: {
  onClose: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
      <Pressable
        onPress={onClose}
        hitSlop={12}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.surfaceAlt,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="close" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}
