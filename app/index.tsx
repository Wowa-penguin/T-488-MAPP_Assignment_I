import BoardList from '@/components/boardList';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toodler</Text>
      </View>
      <BoardList />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#444',
  },
});
