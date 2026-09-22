import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText as Text, Card, IconTile, ProgressBar } from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

export default function LearnHome() {
  const { colors, spacing, typography } = useTheme();
  const { progress, lessonIdsByModule, completedModulesCount } = useProgress();
  const { modules } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const totalLessons = modules.reduce((sum, m) => sum + (lessonIdsByModule[m.id]?.length ?? 0), 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxxl,
      }}
    >
      <Text style={{ ...typography.display, color: colors.text }}>Learn</Text>
      <Text style={{ fontSize: 13.5, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg }}>
        {completedModulesCount} of {modules.length} modules done · {progress.completedLessonIds.length}/{totalLessons}{' '}
        lessons
      </Text>

      <View style={{ gap: spacing.md }}>
        {modules.map((m, i) => {
          const ids = lessonIdsByModule[m.id] ?? [];
          const done = ids.filter((id) => progress.completedLessonIds.includes(id)).length;
          const isComplete = ids.length > 0 && done === ids.length;
          return (
            <Card key={m.id} onPress={() => router.push(`/learn/${m.id}` as never)} level="sm">
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <IconTile emoji={m.icon} variant={i} size={54} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{ ...typography.subheading, color: colors.text, flex: 1, fontSize: 16 }}
                      numberOfLines={1}
                    >
                      {m.title}
                    </Text>
                    {isComplete ? (
                      <Ionicons name="checkmark-circle" size={19} color={colors.success} style={{ marginLeft: 6 }} />
                    ) : null}
                  </View>
                  <Text
                    style={{ fontSize: 12.5, color: colors.textMuted, marginTop: 3, marginBottom: spacing.sm, lineHeight: 18 }}
                    numberOfLines={2}
                  >
                    {m.description}
                  </Text>
                  <ProgressBar fraction={ids.length ? done / ids.length : 0} height={6} />
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginTop: 7 }}>
                    {done}/{ids.length} lessons · ~{m.estimatedMinutes} min
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}
