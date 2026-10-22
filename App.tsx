import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.content}>
          <Pressable style={styles.button} onPress={() => setVisible(!visible)}>
            <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'}</Text>
          </Pressable>

          {visible && (
            <View style={styles.card}>
              <Text style={styles.nameStyle}>Jan Kowalski</Text>
              <Text style={styles.description}> Zaawansowane programowanie systemow mobilnych</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    backgroundColor: '#1D4165',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  items: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },

  content: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    minWidth: 44,
    minHeight: 44,
    backgroundColor: '#007579',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  card: {
    width: '80%',
    minHeight: 76,
    backgroundColor: '#F1F7F1',
    borderColor: '#8AB68A',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },

  nameStyle: {
    color: '#1D4165',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    color: "#777777",
    fontSize: 10,
    textAlign: 'center',
  },

  item: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#E6F3F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    color: '#006064',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    height: 36,
    backgroundColor: '#447eca',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  footerText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
