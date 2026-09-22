import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppText as Text,
  Button,
  Card,
  EmptyState,
  IconTile,
  ProgressBar,
  ScreenHeader,
} from '../../../../../src/components';
import { useContent } from '../../../../../src/state/ContentContext';
import { useProgress } from '../../../../../src/state/ProgressContext';
import { useTheme } from '../../../../../src/theme';

export default function LessonScreen() {
  const { moduleId, lessonId } = useLocalSearchParams<{ moduleId: string; lessonId: string }>();
  const { colors, spacing, radius, typography } = useTheme();
  const { completeLesson, isLessonCompleted } = useProgress();
  const { modules, lessons: allLessons } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<number | null>(null);

  const module = modules.find((m) => m.id === moduleId);
  const lessons = useMemo(
    () => allLessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order),
    [allLessons, moduleId]
  );
  const lesson = lessons.find((l) => l.id === lessonId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = idx >= 0 ? lessons[idx + 1] : undefined;

  if (!module || !lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        <ScreenHeader title="Lesson" showBack />
        <EmptyState icon="❓" title="Lesson not found" />
      </View>
    );
  }

  const completed = isLessonCompleted(lesson.id);

  const handleContinue = () => {
    completeLesson(lesson.id);
    if (nextLesson) {
      router.replace(`/learn/${module.id}/lesson/${nextLesson.id}` as never);
    } else {
      router.replace(`/learn/${module.id}` as never);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.sm,
          paddingBottom: 110,
          paddingHorizontal: spacing.lg,
        }}
      >
        <ScreenHeader title="" subtitle={module.title} showBack />

        <View style={{ marginBottom: spacing.md }}>
          <ProgressBar fraction={(idx + 1) / lessons.length} height={6} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginTop: 7 }}>
            Lesson {idx + 1} of {lessons.length}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
          <IconTile emoji={lesson.icon} variant={idx} size={56} />
          <Text style={{ flex: 1, ...typography.title, color: colors.text, marginLeft: spacing.md }}>
            {lesson.title}
          </Text>
        </View>

        {lesson.content.map((paragraph, i) => (
          <Text key={i} style={{ fontSize: 15, lineHeight: 24, color: colors.text, marginBottom: spacing.md }}>
            {paragraph}
          </Text>
        ))}

        <View
          style={{
            backgroundColor: colors.primaryMuted,
            padding: spacing.md,
            borderRadius: radius.lg,
            marginTop: spacing.xs,
            marginBottom: spacing.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="bulb" size={14} color={colors.primary} />
            <Text style={{ fontSize: 12, fontWeight: '800', color: colors.primary, marginLeft: 5 }}>
              Key takeaway
            </Text>
          </View>
          <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text, lineHeight: 21 }}>
            {lesson.keyTakeaway}
          </Text>
        </View>

        <Card>
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 6 }}>
            Quick check
          </Text>
          <Text style={{ fontSize: 15.5, fontWeight: '700', color: colors.text, marginBottom: spacing.md, lineHeight: 22 }}>
            {lesson.checkQuestion.prompt}
          </Text>
          <View style={{ gap: spacing.xs }}>
            {lesson.checkQuestion.options.map((option, i) => {
              let bg = colors.surfaceAlt;
              let borderColor = 'transparent';
              let textColor = colors.text;
              if (selected !== null) {
                if (i === lesson.checkQuestion.correctIndex) {
                  bg = colors.successMuted;
                  borderColor = colors.success;
                  textColor = colors.success;
                } else if (i === selected) {
                  bg = colors.dangerMuted;
                  borderColor = colors.danger;
                  textColor = colors.danger;
                } else {
                  textColor = colors.textMuted;
                }
              }
              return (
                <Pressable
                  key={i}
                  disabled={selected !== null}
                  onPress={() => setSelected(i)}
                  style={{
                    padding: spacing.sm,
                    paddingHorizontal: spacing.md,
                    borderRadius: radius.md,
                    backgroundColor: bg,
                    borderWidth: 1.5,
                    borderColor,
                  }}
                >
                  <Text style={{ fontSize: 13.5, fontWeight: '600', color: textColor, lineHeight: 20 }}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </Card>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.md,
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Button
          title={
            completed
              ? nextLesson
                ? 'Next lesson'
                : 'Back to module'
              : nextLesson
                ? 'Complete & continue'
                : 'Complete module'
          }
          onPress={handleContinue}
          iconRight={<Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />}
          fullWidth
        />
      </View>
    </View>
  );
}
