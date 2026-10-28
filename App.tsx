import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

const BUTTON_ROWS = [
  ['AC', '+-', '%', '/'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '⌫', '=']];

export default function App() {

  const [expression, setExpression] = useState('');

  function append(symbol: string): void {

    if (symbol === 'AC') {
      setExpression('');
      return;
    }

    if (symbol === '⌫') {
      setExpression((previous) => previous.slice(0, -1));
      return;
    }

    if (symbol === '+-') {
      setExpression((previous) => {
        if (!previous) return '-';

        if (previous.startsWith('-')) {
          return previous.slice(1);
        }

        return '-' + previous;
      });

      return;
    }

    setExpression((previousExpression) => previousExpression + symbol);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.display}>
        <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.35}>{expression || '0'}</Text>
      </View>

      <View style={styles.keypad}>
        {BUTTON_ROWS.map((row, rowIndex) => (
          <View style={styles.buttonRow} key={rowIndex}>
            {row.map((symbol) => (
              <Pressable
                key={symbol}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => append(symbol)}
                accessibilityRole="button"
                accessibilityLabel={
                  symbol === '⌫' ? 'Delete last character' : symbol
                }
                >
                  <Text style={styles.buttonText}>{symbol}</Text>
                </Pressable>
            ))}
          </View>
        ))}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginTop: 100,
    gap: 10,
  },

display: {
    width: '100%',
    minHeight: 76,
    backgroundColor: '#F1F3F6',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  expression: {
    width: '100%',
    color: '#1D4165',
    fontSize: 28,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },

  keypad: {
    flex: 1,
    gap: 8,
  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#E9EDF2',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    backgroundColor: '#D4DDE8',
  },

  buttonText: {
    color: '#1D4165',
    fontSize: 18,
    fontWeight: '500',
  },
});
