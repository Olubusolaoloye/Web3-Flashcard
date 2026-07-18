import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { AppText as Text } from '../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Chip, ProgressBar, StatPill } from '../../../src/components';
import { ACHIEVEMENTS } from '../../../src/data/achievements';
import { GLOSSARY } from '../../../src/data/glossary';
import { BLOCKCHAINS } from '../../../src/data/blockchains';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { getLevelProgress } from '../../../src/utils/gamification';

export default function Profile() {
  const { colors, spacing, radius } = useTheme();
  const { progress, setDarkModeOverride, resetProgress } = useProgress();
  const insets = useSafeAreaInsets();

  const level = getLevelProgress(progress.xp);
  const perfectQuizzes = progress.quizAttempts.filter((a) => a.score === a.total).length;

  const confirmReset = () => {
    Alert.alert('Reset all progress?', 'This clears your XP, streak, badges, and completed lessons. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetProgress },
    ]);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl + 84 }}
    >
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: spacing.lg }}>Profile</Text>

      <Card style={{ marginBottom: spacing.lg, alignItems: 'center' }}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: colors.primaryMuted,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <Text style={{ fontSize: 30 }}>🧑‍🚀</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text }}>{level.title}</Text>
        <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: spacing.md }}>Level {level.level}</Text>
        <ProgressBar fraction={level.fraction} style={{ width: '100%' }} />
        <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 6 }}>
          {level.xpIntoLevel}/{level.xpForNextLevel} XP to Level {level.level + 1}
        </Text>
      </Card>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <StatPill icon="flame" label="Streak" value={progress.currentStreak} color={colors.warning} />
        <StatPill icon="trophy" label="Best Streak" value={progress.longestStreak} color={colors.secondary} />
        <StatPill icon="checkmark-done" label="Perfect Quiz" value={perfectQuizzes} color={colors.success} />
      </View>

      <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>
        Badges ({progress.unlockedAchievementIds.length}/{ACHIEVEMENTS.length})
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl }}>
        {ACHIEVEMENTS.map((a) => {
          const unlocked = progress.unlockedAchievementIds.includes(a.id);
          return (
            <View
              key={a.id}
              style={{
                width: '31%',
                aspectRatio: 0.95,
                backgroundColor: unlocked ? colors.primaryMuted : colors.surfaceAlt,
                borderRadius: radius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                padding: spacing.xs,
                opacity: unlocked ? 1 : 0.45,
              }}
            >
              <Text style={{ fontSize: 26, marginBottom: 4 }}>{a.icon}</Text>
              <Text style={{ fontSize: 9, fontWeight: '800', color: colors.text, textAlign: 'center' }} numberOfLines={2}>
                {a.title}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>Stats</Text>
      <Card style={{ marginBottom: spacing.xl }}>
        <StatRow label="Lessons completed" value={`${progress.completedLessonIds.length}`} icon="book" colors={colors} />
        <StatRow label="Terms mastered" value={`${progress.masteredTermIds.length}/${GLOSSARY.length}`} icon="albums" colors={colors} />
        <StatRow label="Chains explored" value={`${progress.viewedChainIds.length}/${BLOCKCHAINS.length}`} icon="server" colors={colors} last />
      </Card>

      <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>Appearance</Text>
      <View style={{ flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.xl }}>
        {(['system', 'light', 'dark'] as const).map((mode) => (
          <Chip
            key={mode}
            label={mode}
            active={progress.darkModeOverride === mode}
            onPress={() => setDarkModeOverride(mode)}
          />
        ))}
      </View>

      <Card onPress={confirmReset} style={{ borderColor: colors.danger }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="refresh-circle" size={20} color={colors.danger} />
          <Text style={{ marginLeft: spacing.sm, color: colors.danger, fontWeight: '700' }}>Reset all progress</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

function StatRow({
  label,
  value,
  icon,
  colors,
  last,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: ReturnType<typeof useTheme>['colors'];
  last?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={16} color={colors.textMuted} />
        <Text style={{ marginLeft: 8, color: colors.text, fontWeight: '600', fontSize: 13 }}>{label}</Text>
      </View>
      <Text style={{ color: colors.text, fontWeight: '800', fontSize: 13 }}>{value}</Text>
    </View>
  );
}
