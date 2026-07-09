import { Stack } from 'expo-router';
import React from 'react';

export default function CardsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[deckId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
