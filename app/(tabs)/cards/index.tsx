import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { AppText as Text } from '../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../../src/components';
import { GLOSSARY } from '../../../src/data/glossary';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';
import { slugify } from '../../../src/utils/slug';

const CATEGORY_COLORS: Record<string, string> = {
  'Core Technology': '#6366F1',
  DeFi: '#10B981',
  'NFTs & Culture': '#EC4899',
  Security: '#EF4444',
  Governance: '#A855F7',
  Infrastructure: '#22D3EE',
  'Trading & Markets': '#F59E0B',
  Compliance: '#64748B',
  Economics: '#3B82F6',
  Cryptography: '#8B5CF6',
  'Wallets & Identity': '#F97316',
};

export default function CardsHome() {
  const { colors, spacing, radius } = useTheme();
  const { progress } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    GLOSSARY.forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + 1));
    return Array.from(map.entries());
  }, []);

  const filteredTerms = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return GLOSSARY.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)).slice(0, 20);
  }, [search]);

  const masteredCount = progress.masteredTermIds.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }}
      >
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Flashcards</Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg }}>
          {masteredCount}/{GLOSSARY.length} terms mastered
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search any term..."
            placeholderTextColor={colors.textMuted}
            style={{ flex: 1, paddingVertical: 12, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 14 }}
          />
        </View>

        {search.trim() ? (
          <View style={{ gap: spacing.xs }}>
            {filteredTerms.map((t) => (
              <Card
                key={t.id}
                onPress={() => router.push(`/cards/${slugify(t.category)}?focus=${t.id}`)}
                padded
                style={{ paddingVertical: spacing.sm }}
              >
                <Text style={{ fontWeight: '700', color: colors.text }}>{t.term}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }} numberOfLines={1}>
                  {t.definition}
                </Text>
              </Card>
            ))}
            {filteredTerms.length === 0 ? (
              <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.lg }}>No matches found.</Text>
            ) : null}
          </View>
        ) : (
          <>
            <Card
              onPress={() => router.push('/cards/all')}
              style={{ marginBottom: spacing.md, backgroundColor: colors.primary, borderColor: colors.primary }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, marginRight: spacing.sm }}>🗂️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.onPrimary, fontWeight: '800', fontSize: 16 }}>All Terms</Text>
                  <Text style={{ color: colors.onPrimary, opacity: 0.85, fontSize: 12 }}>{GLOSSARY.length} cards · A to Z</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.onPrimary} />
              </View>
            </Card>

            <Text
              style={{ fontSize: 13, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4, marginBottom: spacing.sm }}
            >
              BROWSE BY CATEGORY
            </Text>
            <View style={{ gap: spacing.sm }}>
              {categories.map(([category, count]) => (
                <Card key={category} onPress={() => router.push(`/cards/${slugify(category)}`)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: CATEGORY_COLORS[category] ?? colors.primary,
                        marginRight: spacing.sm,
                      }}
                    />
                    <Text style={{ flex: 1, fontWeight: '700', color: colors.text }}>{category}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginRight: spacing.xs }}>{count}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                  </View>
                </Card>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
