import Boards from '@/components/boards';
import { useData } from '@/util/dataState';
import React, { useState } from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Modal,
} from 'react-native';

type BoardType = {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
};

const BoardList = () => {
  const { boards, setBoards } = useData();

  //const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailPhoto, setThumbnailPhoto] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editingId !== null) {
      setBoards((prev) =>
        prev.map((board) =>
          board.id === editingId
            ? { ...board, name, description, thumbnailPhoto }
            : board
        )
      );
      setEditingId(null);
    } else {
      const nextId = boards.length > 0 ? boards[boards.length - 1].id + 1 : 1;

      const newBoard: BoardType = {
        id: nextId,
        name,
        description,
        thumbnailPhoto,
      };

      setBoards((prev) => [...prev, newBoard]);
    }

    setName('');
    setDescription('');
    setThumbnailPhoto('');
  };

  const handleEditBoard = (board: BoardType) => {
    setEditingId(board.id);
    setName(board.name);
    setDescription(board.description);
    setThumbnailPhoto(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  const handleDeleteBoard = (boardToDelete: number) => {
    setBoards((prev) => prev.filter((b) => b.id !== boardToDelete));

    if (editingId === boardToDelete) {
      setEditingId(null);
      setName('');
      setDescription('');
      setThumbnailPhoto('');
    }
  };

  const confirmDeleteBoard = (board: BoardType) => {
    Alert.alert(
      'Delete board',
      `Are you sure you want to delete "${board.name}"?`,
      [
        { text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteBoard(board.id),
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.formTitle}>Edit Board</Text>
  
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
  
            <Button
              title="Save changes"
              onPress={() => {
                handleSubmit();
                setEditModalVisible(false);
              }}
            />
  
            <View style={{ marginTop: 10 }}>
              <Button
                title="Cancel"
                color="#888"
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingId(null);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
  
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
  
        <Button title="Add board" onPress={handleSubmit} />
      </View>

      <View style={styles.boardGrid}>
        {boards.map((board) => (
          <Boards
            key={board.id}
            id={board.id}
            name={board.name}
            description={board.description}
            img={board.thumbnailPhoto}
            onDelete={() => confirmDeleteBoard(board)}
            onEdit={() => handleEditBoard(board)}
          />
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

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
  
});

export default BoardList;
