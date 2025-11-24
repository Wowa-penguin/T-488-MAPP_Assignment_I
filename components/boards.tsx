import data from '@/data/data.json';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Boards = (name) => {
  const boardsArr = data.boards;
  return (
    <View style={styles.mainBoard}>
      {boardsArr.map((board) => (
        <Text style={styles.boardText} key={(board.name, board.description)}>
          {board.name}
          {board.description}
        </Text>
      ))}
      <Text>{name}</Text>
    </View>
  );
};
// er smá test með types
Boards.PropTypes = {
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  mainBoard: {},
  boardText: {},
});

export default Boards;
