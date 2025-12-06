import Boards from '@/components/boards';
import type { AppDispatch, RootState } from '@/store';
import type { Board } from '@/store/boardSlice';
import { addBoard, removeBoard, updateBoard } from '@/store/boardSlice';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const BoardList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector((state: RootState) => state.boards.boards);

  //* ### New or add state ###
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newThumbnailPhoto, setNewThumbnailPhoto] = useState('');

  //* ### edit states ###
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editThumbnailPhoto, setEditThumbnailPhoto] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleAddBoard = () => {
    if (!newName.trim()) {
      Alert.alert('Validation', 'Board name cannot be empty.');
      return;
    }

    const nextId = boards.length > 0 ? boards[boards.length - 1].id + 1 : 1;

    const newBoard: Board = {
      id: nextId,
      name: newName,
      description: newDescription,
      thumbnailPhoto: newThumbnailPhoto,
    };

    dispatch(addBoard(newBoard));

    setNewName('');
    setNewDescription('');
    setNewThumbnailPhoto('');
  };

  const handleEditBoard = (board: Board) => {
    setEditingId(board.id);
    setEditName(board.name);
    setEditDescription(board.description);
    setEditThumbnailPhoto(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (editingId === null) return;

    const newBoard: Board = {
      id: editingId,
      name: editName,
      description: editDescription,
      thumbnailPhoto: editThumbnailPhoto,
    };

    dispatch(updateBoard(newBoard));
    setEditModalVisible(false);
    setEditingId(null);
  };

  const handleDeleteBoard = (boardToDelete: number) => {
    dispatch(removeBoard(boardToDelete));

    if (editingId === boardToDelete) {
      setEditingId(null);
      setEditName('');
      setEditDescription('');
      setEditThumbnailPhoto('');
      setEditModalVisible(false);
    }
  };

  const confirmDeleteBoard = (board: Board) => {
    Alert.alert(
      'Delete board',
      `Are you sure you want to delete "${board.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteBoard(board.id),
        },
      ]
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
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={editDescription}
              onChangeText={setEditDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={editThumbnailPhoto}
              onChangeText={setEditThumbnailPhoto}
            />
            <TouchableOpacity
              style={[styles.button, { width: '60%' }]}
              onPress={handleSaveEdit}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                Save changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => {
                setEditModalVisible(false);
                setEditingId(null);
              }}
            >
              <Text style={[styles.buttonText, { color: '#d7d7d7ff' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Create new board</Text>

        <TextInput
          style={styles.input}
          placeholder="Name:"
          placeholderTextColor="#6d6d6dff"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          placeholderTextColor="#6d6d6dff"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL:"
          placeholderTextColor="#6d6d6dff"
          value={newThumbnailPhoto}
          onChangeText={setNewThumbnailPhoto}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddBoard}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              alignSelf: 'center',
              padding: 10,
              color: 'white',
            }}
          >
            Create board
          </Text>
        </TouchableOpacity>
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
  button: {
    alignSelf: 'center',
    backgroundColor: '#296dd3ff',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
});

export default BoardList;
