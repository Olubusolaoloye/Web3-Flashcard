import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AlphaCarousel,
  AppText as Text,
  Card,
  IconTile,
  LogoSlot,
  ProgressBar,
  SearchField,
  SectionHeading,
  StatPill,
} from '../../src/components';
import { IconButton } from '../../src/components/ScreenHeader';
import { useAlphaSpotlights } from '../../src/hooks/useAlphaSpotlights';
import { useContent } from '../../src/state/ContentContext';
import { useProgress } from '../../src/state/ProgressContext';
import { useTheme } from '../../src/theme';
import { getLevelProgress } from '../../src/utils/gamification';
import { slugify } from '../../src/utils/slug';

type SearchHit = { key: string; label: string; sub: string; icon: keyof typeof Ionicons.glyphMap; href: string };

const SHORTCUTS: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}[] = [
  { label: 'Modules', icon: 'school', href: '/(tabs)/learn' },
  { label: 'Flashcards', icon: 'albums', href: '/(tabs)/cards' },
  { label: 'Chains', icon: 'cube', href: '/(tabs)/library' },
  { label: 'Daily quiz', icon: 'flash', href: '/quiz/daily' },
  { label: 'Glossary', icon: 'book', href: '/cards/all' },
  { label: 'Badges', icon: 'ribbon', href: '/(tabs)/profile' },
];

