import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Chip, EmptyState, ScreenHeader } from '../../../src/components';
import { BLOCKCHAINS } from '../../../src/data/blockchains';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

export default function ChainDetail() {
  const { chainId } = useLocalSearchParams<{ chainId: string }>();
  const { colors, spacing, radius } = useTheme();
  const { viewChain } = useProgress();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const chain = BLOCKCHAINS.find((c) => c.id === chainId);

  useEffect(() => {
    if (chain) viewChain(chain.id);
  }, [chain, viewChain]);

  const categories = useMemo(() => (chain ? Array.from(new Set(chain.dApps.map((d) => d.category))) : []), [chain]);
  const filteredDApps = useMemo(
    () => (chain ? (activeCategory ? chain.dApps.filter((d) => d.category === activeCategory) : chain.dApps) : []),
    [chain, activeCategory]
  );

  if (!chain) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
        <ScreenHeader title="Chain" showBack />
        <EmptyState icon="❓" title="Chain not found" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingBottom: spacing.xxxl }}
    >
      <ScreenHeader title={chain.name} showBack />

      <View style={{ paddingHorizontal: spacing.lg }}>
        <Card style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: 34, marginRight: spacing.sm }}>{chain.logo}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>{chain.tagline}</Text>
              <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                {chain.chainType} · {chain.consensus} · Since {chain.launched}
              </Text>
            </View>
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 13, lineHeight: 20, marginBottom: spacing.md }}>{chain.overview}</Text>

          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4, marginBottom: 6 }}>
                STRENGTHS
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {chain.strengths.map((s, i) => (
                  <Chip key={i} label={s} />
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4, marginBottom: 6 }}>
                USE CASES
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {chain.useCases.map((u, i) => (
                  <Chip key={i} label={u} color={colors.secondary} active />
                ))}
              </View>
            </View>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>Popular dApps</Text>
          <Text style={{ fontSize: 12, color: colors.textMuted }}>{chain.dApps.length} apps</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            <Chip label="All" active={!activeCategory} onPress={() => setActiveCategory(null)} />
            {categories.map((cat) => (
              <Chip key={cat} label={cat} active={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
            ))}
          </View>
        </ScrollView>

        <View style={{ gap: spacing.sm }}>
          {filteredDApps.map((dapp, idx) => (
            <Card key={idx}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xs }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text }}>{dapp.name}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: colors.primary, letterSpacing: 0.4 }}>
                    {dapp.category.toUpperCase()}
                  </Text>
                </View>
                <Ionicons
                  name="open-outline"
                  size={20}
                  color={colors.primary}
                  onPress={() => Linking.openURL(dapp.link)}
                  suppressHighlighting
                />
              </View>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm }}>
                <Text style={{ fontWeight: '700' }}>Used for: </Text>
                {dapp.use}
              </Text>
              <View style={{ backgroundColor: colors.surfaceAlt, padding: spacing.sm, borderRadius: radius.md }}>
                <Text style={{ fontSize: 12, color: colors.text, lineHeight: 18 }}>{dapp.explanation}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
