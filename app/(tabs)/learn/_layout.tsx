import { Stack } from 'expo-router';
import React from 'react';

export default function LearnLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[moduleId]/index" />
      <Stack.Screen name="[moduleId]/lesson/[lessonId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
