import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, TextInput, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface SearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  autoFocus?: boolean;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  style,
  autoFocus,
}) => {
  const { colors, radius, lift } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.inputFill,
          borderRadius: radius.full,
          paddingHorizontal: 16,
          height: 50,
        },
        lift('sm'),
        style,
      ]}
    >
      <Ionicons name="search" size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoFocus={autoFocus}
        autoCorrect={false}
        style={{
          flex: 1,
          marginLeft: 10,
          fontSize: 14.5,
          fontFamily: 'Inter_500Medium',
          color: colors.text,
          paddingVertical: 0,
        }}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
};
