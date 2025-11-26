import Boards from '@/components/boards';
import data from '@/data/data.json';
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type BoardType = {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
};

const BoardList = () => {
  const [boards, setBoards] = useState<BoardType[]>(data.boards);

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailPhoto, setThumbnailPhoto] = useState('');

  const handleAddBoard = () => {
    const lastBoard = boards[boards.length - 1];
    setId(lastBoard.id + 1);

    if (!name.trim()) return;

    const newBoard: BoardType = {
      id,
      name,
      description,
      thumbnailPhoto,
    };

    setBoards((prev) => [...prev, newBoard]);

    setName('');
    setDescription('');
    setThumbnailPhoto('');
  };

  const handleDeleteBoard = (boardToDelete: number) => {
    setBoards((prev) => prev.filter((b) => b.id !== boardToDelete));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Create new board</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={thumbnailPhoto}
          onChangeText={setThumbnailPhoto}
        />
        <Button title="Add board" onPress={handleAddBoard} />
      </View>
      <View style={styles.boardGrid}>
        {boards.map((board) => (
          <View
            key={
              (board.id, board.name, board.description, board.thumbnailPhoto)
            }
          >
            <Boards
              id={board.id}
              name={board.name}
              description={board.description}
              img={board.thumbnailPhoto}
              onDelete={() => handleDeleteBoard(board.id)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },

  form: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },

  formTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },

  boardGrid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});

export default BoardList;