export default function Home() {
  const { colors, spacing, radius, typography, lift } = useTheme();
  const { progress, isLoaded, completedModulesCount, lessonIdsByModule, newlyUnlocked } = useProgress();
  const { modules, lessons, glossary, blockchains } = useContent();
  const alphas = useAlphaSpotlights();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const level = getLevelProgress(progress.xp);

  const nextModule = useMemo(
    () =>
      modules.find((m) => {
        const ids = lessonIdsByModule[m.id] ?? [];
        return ids.some((id) => !progress.completedLessonIds.includes(id));
      }),
    [modules, lessonIdsByModule, progress.completedLessonIds]
  );

  const nextLesson = useMemo(() => {
    if (!nextModule) return null;
    return lessons
      .filter((l) => l.moduleId === nextModule.id)
      .sort((a, b) => a.order - b.order)
      .find((l) => !progress.completedLessonIds.includes(l.id));
  }, [nextModule, lessons, progress.completedLessonIds]);

  const masteryPct = glossary.length
    ? Math.round((progress.masteredTermIds.length / glossary.length) * 100)
    : 0;

  // One search box across every kind of content in the app.
  const hits = useMemo<SearchHit[]>(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const out: SearchHit[] = [];

    modules
      .filter((m) => m.title.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((m) => out.push({ key: `m-${m.id}`, label: m.title, sub: 'Module', icon: 'school', href: `/learn/${m.id}` }));

    lessons
      .filter((l) => l.title.toLowerCase().includes(q))
      .slice(0, 4)
      .forEach((l) =>
        out.push({
          key: `l-${l.id}`,
          label: l.title,
          sub: 'Lesson',
          icon: 'document-text',
          href: `/learn/${l.moduleId}/lesson/${l.id}`,
        })
      );

    glossary
      .filter((t) => t.term.toLowerCase().includes(q))
      .slice(0, 6)
      .forEach((t) =>
        out.push({
          key: `t-${t.id}`,
          label: t.term,
          sub: t.category,
          icon: 'albums',
          href: `/cards/${slugify(t.category)}?focus=${t.id}`,
        })
      );

    blockchains
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 5)
      .forEach((c) => out.push({ key: `c-${c.id}`, label: c.name, sub: c.chainType, icon: 'cube', href: `/library/${c.id}` }));

    return out;
  }, [search, modules, lessons, glossary, blockchains]);

  if (isLoaded && !progress.hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxxl,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
        <LogoSlot variant="mark" height={44} />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={{ fontSize: 12.5, fontWeight: '600', color: colors.textMuted }}>Welcome back</Text>
          <Text style={{ ...typography.heading, color: colors.text }}>Web3 Academy</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            paddingHorizontal: 12,
            height: 42,
            borderRadius: radius.md,
            marginRight: spacing.xs,
            ...lift('sm'),
          }}
        >
          <Ionicons name="flame" size={16} color={colors.warning} />
          <Text style={{ marginLeft: 5, fontWeight: '800', color: colors.text, fontSize: 14 }}>
            {progress.currentStreak}
          </Text>
        </View>
        <IconButton
          icon="notifications-outline"
          onPress={() => router.push('/(tabs)/profile')}
          badge={newlyUnlocked.length > 0 || alphas.length > 0}
          accessibilityLabel="Notifications"
        />
      </View>

      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Search lessons, terms, chains"
        style={{ marginBottom: spacing.lg }}
      />

      {search.trim() ? (
        <View style={{ gap: spacing.xs }}>
          {hits.map((hit) => (
            <Card
              key={hit.key}
              onPress={() => {
                setSearch('');
                router.push(hit.href as never);
              }}
              padded={false}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.sm }}>
                <IconTile icon={hit.icon} size={38} variant={hit.key.charCodeAt(0)} />
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }} numberOfLines={1}>
                    {hit.label}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted }} numberOfLines={1}>
                    {hit.sub}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </Card>
          ))}
          {hits.length === 0 ? (
            <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl, fontSize: 13.5 }}>
              Nothing matches “{search.trim()}”.
            </Text>
          ) : null}
        </View>
      ) : (
        <>
          {alphas.length > 0 ? (
            <View style={{ marginBottom: spacing.xl }}>
              <SectionHeading title="Alpha Spotlight" />
              <AlphaCarousel alphas={alphas} />
            </View>
          ) : null}

          {nextLesson && nextModule ? (
            <Pressable
              onPress={() => router.push(`/learn/${nextModule.id}/lesson/${nextLesson.id}` as never)}
              style={({ pressed }) => ({
                borderRadius: radius.card,
                overflow: 'hidden',
                marginBottom: spacing.lg,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              })}
            >
              <LinearGradient
                colors={colors.accentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: spacing.lg }}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.75)' }}>
                  Continue learning
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: radius.sm,
                      backgroundColor: 'rgba(255,255,255,0.16)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>{nextLesson.icon}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={{ fontSize: 16.5, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 }} numberOfLines={2}>
                      {nextLesson.title}
                    </Text>
                    <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', marginTop: 1 }} numberOfLines={1}>
                      {nextModule.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="play" size={16} color={colors.primary} />
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          ) : (
            <Card style={{ marginBottom: spacing.lg, alignItems: 'center' }}>
              <Text style={{ fontSize: 30, marginBottom: 6 }}>🎉</Text>
              <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>
                You&apos;ve completed every module
              </Text>
            </Card>
          )}

          <Card style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text style={{ fontWeight: '800', color: colors.text, fontSize: 14.5, letterSpacing: -0.2 }}>
                Level {level.level} · {level.title}
              </Text>
              <Text style={{ color: colors.textMuted, fontWeight: '600', fontSize: 12.5 }}>
                {level.xpIntoLevel}/{level.xpForNextLevel} XP
              </Text>
            </View>
            <ProgressBar fraction={level.fraction} />
          </Card>

          <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
            <StatPill icon="book" label="Lessons" value={progress.completedLessonIds.length} variant={0} />
            <StatPill icon="albums" label="Mastered" value={`${masteryPct}%`} variant={1} />
            <StatPill icon="ribbon" label="Badges" value={progress.unlockedAchievementIds.length} variant={3} />
          </View>

          <SectionHeading title="Browse" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.xl }}>
            {SHORTCUTS.map((shortcut, i) => (
              <Pressable
                key={shortcut.label}
                onPress={() => router.push(shortcut.href as never)}
                style={({ pressed }) => ({
                  width: '33.33%',
                  alignItems: 'center',
                  paddingVertical: spacing.sm,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <IconTile icon={shortcut.icon} variant={i} size={54} />
                <Text
                  style={{ fontSize: 12, fontWeight: '600', color: colors.text, marginTop: 7, textAlign: 'center' }}
                  numberOfLines={1}
                >
                  {shortcut.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <SectionHeading
            title="Your modules"
            actionLabel="See all"
            onAction={() => router.push('/(tabs)/learn')}
          />
          <Text style={{ fontSize: 12.5, color: colors.textMuted, marginBottom: spacing.sm }}>
            {completedModulesCount} of {modules.length} completed
          </Text>
          <View style={{ gap: spacing.sm }}>
            {modules.map((m, i) => {
              const ids = lessonIdsByModule[m.id] ?? [];
              const done = ids.filter((id) => progress.completedLessonIds.includes(id)).length;
              return (
                <Card key={m.id} onPress={() => router.push(`/learn/${m.id}` as never)} padded={false}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
                    <IconTile emoji={m.icon} variant={i} size={46} />
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                      <Text style={{ fontWeight: '700', color: colors.text, fontSize: 14.5 }} numberOfLines={1}>
                        {m.title}
                      </Text>
                      <View style={{ marginTop: 7 }}>
                        <ProgressBar fraction={ids.length ? done / ids.length : 0} height={6} />
                      </View>
                    </View>
                    <Text style={{ marginLeft: spacing.sm, fontSize: 12, fontWeight: '700', color: colors.textMuted }}>
                      {done}/{ids.length}
                    </Text>
                  </View>
                </Card>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
}
