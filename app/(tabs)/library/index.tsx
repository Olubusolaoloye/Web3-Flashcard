import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText as Text, Card, Chip, IconTile, ProgressBar, SearchField } from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

const FILTERS = ['All', 'Layer 1', 'Layer 2', 'Sidechain'] as const;

export default function LibraryHome() {
  const { colors, spacing, typography } = useTheme();
  const { progress } = useProgress();
  const { blockchains } = useContent();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blockchains.filter((c) => {
      const matchesSearch =
        !q || c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
      const matchesFilter = filter === 'All' || c.chainType === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, blockchains]);

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
      <Text style={{ ...typography.display, color: colors.text }}>Chains</Text>
      <Text style={{ fontSize: 13.5, color: colors.textMuted, marginTop: 4, marginBottom: spacing.md }}>
        {progress.viewedChainIds.length} of {blockchains.length} explored
      </Text>
      <ProgressBar
        fraction={blockchains.length ? progress.viewedChainIds.length / blockchains.length : 0}
        style={{ marginBottom: spacing.lg }}
      />

      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Search blockchains"
        style={{ marginBottom: spacing.md }}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
        <View style={{ flexDirection: 'row', gap: spacing.xs }}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </View>
      </ScrollView>

      <View style={{ gap: spacing.sm }}>
        {filtered.map((chain, i) => (
          <Card key={chain.id} onPress={() => router.push(`/library/${chain.id}` as never)} padded={false}>
            <View style={{ padding: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconTile emoji={chain.logo} variant={i} size={46} />
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text, letterSpacing: -0.3 }} numberOfLines={1}>
                    {chain.name}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginTop: 1 }}>
                    {chain.chainType} · {chain.nativeToken}
                  </Text>
                </View>
                {progress.viewedChainIds.includes(chain.id) ? (
                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                ) : (
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                )}
              </View>
              <Text style={{ fontSize: 13, color: colors.textMuted, lineHeight: 19, marginTop: spacing.sm }}>
                {chain.tagline}
              </Text>
            </View>
          </Card>
        ))}
        {filtered.length === 0 ? (
          <Text style={{ textAlign: 'center', color: colors.textMuted, marginTop: spacing.xl, fontSize: 13.5 }}>
            No chains match your search.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}
