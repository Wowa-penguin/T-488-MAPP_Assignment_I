import data from '@/data/data.json';
import { StyleSheet, Text, View } from 'react-native';
import TaskCard from '@/components/tasks';

import Boards from '@/components/boards';

export default function Index() {
  const boards = data.boards;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toodler</Text>
      </View>
      
      <View style={styles.mainBoard}>
        {boards.map((board) => (
          <Boards
            key={
              (board.id, board.name, board.description, board.thumbnailPhoto)
            }
            id={board.id}
            name={board.name}
            description={board.description}
            img={board.thumbnailPhoto}
          />
        ))}
      </View>
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

  mainBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
});
