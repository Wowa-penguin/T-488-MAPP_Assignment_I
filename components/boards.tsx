import data from '@/data/data.json';
import { Image, StyleSheet, Text, View } from 'react-native';

const Boards = () => {
  const boards = data.boards;
  return (
    <View style={styles.mainBoard}>
      {boards.map((board) => (
        <View key={(board.name, board.description)} style={styles.board}>
          <Image
            source={{
              width: 150,
              height: 150,
              url: board.thumbnailPhoto,
            }}
          />
          <Text>Name: {board.name}</Text>
          <Text>Description: {board.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  board: {
    width: '45%',
    padding: 10,
    height: 300,
    backgroundColor: 'red',
  },
});

export default Boards;
