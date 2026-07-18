import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppText as Text } from '../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ProgressBar } from '../../../src/components';
import { MODULES } from '../../../src/data/modules';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

export default function LearnHome() {
  const { colors, spacing } = useTheme();
  const { progress, lessonIdsByModule, completedModulesCount } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl + 84 }}
    >
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Learn</Text>
      <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg }}>
        {completedModulesCount}/{MODULES.length} modules completed
      </Text>

      <View style={{ gap: spacing.md }}>
        {MODULES.map((m) => {
          const ids = lessonIdsByModule[m.id] ?? [];
          const done = ids.filter((id) => progress.completedLessonIds.includes(id)).length;
          const isComplete = ids.length > 0 && done === ids.length;
          return (
            <Card key={m.id} onPress={() => router.push(`/learn/${m.id}`)}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: m.color + '1A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{m.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', fontSize: 16, color: colors.text }}>{m.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm }} numberOfLines={2}>
                    {m.description}
                  </Text>
                  <ProgressBar fraction={ids.length ? done / ids.length : 0} height={6} color={m.color} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textMuted }}>
                      {done}/{ids.length} lessons · ~{m.estimatedMinutes} min
                    </Text>
                    {isComplete ? (
                      <Text style={{ fontSize: 11, fontWeight: '800', color: colors.success }}>COMPLETE</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}
