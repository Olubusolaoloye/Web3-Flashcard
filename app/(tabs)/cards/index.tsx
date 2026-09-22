import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppText as Text,
  Card,
  IconTile,
  ProgressBar,
  SearchField,
  SectionHeading,
} from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { slugify } from '../../../src/utils/slug';

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Core Technology': 'hardware-chip',
  DeFi: 'trending-up',
  'NFTs & Culture': 'color-palette',
  Security: 'shield-checkmark',
  Governance: 'people',
  Infrastructure: 'git-network',
  'Trading & Markets': 'stats-chart',
  Compliance: 'document-text',
  Economics: 'cash',
  Cryptography: 'key',
  'Wallets & Identity': 'wallet',
};

export default function CardsHome() {
  const { colors, spacing, radius, typography } = useTheme();
  const { progress } = useProgress();
  const { glossary } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    glossary.forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + 1));
    return Array.from(map.entries());
  }, [glossary]);

  const filteredTerms = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return glossary
      .filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
      .slice(0, 25);
  }, [search, glossary]);

  const masteredCount = progress.masteredTermIds.length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxxl,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ ...typography.display, color: colors.text }}>Flashcards</Text>
      <Text style={{ fontSize: 13.5, color: colors.textMuted, marginTop: 4, marginBottom: spacing.md }}>
        {masteredCount} of {glossary.length} terms mastered
      </Text>
      <ProgressBar
        fraction={glossary.length ? masteredCount / glossary.length : 0}
        style={{ marginBottom: spacing.lg }}
      />

      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Search any term"
        style={{ marginBottom: spacing.lg }}
      />

      {search.trim() ? (
        <View style={{ gap: spacing.xs }}>
          {filteredTerms.map((t) => (
            <Card
              key={t.id}
              onPress={() => router.push(`/cards/${slugify(t.category)}?focus=${t.id}` as never)}
              padded={false}
            >
              <View style={{ padding: spacing.sm, paddingHorizontal: spacing.md }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '700', color: colors.text, fontSize: 14.5, flex: 1 }}>{t.term}</Text>
                  {progress.masteredTermIds.includes(t.id) ? (
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  ) : null}
                </View>
                <Text style={{ fontSize: 12.5, color: colors.textMuted, marginTop: 2, lineHeight: 18 }} numberOfLines={2}>
                  {t.definition}
                </Text>
              </View>
            </Card>
          ))}
          {filteredTerms.length === 0 ? (
            <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl, fontSize: 13.5 }}>
              No matches found.
            </Text>
          ) : null}
        </View>
      ) : (
        <>
          <Pressable
            onPress={() => router.push('/cards/all' as never)}
            style={({ pressed }) => ({
              borderRadius: radius.card,
              overflow: 'hidden',
              marginBottom: spacing.xl,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            })}
          >
            <LinearGradient
              colors={colors.accentGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: spacing.lg, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: radius.sm,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 24 }}>🗂️</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 17, letterSpacing: -0.3 }}>
                  All terms
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.78)', fontSize: 12.5, marginTop: 1 }}>
                  {glossary.length} cards · A to Z
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </Pressable>

          <SectionHeading title="Browse by category" />
          <View style={{ gap: spacing.sm }}>
            {categories.map(([category, count], i) => {
              const mastered = glossary.filter(
                (t) => t.category === category && progress.masteredTermIds.includes(t.id)
              ).length;
              return (
                <Card key={category} onPress={() => router.push(`/cards/${slugify(category)}` as never)} padded={false}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
                    <IconTile icon={CATEGORY_ICONS[category] ?? 'pricetag'} variant={i} size={44} />
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                      <Text style={{ fontWeight: '700', color: colors.text, fontSize: 14.5 }} numberOfLines={1}>
                        {category}
                      </Text>
                      <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>
                        {mastered}/{count} mastered
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
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
