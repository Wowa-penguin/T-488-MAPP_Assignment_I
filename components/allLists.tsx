import Lists from '@/components/lists';
import data from '@/data/data.json';
import type { AppDispatch, RootState } from '@/store';
import { addList, type List } from '@/store/listsSlice';
import type { Task } from '@/store/tasksSlice';
import { addTask } from '@/store/tasksSlice';
import { Link } from 'expo-router';
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

type ListProp = {
  boardId: number;
};

const COLORS = [
  '#ff6b6b',
  '#4dabf7',
  '#51cf66',
  '#ffa94d',
  '#845ef7',
  '#f783ac',
  '#20c997',
  '#ffffff',
  '#cccccc',
  '#ffd43b',
  '#94d82d',
  '#339af0',
  '#e599f7',
  '#ff922b',
  '#63e6be',
  '#adb5bd',
];

const AllLists = ({ boardId }: ListProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const boards = data.boards;

  const board = boards.find((b: { id: number }) => b.id === boardId);
  const boardName = board?.name;

  const renderLists = lists
    .filter((list) => Number(boardId) === list.boardId)
    .map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.listId === list.id),
    }));

  const handleAddList = () => {
    if (!name) {
      Alert.alert('Validation', 'Task name cannot be empty.');
      return;
    }

    const newId = lists[lists.length - 1].id + 1;

    const newList: List = {
      id: newId,
      name: name.trim(),
      color: color.trim(),
      boardId,
    };

    dispatch(addList(newList));

    setEditModalVisible(false);
    setName('');
    setColor('');
  };

  const handleAddTask = (
    listId: number,
    name: string,
    description: string,
    priority: number
  ) => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) return;

    const lastTask = tasks[tasks.length - 1] as Task;
    const newId = lastTask ? lastTask.id + 1 : 1;

    const newTask: Task = {
      id: newId,
      name: trimmedName,
      description: trimmedDescription,
      priority: priority,
      isFinished: false,
      listId,
    };

    dispatch(addTask(newTask));
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Text style={{ marginBottom: 6 }}>Choose a color:</Text>
            <View style={styles.addColor}>
              {COLORS.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setColor(c)}
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: c,
                      borderWidth: color === c ? 3 : 1,
                      borderColor: color === c ? '#000' : '#777',
                    },
                  ]}
                />
              ))}
            </View>
            <View style={styles.flexButton}>
              <TouchableOpacity style={styles.button} onPress={handleAddList}>
                <Text style={styles.touchableText}>Add new list</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.touchableText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.boardNameView}>
        <Link href={'/'}>
          <Text style={styles.boardName}> ⬅ {boardName}</Text>
        </Link>
      </View>

      {renderLists.map((list) => (
        <View key={list.id}>
          <Lists
            id={list.id}
            name={list.name}
            color={list.color}
            tasks={list.tasks}
            boardId={list.boardId}
            onAddTask={(name, description, priority) =>
              handleAddTask(list.id, name, description, priority)
            }
          />
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { marginBottom: 50 }]}
        onPress={() => setEditModalVisible(true)}
      >
        <Text style={styles.touchableText}>Add new list</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  boardName: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  boardNameView: {
    marginBottom: '8%',
    marginTop: '8%',
  },
  addNewList: {
    padding: 10,
    alignSelf: 'center',
    width: '67%',
    backgroundColor: '#a2bade',
    borderRadius: 15,
  },
  addColor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  flexButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#296dd3ff',
    padding: 10,
    width: 'auto',
    height: 'auto',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
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
  touchableText: {
    fontSize: 22,
    fontWeight: 700,
    alignSelf: 'center',
    color: 'white',
  },
});

export default AllLists;
