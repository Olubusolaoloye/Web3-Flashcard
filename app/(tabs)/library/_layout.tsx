import { Stack } from 'expo-router';
import React from 'react';

export default function LibraryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[chainId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
