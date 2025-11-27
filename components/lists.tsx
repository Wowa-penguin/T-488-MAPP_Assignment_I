import { useData } from '@/util/dataState';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type ListProps = {
  name: string;
  id: number;
  color: string;
  tasks: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }[];
  onAddTask: (name: string, description: string) => void;
};

export const darkenHex = (hex: string, amount: number = 30): string => {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);

  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0xff) - amount;
  let b = (num & 0xff) - amount;

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  const newColor =
    '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  return newColor;
};

const Lists = ({ id, name, color, tasks, onAddTask }: ListProps) => {
  const { deleteList } = useData();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleAdd = () => {
    setEditModalVisible(true);
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setTaskName('');
    setTaskDescription('');
  };

  const handleConfirm = () => {
    onAddTask(taskName, taskDescription);
    setEditModalVisible(false);
    setTaskName('');
    setTaskDescription('');
  };

  const confirmDeleteList = () => {
    Alert.alert(
      'Delete List',
      `Are you sure you want to delete the list "${name}" and all its tasks?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteList(id),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.column}>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="New task name"
              value={taskName}
              onChangeText={setTaskName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />
            <View style={styles.buttons}>
              <Button title="Confirm" onPress={handleConfirm} />
            </View>
            <View style={styles.buttons}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>{name.toUpperCase()}</Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: color,
            borderColor: darkenHex(color, 40),
          },
        ]}
      >
        {tasks.map((task) => (
          <Link
            href={{
              pathname: '/tasks',
              params: { id: task.id },
            }}
            push
            key={task.id}
          >
            <Text style={styles.columnText}>
              {task.isFinished ? '✅ ' : '⏳ '}
              {task.name}
            </Text>
          </Link>
        ))}

        <View style={styles.listsButtons}>
          <View style={styles.buttons}>
            <Button title="Add task" onPress={handleAdd} />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Delete List"
              color="red"
              onPress={confirmDeleteList}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  column: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 12,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
  },
  columnText: {
    fontWeight: '500',
    fontSize: 18,
  },
  card: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  listsButtons: {
    borderRadius: 8,
    backgroundColor: '#ffffffff',
    width: '70%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
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
  buttons: {
    //Todo: cool styles for add task and delete list
    padding: 3,
  },
});

export default Lists;
