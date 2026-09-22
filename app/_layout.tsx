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
import { ContentProvider, useContent } from '../src/state/ContentContext';
import { ProgressProvider, useProgress } from '../src/state/ProgressContext';
import { ThemeProvider, useTheme } from '../src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { isLoaded: progressLoaded } = useProgress();
  const { isLoaded: contentLoaded } = useContent();
  const { scheme, colors } = useTheme();

  const navTheme = useMemo(
    () => ({
      dark: scheme === 'dark',
      colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
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

  const ready = progressLoaded && contentLoaded && fontsLoaded;

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
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="quiz/[quizId]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ContentProvider>
          <ProgressProvider>
            <ThemeProvider>
              <RootNavigator />
            </ThemeProvider>
          </ProgressProvider>
        </ContentProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
