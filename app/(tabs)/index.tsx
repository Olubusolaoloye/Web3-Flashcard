import { Ionicons } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { AppText as Text } from '../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, ProgressBar, StatPill } from '../../src/components';
import { MODULES } from '../../src/data/modules';
import { LESSONS } from '../../src/data/lessons';
import { GLOSSARY } from '../../src/data/glossary';
import { useProgress } from '../../src/state/ProgressContext';
import { useTheme } from '../../src/theme';
import { getLevelProgress } from '../../src/utils/gamification';

export default function Home() {
  const { colors, spacing, radius } = useTheme();
  const { progress, isLoaded, completedModulesCount, lessonIdsByModule } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const level = getLevelProgress(progress.xp);

  const nextModule = useMemo(() => {
    return MODULES.find((m) => {
      const ids = lessonIdsByModule[m.id] ?? [];
      return ids.some((id) => !progress.completedLessonIds.includes(id));
    });
  }, [lessonIdsByModule, progress.completedLessonIds]);

  const nextLesson = useMemo(() => {
    if (!nextModule) return null;
    return LESSONS.filter((l) => l.moduleId === nextModule.id).find(
      (l) => !progress.completedLessonIds.includes(l.id)
    );
  }, [nextModule, progress.completedLessonIds]);

  const masteryPct = Math.round((progress.masteredTermIds.length / GLOSSARY.length) * 100) || 0;

  if (isLoaded && !progress.hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl + 84 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.4 }}>WELCOME BACK</Text>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Web3 Academy</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.primaryMuted,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: radius.full,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="flame" size={16} color={colors.warning} />
          <Text style={{ marginLeft: 4, fontWeight: '800', color: colors.text }}>{progress.currentStreak}</Text>
        </View>
      </View>

      <Card style={{ marginBottom: spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>
            Level {level.level} · {level.title}
          </Text>
          <Text style={{ color: colors.textMuted, fontWeight: '700', fontSize: 12 }}>
            {level.xpIntoLevel}/{level.xpForNextLevel} XP
          </Text>
        </View>
        <ProgressBar fraction={level.fraction} />
      </Card>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <StatPill icon="book" label="Lessons" value={progress.completedLessonIds.length} color={colors.primary} />
        <StatPill icon="albums" label="Mastered" value={`${masteryPct}%`} color={colors.secondary} />
        <StatPill icon="ribbon" label="Badges" value={progress.unlockedAchievementIds.length} color={colors.warning} />
      </View>

      {nextLesson && nextModule ? (
        <Card
          onPress={() => router.push(`/learn/${nextModule.id}/lesson/${nextLesson.id}` as any)}
          style={{ marginBottom: spacing.lg, borderColor: nextModule.color + '55' }}
        >
          <Text style={{ fontSize: 11, fontWeight: '800', color: nextModule.color, letterSpacing: 0.4, marginBottom: 6 }}>
            CONTINUE LEARNING
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginRight: spacing.sm }}>{nextLesson.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text }}>{nextLesson.title}</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted }} numberOfLines={1}>
                {nextModule.title}
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={28} color={nextModule.color} />
          </View>
        </Card>
      ) : (
        <Card style={{ marginBottom: spacing.lg, alignItems: 'center' }}>
          <Text style={{ fontSize: 28, marginBottom: 6 }}>🎉</Text>
          <Text style={{ fontWeight: '800', color: colors.text }}>You've completed every module!</Text>
        </Card>
      )}

      <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>Quick actions</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Button title="Flashcards" variant="outline" onPress={() => router.push('/(tabs)/cards')} style={{ flex: 1 }} size="md" />
        <Button
          title="Daily Quiz"
          onPress={() => router.push('/quiz/daily')}
          style={{ flex: 1 }}
          size="md"
        />
      </View>

      <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>Your modules</Text>
      <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm }}>
        {completedModulesCount} of {MODULES.length} completed
      </Text>
      <View style={{ gap: spacing.sm }}>
        {MODULES.map((m) => {
          const ids = lessonIdsByModule[m.id] ?? [];
          const done = ids.filter((id) => progress.completedLessonIds.includes(id)).length;
          return (
            <Card key={m.id} onPress={() => router.push(`/learn/${m.id}` as any)} padded={false}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: m.color + '1A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.sm,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{m.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', color: colors.text, fontSize: 14 }}>{m.title}</Text>
                  <View style={{ marginTop: 6 }}>
                    <ProgressBar fraction={ids.length ? done / ids.length : 0} height={6} color={m.color} />
                  </View>
                </View>
                <Text style={{ marginLeft: spacing.sm, fontSize: 11, fontWeight: '800', color: colors.textMuted }}>
                  {done}/{ids.length}
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}
