import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText as Text, EmptyState, QuizRunner } from '../../src/components';
import { IconButton } from '../../src/components/ScreenHeader';
import { useContent } from '../../src/state/ContentContext';
import { useProgress } from '../../src/state/ProgressContext';
import { useTheme } from '../../src/theme';
import { QuizQuestion } from '../../src/types';
import { generateTermQuiz } from '../../src/utils/quizGenerator';
import { slugify } from '../../src/utils/slug';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { colors, spacing, typography } = useTheme();
  const { recordQuizAttempt } = useProgress();
  const { glossary, modules, quizzes } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [seed, setSeed] = useState(0);

  const resolved = useMemo(() => {
    if (!quizId) return null;

    if (quizId === 'daily') {
      return { title: 'Daily challenge', questions: generateTermQuiz(glossary, 8, 'daily', glossary) };
    }

    if (quizId.startsWith('quiz-')) {
      const moduleId = quizId.replace('quiz-', '');
      const staticQuiz = quizzes.find((q) => q.id === quizId);
      const moduleTitle = modules.find((m) => m.id === moduleId)?.title ?? 'Module quiz';
      if (staticQuiz) return { title: moduleTitle, questions: staticQuiz.questions as QuizQuestion[] };
      return null;
    }

    if (quizId.startsWith('deck-')) {
      const deckId = quizId.replace('deck-', '');
      const pool = deckId === 'all' ? glossary : glossary.filter((t) => slugify(t.category) === deckId);
      const title = deckId === 'all' ? 'All terms' : (pool[0]?.category ?? 'Deck');
      return { title: `${title} quiz`, questions: generateTermQuiz(pool, 8, 'deck', glossary) };
    }

    return null;
    // `seed` deliberately re-rolls the generated questions on retry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, seed, glossary, modules, quizzes]);

  const header = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
      }}
    >
      <Text style={{ ...typography.heading, color: colors.text }}>{resolved?.title ?? 'Quiz'}</Text>
      <IconButton icon="close" onPress={() => router.back()} size={38} accessibilityLabel="Close quiz" />
    </View>
  );

  if (!resolved || resolved.questions.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        {header}
        <EmptyState icon="🧠" title="No quiz available" message="This deck doesn't have enough cards yet." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      {header}
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
