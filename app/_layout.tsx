import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ProgressProvider, useProgress } from '../src/state/ProgressContext';
import { ThemeProvider, useTheme } from '../src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { isLoaded } = useProgress();
  const { scheme, colors } = useTheme();

  const onLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!isLoaded) return null;

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="quiz/[quizId]"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProgressProvider>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
