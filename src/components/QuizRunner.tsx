import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { QuizQuestion } from '../types';
import { useTheme } from '../theme';
import { Button } from './Button';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

interface QuizRunnerProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onRetry: () => void;
  onExit: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ title, questions, onComplete, onRetry, onExit }) => {
  const { colors, spacing, radius } = useTheme();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.correctIndex;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
    ).catch(() => {});
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        setDone(true);
        if (!finished) {
          setFinished(true);
          onComplete(nextScore, questions.length);
        }
      }
    }, 1400);
  };

  if (questions.length === 0) {
    return null;
  }

  if (done) {
    const perfect = score === questions.length;
    return (
      <View style={{ padding: spacing.lg, alignItems: 'center' }}>
        <Card style={{ alignItems: 'center', width: '100%' }}>
          <Text style={{ fontSize: 52, marginBottom: spacing.md }}>{perfect ? '🏆' : score >= questions.length / 2 ? '🔥' : '📚'}</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 6 }}>Quiz Complete!</Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' }}>
            You scored <Text style={{ color: colors.primary, fontWeight: '800' }}>{score}</Text> out of{' '}
            <Text style={{ fontWeight: '800', color: colors.text }}>{questions.length}</Text>
            {perfect ? ' — a perfect run!' : '.'}
          </Text>
          <Button title="Try Again" onPress={onRetry} fullWidth />
          <View style={{ height: spacing.sm }} />
          <Button title="Back" onPress={onExit} variant="outline" fullWidth />
        </Card>
      </View>
    );
  }

  return (
    <View style={{ padding: spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
        <Text style={{ fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 0.4 }}>
          {title.toUpperCase()} · {index + 1}/{questions.length}
        </Text>
        <Text style={{ fontSize: 11, fontWeight: '800', color: colors.primary, letterSpacing: 0.4 }}>SCORE {score}</Text>
      </View>
      <ProgressBar fraction={(index + 1) / questions.length} style={{ marginBottom: spacing.lg }} />

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, lineHeight: 24 }}>{current.prompt}</Text>
      </Card>

      <View style={{ gap: spacing.sm }}>
        {current.options.map((option, idx) => {
          let bg = colors.surfaceAlt;
          let borderColor = 'transparent';
          let textColor = colors.text;

          if (selected !== null) {
            if (idx === current.correctIndex) {
              bg = colors.successMuted;
              borderColor = colors.success;
              textColor = colors.success;
            } else if (idx === selected) {
              bg = colors.dangerMuted;
              borderColor = colors.danger;
              textColor = colors.danger;
            } else {
              textColor = colors.textMuted;
            }
          }

          return (
            <Pressable
              key={idx}
              disabled={selected !== null}
              onPress={() => handleAnswer(idx)}
              style={{
                padding: spacing.md,
                borderRadius: radius.lg,
                backgroundColor: bg,
                borderWidth: 2,
                borderColor,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: textColor }}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {selected !== null ? (
        <View style={{ marginTop: spacing.lg, flexDirection: 'row', alignItems: 'flex-start' }}>
          <Ionicons
            name={selected === current.correctIndex ? 'checkmark-circle' : 'information-circle'}
            size={18}
            color={selected === current.correctIndex ? colors.success : colors.primary}
            style={{ marginRight: 6, marginTop: 1 }}
          />
          <Text style={{ flex: 1, fontSize: 12, color: colors.textMuted, lineHeight: 18 }}>{current.explanation}</Text>
        </View>
      ) : null}
    </View>
  );
};
