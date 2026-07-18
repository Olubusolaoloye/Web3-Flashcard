import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AmbientBackground } from '../src/components/AmbientBackground';
import { ProgressProvider, useProgress } from '../src/state/ProgressContext';
import { ThemeProvider, useTheme } from '../src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { isLoaded } = useProgress();
  const { scheme, colors } = useTheme();

  // React Navigation's own theme otherwise paints an opaque default background behind every
  // screen/tab scene, hiding the AmbientBackground blur layer mounted below. Overriding it with
  // a fully transparent background lets that layer show through everywhere.
  const navTheme = useMemo(
    () => ({
      dark: scheme === 'dark',
      colors: {
        primary: colors.primary,
        background: 'transparent',
        card: 'transparent',
        text: colors.text,
        border: colors.border,
        notification: colors.danger,
      },
      fonts: {
        regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' as const },
        medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' as const },
        bold: { fontFamily: 'Inter_700Bold', fontWeight: '700' as const },
        heavy: { fontFamily: 'Inter_800ExtraBold', fontWeight: '800' as const },
      },
    }),
    [scheme, colors]
  );

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const ready = isLoaded && fontsLoaded;

  const onLayout = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!ready) return null;

  return (
    <NavigationThemeProvider value={navTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <AmbientBackground />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="quiz/[quizId]"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </NavigationThemeProvider>
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
