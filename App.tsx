import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text style={styles.itemText}>A</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemText}>B</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemText}>C</Text>
          </View>
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
  },

  items: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
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
