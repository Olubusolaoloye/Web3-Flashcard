import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppText as Text,
  Card,
  LogoSlot,
  ProgressBar,
  SectionHeading,
  SegmentedTabs,
  StatPill,
} from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { getLevelProgress } from '../../../src/utils/gamification';

export default function Profile() {
  const { colors, spacing, radius, typography } = useTheme();
  const { progress, setDarkModeOverride, resetProgress } = useProgress();
  const { achievements, glossary, blockchains, isRefreshing, refresh } = useContent();
  const insets = useSafeAreaInsets();

  const level = getLevelProgress(progress.xp);
  const perfectQuizzes = progress.quizAttempts.filter((a) => a.score === a.total).length;

  const confirmReset = () => {
    Alert.alert(
      'Reset all progress?',
      'This clears your XP, streak, badges, and completed lessons. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetProgress },
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxxl,
      }}
    >
      <Text style={{ ...typography.display, color: colors.text, marginBottom: spacing.lg }}>Profile</Text>

      <LinearGradient
        colors={colors.accentGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: radius.card, padding: spacing.lg, marginBottom: spacing.md, alignItems: 'center' }}
      >
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: 38,
            backgroundColor: 'rgba(255,255,255,0.18)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <Text style={{ fontSize: 34 }}>🧑‍🚀</Text>
        </View>
        <Text style={{ fontSize: 19, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 }}>{level.title}</Text>
        <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', marginBottom: spacing.md }}>
          Level {level.level} · {progress.xp} XP total
        </Text>
        <ProgressBar
          fraction={level.fraction}
          color="#FFFFFF"
          trackColor="rgba(255,255,255,0.22)"
          style={{ width: '100%' }}
        />
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 8 }}>
          {level.xpIntoLevel}/{level.xpForNextLevel} XP to level {level.level + 1}
        </Text>
      </LinearGradient>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
        <StatPill icon="flame" label="Streak" value={progress.currentStreak} variant={3} />
        <StatPill icon="trophy" label="Best" value={progress.longestStreak} variant={1} />
        <StatPill icon="checkmark-done" label="Perfect" value={perfectQuizzes} variant={2} />
      </View>

      <SectionHeading title={`Badges · ${progress.unlockedAchievementIds.length}/${achievements.length}`} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl }}>
        {achievements.map((a) => {
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
              <Text style={{ fontSize: 26, marginBottom: 5 }}>{a.icon}</Text>
              <Text
                style={{ fontSize: 10, fontWeight: '700', color: colors.text, textAlign: 'center', lineHeight: 13 }}
                numberOfLines={2}
              >
                {a.title}
              </Text>
            </View>
          );
        })}
      </View>

      <SectionHeading title="Stats" />
      <Card style={{ marginBottom: spacing.xl }}>
        <StatRow label="Lessons completed" value={`${progress.completedLessonIds.length}`} icon="book" colors={colors} />
        <StatRow
          label="Terms mastered"
          value={`${progress.masteredTermIds.length}/${glossary.length}`}
          icon="albums"
          colors={colors}
        />
        <StatRow
          label="Chains explored"
          value={`${progress.viewedChainIds.length}/${blockchains.length}`}
          icon="cube"
          colors={colors}
        />
        <StatRow label="Quizzes taken" value={`${progress.quizAttempts.length}`} icon="flash" colors={colors} last />
      </Card>

      <SectionHeading title="Appearance" />
      <SegmentedTabs
        options={[
          { value: 'system', label: 'System' },
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
        value={progress.darkModeOverride ?? 'system'}
        onChange={(mode) => setDarkModeOverride(mode)}
        style={{ marginBottom: spacing.xl }}
      />

      <SectionHeading title="Content" />
      <Card onPress={isRefreshing ? undefined : refresh} style={{ marginBottom: spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={isRefreshing ? 'sync' : 'cloud-download-outline'} size={19} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>
              {isRefreshing ? 'Checking for updates…' : 'Check for new content'}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 1 }}>
              Lessons and chains are cached for offline use.
            </Text>
          </View>
        </View>
      </Card>

      <Pressable
        onPress={confirmReset}
        style={({ pressed }) => ({
          backgroundColor: colors.dangerMuted,
          borderRadius: radius.card,
          padding: spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Ionicons name="refresh-circle" size={20} color={colors.danger} />
        <Text style={{ marginLeft: spacing.sm, color: colors.danger, fontWeight: '700', fontSize: 14 }}>
          Reset all progress
        </Text>
      </Pressable>

      <View style={{ alignItems: 'center', marginTop: spacing.xxl }}>
        <LogoSlot variant="full" height={30} />
        <Text style={{ fontSize: 11.5, color: colors.textMuted, marginTop: spacing.sm }}>
          Learn Web3, one card at a time.
        </Text>
      </View>
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
        paddingVertical: 11,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={16} color={colors.textMuted} />
        <Text style={{ marginLeft: 9, color: colors.text, fontWeight: '600', fontSize: 13.5 }}>{label}</Text>
      </View>
      <Text style={{ color: colors.text, fontWeight: '800', fontSize: 13.5 }}>{value}</Text>
    </View>
  );
}
