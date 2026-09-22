import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
  SegmentedTabs,
} from '../../../../src/components';
import { useContent } from '../../../../src/state/ContentContext';
import { useProgress } from '../../../../src/state/ProgressContext';
import { useTheme } from '../../../../src/theme';

type Tab = 'about' | 'lessons';

export default function ModuleDetail() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { colors, spacing, radius, typography, lift } = useTheme();
  const { progress } = useProgress();
  const { modules, lessons: allLessons } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('lessons');

  const module = modules.find((m) => m.id === moduleId);
  const lessons = useMemo(
    () => allLessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order),
    [allLessons, moduleId]
  );

  if (!module) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        <ScreenHeader title="Module" showBack />
        <EmptyState icon="❓" title="Module not found" />
      </View>
    );
  }

  const done = lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id));
  const moduleIndex = modules.findIndex((m) => m.id === module.id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.sm,
          paddingBottom: 116,
        }}
      >
        <ScreenHeader title="" showBack />

        <View style={{ paddingHorizontal: spacing.lg }}>
          <LinearGradient
            colors={colors.accentGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: radius.card, padding: spacing.lg, marginBottom: spacing.md }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: radius.tile,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 27 }}>{module.icon}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.72)' }}>
                  Module {module.order}
                </Text>
                <Text style={{ ...typography.title, color: '#FFFFFF', fontSize: 21 }} numberOfLines={2}>
                  {module.title}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: spacing.md }}>
              <ProgressBar
                fraction={lessons.length ? done / lessons.length : 0}
                color="#FFFFFF"
                trackColor="rgba(255,255,255,0.22)"
              />
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 7, fontWeight: '600' }}>
                {done} of {lessons.length} lessons complete
              </Text>
            </View>
          </LinearGradient>

          <View style={{ flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.lg }}>
            {[
              { icon: 'list' as const, label: `${lessons.length} lessons` },
              { icon: 'time-outline' as const, label: `~${module.estimatedMinutes} min` },
              { icon: 'trending-up' as const, label: `${Math.round((done / Math.max(1, lessons.length)) * 100)}% done` },
            ].map((meta) => (
              <View
                key={meta.label}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.surface,
                  borderRadius: radius.full,
                  paddingVertical: 10,
                  ...lift('sm'),
                }}
              >
                <Ionicons name={meta.icon} size={13} color={colors.primary} />
                <Text
                  style={{ fontSize: 11.5, fontWeight: '700', color: colors.text, marginLeft: 4 }}
                  numberOfLines={1}
                >
                  {meta.label}
                </Text>
              </View>
            ))}
          </View>

          <SegmentedTabs
            options={[
              { value: 'lessons', label: 'Lessons' },
              { value: 'about', label: 'About' },
            ]}
            value={tab}
            onChange={setTab}
            style={{ marginBottom: spacing.lg }}
          />

          {tab === 'about' ? (
            <Card>
              <Text style={{ ...typography.body, color: colors.text, fontSize: 14.5, lineHeight: 22 }}>
                {module.description}
              </Text>
              <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.md }} />
              <Text style={{ fontSize: 13, color: colors.textMuted, lineHeight: 20 }}>
                Work through the lessons in order, then take the module quiz to lock the concepts in and earn XP
                toward your next level.
              </Text>
            </Card>
          ) : (
            <View style={{ gap: spacing.sm }}>
              {lessons.map((lesson, i) => {
                const isDone = progress.completedLessonIds.includes(lesson.id);
                const isNext = nextLesson?.id === lesson.id;
                return (
                  <Pressable
                    key={lesson.id}
                    onPress={() => router.push(`/learn/${module.id}/lesson/${lesson.id}` as never)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: spacing.sm,
                      borderRadius: radius.lg,
                      backgroundColor: colors.surface,
                      opacity: pressed ? 0.92 : 1,
                      borderWidth: isNext ? 1.5 : 0,
                      borderColor: isNext ? colors.primary : 'transparent',
                      ...(isNext ? {} : lift('sm')),
                    })}
                  >
                    <IconTile emoji={lesson.icon} variant={moduleIndex + i} size={44} />
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                      <Text style={{ fontWeight: '700', color: colors.text, fontSize: 14 }} numberOfLines={1}>
                        {lesson.title}
                      </Text>
                      <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>
                        {lesson.summary}
                      </Text>
                    </View>
                    <Ionicons
                      name={isDone ? 'checkmark-circle' : 'chevron-forward'}
                      size={20}
                      color={isDone ? colors.success : colors.textMuted}
                      style={{ marginRight: 4 }}
                    />
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Docked pill CTA */}
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
          flexDirection: 'row',
          gap: spacing.sm,
        }}
      >
        <Button
          title={nextLesson ? (done > 0 ? 'Continue' : 'Start module') : 'Review lessons'}
          onPress={() =>
            router.push(
              `/learn/${module.id}/lesson/${(nextLesson ?? lessons[0])?.id}` as never
            )
          }
          style={{ flex: 1 }}
          disabled={lessons.length === 0}
        />
        <Button
          title="Quiz"
          variant="soft"
          icon={<Ionicons name="flash" size={15} color={colors.primary} />}
          onPress={() => router.push(`/quiz/quiz-${module.id}` as never)}
        />
      </View>
    </View>
  );
}
