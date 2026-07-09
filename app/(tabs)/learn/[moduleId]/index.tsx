import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, EmptyState, ProgressBar, ScreenHeader } from '../../../../src/components';
import { LESSONS } from '../../../../src/data/lessons';
import { MODULES } from '../../../../src/data/modules';
import { useProgress } from '../../../../src/state/ProgressContext';
import { useTheme } from '../../../../src/theme';

export default function ModuleDetail() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { colors, spacing } = useTheme();
  const { progress } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const module = MODULES.find((m) => m.id === moduleId);
  const lessons = LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);

  if (!module) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        <ScreenHeader title="Module" showBack />
        <EmptyState icon="❓" title="Module not found" />
      </View>
    );
  }

  const done = lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingBottom: spacing.xxxl }}
    >
      <ScreenHeader title={module.title} subtitle={`${done}/${lessons.length} lessons`} showBack />

      <View style={{ paddingHorizontal: spacing.lg }}>
        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.sm }}>
            {module.description}
          </Text>
          <ProgressBar fraction={lessons.length ? done / lessons.length : 0} color={module.color} />
        </Card>

        <Text style={{ fontSize: 13, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4, marginBottom: spacing.sm }}>
          LESSONS
        </Text>

        <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
          {lessons.map((lesson) => {
            const isDone = progress.completedLessonIds.includes(lesson.id);
            return (
              <Pressable
                key={lesson.id}
                onPress={() => router.push(`/learn/${module.id}/lesson/${lesson.id}`)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.md,
                  borderRadius: 16,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ fontSize: 22, marginRight: spacing.sm }}>{lesson.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', color: colors.text, fontSize: 14 }}>{lesson.title}</Text>
                  <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>
                    {lesson.summary}
                  </Text>
                </View>
                <Ionicons
                  name={isDone ? 'checkmark-circle' : 'chevron-forward'}
                  size={20}
                  color={isDone ? colors.success : colors.textMuted}
                />
              </Pressable>
            );
          })}
        </View>

        <Button
          title="Take Module Quiz"
          icon={<Ionicons name="flash" size={16} color={colors.textInverse} />}
          onPress={() => router.push(`/quiz/quiz-${module.id}`)}
          fullWidth
        />
      </View>
    </ScrollView>
  );
}
