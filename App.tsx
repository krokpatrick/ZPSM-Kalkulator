import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Key, BASIC, EXTENDED } from './src/keys';
import CalculatorKey from './src/components/CalculatorKey';
import { evaluate } from './src/logic/evaluate';



type KeypadProps = {
  rows: Key[][];
  onPress: (label: string) => void;
};

function Keypad({ rows, onPress }: KeypadProps) {
  return (
    <View style={styles.keypad}>
      {rows.map((row, rowIndex) => (
          <View style={styles.buttonRow} key={rowIndex}>
            {row.map((key) => (
              <CalculatorKey
                key={key.label}
                item={key}
                onPress={onPress}
              />
            ))}
            
          </View>
        ))}
    </View>
  )
}

function formatResult(value: number): string {
  return Number(value.toFixed(10)).toString();
}

export default function App() {

  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const [expression, setExpression] = useState('');
  const [error, setError] = useState('');

  function append(symbol: string): void {

    if (symbol === 'AC') {
      setExpression('');
      setError('');
      return;
    }

    if (symbol === '⌫') {
      setExpression((previous) => previous.slice(0, -1));
      setError('');
      return;
    }

    if (symbol === '=') {
      try {
        const result = evaluate(expression);

        setExpression(String(result));
        setError('');

      } 
      catch (error)
      {
        if (error instanceof Error) {
          switch(error.message) {
            case 'Empty expression':
              setError('Wprowadź wyrażenie');
              break;

            case 'Division by zero':
              setError('Nie można dzielić przez zero');
              break;
            
            case 'Invalid mathematical result':
            case 'Invalid expression':
            default:
              setError('Nieprawidłowe wyrażenie');
              break;
          }
        } else {
          setError("Nieznany błąd");
        }
      }
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

      setError('');

      return;
    }

    if (symbol === 'x²') {
      setExpression((previous) => previous + '^2');
      setError('');
      return;
    }

    if (symbol === 'xʸ') {
      setExpression((previous) => previous + '^');
      setError('');
      return;
    }

    if (symbol === '1/x') {
      setExpression((previous) => {
        return '1/(' + previous + ')'
      });
      setError('');
      return;
    }

    if (symbol === '√') {
      setExpression((previous) => previous + '√(');
      setError('');
      return;
    }

    setExpression((previousExpression) => previousExpression + symbol);
    setError('');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
    <View style={[
      styles.calculator,
      landscape && styles.containerLandscape,
      ]}
      >
      <StatusBar style="dark"/>
      <View style={[
        styles.display,
        landscape && styles.displayLandscape,
      ]}>
        <View style={styles.displayContent}>
          <Text
            style={styles.expression}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.35}
          >
            {expression
              ? (
                  Number.isFinite(Number(expression))
                    ? formatResult(Number(expression))
                    : expression
                )
              : '0'}
          </Text>
          {error !== '' && ( 
            <Text style={styles.errorMessage}>
              {error}
            </Text>
          )}
        </View>
      </View>

      <View style={[
        styles.keypad,
        landscape && styles.calculatorLandscape,
        ]}>
          <View
            style={[
              styles.basicBlock,
              landscape && styles.basicBlockLandscape,
            ]}
          >
            <Keypad rows={BASIC} onPress={append} />

          </View>

          {landscape && (
            <View style={styles.extendedBlock}>
              <Keypad rows={EXTENDED} onPress={append} />
            </View>
          )}
      </View>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
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

  containerLandscape: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
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

  displayLandscape: {
    minHeight: 44,
    paddingVertical: 5
  },

  expression: {
    width: '100%',
    color: '#1D4165',
    fontSize: 28,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },

  calculator: {
    flex: 1,
    minHeight: 0,
  },

  calculatorLandscape: {
    flexDirection: 'row',
    gap: 10,
  },

  basicBlock: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },

  basicBlockLandscape: {
    flex: 4,
  },

  extendedBlock: {
    flex: 2,
    minWidth: 0,
    minHeight: 0,
  },



  keypad: {
    flex: 1,
    minHeight: 0,
    gap: 8,
  },

  buttonRow: {
    flex: 1,
    minHeight: 0,
    flexDirection: 'row',
    gap: 8,
  },

  displayContent: {
    width: '100%',
    gap: 4,
  },

  errorMessage: {
    color: '#D93025',
    fontSize: 11,
    textAlign: 'right',
  },

});
