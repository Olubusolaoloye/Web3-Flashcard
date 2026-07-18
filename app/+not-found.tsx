import { Link, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AppText as Text } from '../src/components/AppText';
import { useTheme } from '../src/theme';

export default function NotFound() {
  const { colors, spacing } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, backgroundColor: 'transparent' }}>
        <Text style={{ fontSize: 40, marginBottom: spacing.md }}>🧭</Text>
        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.sm }}>This screen doesn't exist</Text>
        <Link href="/(tabs)" style={{ color: colors.primary, fontWeight: '700' }}>
          Go back home
        </Link>
      </View>
    </>
  );
}
