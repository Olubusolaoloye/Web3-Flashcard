import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AppText as Text } from '../../../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, EmptyState, ScreenHeader } from '../../../../../src/components';
import { LESSONS } from '../../../../../src/data/lessons';
import { MODULES } from '../../../../../src/data/modules';
import { useProgress } from '../../../../../src/state/ProgressContext';
import { useTheme } from '../../../../../src/theme';

export default function LessonScreen() {
  const { moduleId, lessonId } = useLocalSearchParams<{ moduleId: string; lessonId: string }>();
  const { colors, spacing, radius } = useTheme();
  const { completeLesson, isLessonCompleted } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<number | null>(null);

  const module = MODULES.find((m) => m.id === moduleId);
  const lessons = LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
  const lesson = lessons.find((l) => l.id === lessonId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = idx >= 0 ? lessons[idx + 1] : undefined;

  if (!module || !lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop: insets.top }}>
        <ScreenHeader title="Lesson" showBack />
        <EmptyState icon="❓" title="Lesson not found" />
      </View>
    );
  }

  const completed = isLessonCompleted(lesson.id);

  const handleContinue = () => {
    completeLesson(lesson.id);
    if (nextLesson) {
      router.replace(`/learn/${module.id}/lesson/${nextLesson.id}`);
    } else {
      router.replace(`/learn/${module.id}`);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingBottom: spacing.xxxl + 84, paddingHorizontal: spacing.lg }}
    >
      <ScreenHeader title={module.title} subtitle={`Lesson ${idx + 1} of ${lessons.length}`} showBack />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            backgroundColor: module.color + '1A',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <Text style={{ fontSize: 26 }}>{lesson.icon}</Text>
        </View>
        <Text style={{ flex: 1, fontSize: 21, fontWeight: '800', color: colors.text }}>{lesson.title}</Text>
      </View>

      {lesson.content.map((paragraph, i) => (
        <Text key={i} style={{ fontSize: 15, lineHeight: 23, color: colors.text, marginBottom: spacing.md }}>
          {paragraph}
        </Text>
      ))}

      <View
        style={{
          borderLeftWidth: 4,
          borderLeftColor: module.color,
          backgroundColor: colors.surfaceAlt,
          padding: spacing.md,
          borderRadius: 12,
          marginBottom: spacing.xl,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: '800', color: module.color, letterSpacing: 0.6, marginBottom: 4 }}>
          KEY TAKEAWAY
        </Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text, fontStyle: 'italic' }}>
          "{lesson.keyTakeaway}"
        </Text>
      </View>

      <Card style={{ marginBottom: spacing.xl }}>
        <Text style={{ fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4, marginBottom: spacing.sm }}>
          QUICK CHECK
        </Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md }}>
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
                style={{ padding: spacing.sm, borderRadius: radius.md, backgroundColor: bg, borderWidth: 2, borderColor }}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: textColor }}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Button
        title={completed ? (nextLesson ? 'Next Lesson' : 'Back to Module') : nextLesson ? 'Complete & Continue' : 'Complete Module'}
        onPress={handleContinue}
        icon={<Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />}
        fullWidth
      />
    </ScrollView>
  );
}
