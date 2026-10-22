import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

const BUTTONS = ['7', '8', '9', '/'];

export default function App() {

  const [expression, setExpression] = useState('');

  function append(symbol: string): void {
    setExpression((previousExpression) => previousExpression + symbol);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.display}>
        <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.35}>{expression || '0'}</Text>
      </View>

      <View style={styles.buttonRow}>
        {BUTTONS.map((symbol) => (
          <Pressable key={symbol} style={({ pressed }) => [ styles.button, pressed && styles.buttonPressed,
          ]}
          onPress={() => append(symbol)}
          accessibilityRole="button"
          accessibilityLabel='{symbol}'
          >
            <Text style={styles.buttonText}>{symbol}</Text>
          </Pressable>
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

  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    flex: 1,
    minWidth: 0,
    minHeight: 54,
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
