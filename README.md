# Web3 Academy

A native mobile app (iOS + Android + Web) for learning Web3, blockchain, and crypto concepts — built with [Expo](https://expo.dev) and React Native.

The app teaches through four connected experiences:

- **Learn** — 8 structured modules (40+ bite-sized lessons) from Web3 foundations through DeFi, NFTs, major blockchains, dev tools, and real case studies, each with an inline comprehension check and an end-of-module quiz.
- **Flashcards** — a searchable glossary of ~100 Web3 terms, browsable by category, with a flip-to-reveal card UI and a "mastered" tracker.
- **Chain Library** — a wiki of 12 major blockchains (Ethereum, Solana, Base, Arbitrum, Cosmos, zkSync, and more) with their consensus mechanism, strengths, use cases, and popular dApps.
- **Profile** — XP, levels, streaks, and unlockable badges to keep learning motivating, plus light/dark appearance controls.

Progress (XP, streaks, completed lessons, mastered terms, quiz history, badges) is stored locally on-device via `AsyncStorage` — no account or backend required.

## Tech stack

- [Expo](https://expo.dev) (SDK 57) + React Native, TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation (tabs + stacks + modal quiz screen)
- `react-native-reanimated` for the flashcard flip and animated progress bars
- `@react-native-async-storage/async-storage` for local persistence
- All content lives in plain TypeScript data files under `src/data/` — no CMS or network calls needed to run the app

## Project structure

```
app/                      Expo Router routes (screens)
  _layout.tsx             Root providers + stack (onboarding / tabs / quiz modal)
  onboarding.tsx           First-run intro carousel
  (tabs)/                  Bottom tab navigator
    index.tsx              Home dashboard
    learn/                 Modules -> lessons
    cards/                 Flashcard decks by category
    library/               Blockchain wiki
    profile/               XP, streaks, badges, settings
  quiz/[quizId].tsx        Shared quiz runner (module quizzes, deck quizzes, daily challenge)
src/
  components/              Reusable UI (Button, Card, Flashcard, QuizRunner, ...)
  data/                     Content: modules, lessons, glossary, blockchains, achievements, quizzes
  state/ProgressContext.tsx Local progress store + gamification actions
  theme/                    Colors, spacing, typography, light/dark theme provider
  types/                    Shared TypeScript contracts for all content and progress state
  utils/                    XP/streak/achievement logic, quiz generation, slugs
```

## Run locally

**Prerequisites:** Node.js 18+, and either the [Expo Go](https://expo.dev/go) app on your phone, or Xcode/Android Studio for a simulator.

```bash
npm install
npm run start      # scan the QR code with Expo Go, or press i / a for a simulator
```

Other scripts:

```bash
npm run ios         # open in iOS simulator (macOS only)
npm run android     # open in Android emulator
npm run web         # run in the browser
npm run typecheck   # tsc --noEmit
```

## Building for the App Store / Play Store

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/). You'll need your own free Expo account:

```bash
npm install -g eas-cli
eas login
eas init                 # links this project to your Expo account, writes extra.eas.projectId
eas build:configure       # optional, eas.json already includes development/preview/production profiles
eas build --platform ios --profile production
eas build --platform android --profile production
```

Then submit with `eas submit` (requires an Apple Developer / Google Play Console account).

### Before you submit, update these placeholders

- **Bundle identifiers**: `app.json` currently uses `com.web3academy.app` for both `ios.bundleIdentifier` and `android.package`. Change these to your own reverse-DNS identifier.
- **App icon / splash**: `assets/icon.png`, `assets/splash-icon.png`, `assets/android-icon-*.png`, and `assets/favicon.png` are a generated placeholder mark (interlocking hexagons on an indigo→violet gradient). Swap in your own branded artwork if you want something different — sizes/roles are documented in `app.json`.
- **App name**: `expo.name` in `app.json` ("Web3 Academy") is what shows under the icon on-device.

## Editing content

All learning content is plain data, so it's easy to expand without touching any screen code:

- `src/data/modules.ts` — the 8 top-level learning modules
- `src/data/lessons.ts` — lessons within each module (`moduleId` links them)
- `src/data/glossary.ts` — flashcard terms
- `src/data/blockchains.ts` — the chain library and their dApps
- `src/data/quizzes.ts` — per-module quiz questions
- `src/data/achievements.ts` — unlockable badges and their unlock criteria

Shapes for all of the above are defined in `src/types/content.ts`.
