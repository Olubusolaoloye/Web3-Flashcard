import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { AppText as Text } from '../../../src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Chip } from '../../../src/components';
import { BLOCKCHAINS } from '../../../src/data/blockchains';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

export default function LibraryHome() {
  const { colors, spacing, radius } = useTheme();
  const { progress } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Layer 1' | 'Layer 2' | 'Sidechain'>('All');

  const filtered = useMemo(() => {
    return BLOCKCHAINS.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) || c.tagline.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || c.chainType === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }}
      >
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text }}>Chain Library</Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg }}>
          {progress.viewedChainIds.length}/{BLOCKCHAINS.length} chains explored
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
            marginBottom: spacing.md,
          }}
        >
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search blockchains..."
            placeholderTextColor={colors.textMuted}
            style={{ flex: 1, paddingVertical: 12, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 14 }}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.lg }}>
          {(['All', 'Layer 1', 'Layer 2', 'Sidechain'] as const).map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </View>

        <View style={{ gap: spacing.md }}>
          {filtered.map((chain) => (
            <Card key={chain.id} onPress={() => router.push(`/library/${chain.id}`)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                <Text style={{ fontSize: 28, marginRight: spacing.sm }}>{chain.logo}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>{chain.name}</Text>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textMuted }}>
                    {chain.chainType} · {chain.nativeToken}
                  </Text>
                </View>
                {progress.viewedChainIds.includes(chain.id) ? (
                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                ) : null}
              </View>
              <Text style={{ fontSize: 13, color: colors.textMuted, lineHeight: 18 }}>{chain.tagline}</Text>
            </Card>
          ))}
          {filtered.length === 0 ? (
            <Text style={{ textAlign: 'center', color: colors.textMuted, marginTop: spacing.xl }}>No chains match your search.</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
