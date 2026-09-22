import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppText as Text,
  Card,
  Chip,
  EmptyState,
  ScreenHeader,
  SectionHeading,
  SegmentedTabs,
} from '../../../src/components';
import { useContent } from '../../../src/state/ContentContext';
import { useProgress } from '../../../src/state/ProgressContext';
import { useTheme } from '../../../src/theme';

type Tab = 'overview' | 'dapps';

export default function ChainDetail() {
  const { chainId } = useLocalSearchParams<{ chainId: string }>();
  const { colors, spacing, radius, typography } = useTheme();
  const { viewChain } = useProgress();
  const { blockchains } = useContent();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('overview');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const chain = blockchains.find((c) => c.id === chainId);

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
      <ScreenHeader title="" showBack />

      <View style={{ paddingHorizontal: spacing.lg }}>
        <LinearGradient
          colors={colors.accentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: radius.card, padding: spacing.lg, marginBottom: spacing.md }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: radius.tile,
                backgroundColor: 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 28 }}>{chain.logo}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={{ ...typography.title, color: '#FFFFFF', fontSize: 22 }} numberOfLines={1}>
                {chain.name}
              </Text>
              <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', marginTop: 1 }}>
                {chain.chainType} · {chain.nativeToken} · since {chain.launched}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.92)', marginTop: spacing.md, lineHeight: 20 }}>
            {chain.tagline}
          </Text>
        </LinearGradient>

        <SegmentedTabs
          options={[
            { value: 'overview', label: 'Overview' },
            { value: 'dapps', label: `dApps (${chain.dApps.length})` },
          ]}
          value={tab}
          onChange={setTab}
          style={{ marginBottom: spacing.lg }}
        />

        {tab === 'overview' ? (
          <>
            <Card style={{ marginBottom: spacing.md }}>
              <Text style={{ fontSize: 14, color: colors.text, lineHeight: 22 }}>{chain.overview}</Text>
            </Card>

            <Card style={{ marginBottom: spacing.md }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 4 }}>
                Consensus
              </Text>
              <Text style={{ fontSize: 13.5, color: colors.text, lineHeight: 20 }}>{chain.consensus}</Text>
            </Card>

            <SectionHeading title="Strengths" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: spacing.lg }}>
              {chain.strengths.map((s, i) => (
                <Chip key={i} label={s} tone="tint" />
              ))}
            </View>

            <SectionHeading title="Use cases" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {chain.useCases.map((u, i) => (
                <Chip key={i} label={u} tone="tint" color={colors.secondary} />
              ))}
            </View>
          </>
        ) : (
          <>
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
                <Card key={`${dapp.name}-${idx}`}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15.5, fontWeight: '800', color: colors.text, letterSpacing: -0.3 }}>
                        {dapp.name}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary, marginTop: 1 }}>
                        {dapp.category}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => Linking.openURL(dapp.link).catch(() => {})}
                      accessibilityRole="link"
                      accessibilityLabel={`Open ${dapp.name}`}
                      hitSlop={8}
                      style={({ pressed }) => ({
                        width: 34,
                        height: 34,
                        borderRadius: radius.sm,
                        backgroundColor: colors.primaryMuted,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: pressed ? 0.7 : 1,
                      })}
                    >
                      <Ionicons name="open-outline" size={16} color={colors.primary} />
                    </Pressable>
                  </View>
                  <Text style={{ fontSize: 12.5, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 18 }}>
                    <Text style={{ fontWeight: '700', color: colors.text }}>Used for: </Text>
                    {dapp.use}
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.surfaceAlt,
                      padding: spacing.sm,
                      paddingHorizontal: spacing.md,
                      borderRadius: radius.md,
                      marginTop: spacing.sm,
                    }}
                  >
                    <Text style={{ fontSize: 12.5, color: colors.text, lineHeight: 19 }}>{dapp.explanation}</Text>
                  </View>
                </Card>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
