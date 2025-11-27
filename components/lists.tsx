import { useData } from '@/util/dataState';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
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

      <View style={[styles.card, { backgroundColor: color }]}>
        {tasks.map((task) => (
          <Link
            href={{
              pathname: '/tasks',
              params: { id: task.id },
            }}
            push
            key={task.id}
          >
            <Text style={styles.columnText}>{task.name}</Text>
          </Link>
        ))}

        <View style={styles.listsButtons}>
          <Button title="Add task" onPress={handleAdd} />
          <Button
            title="Delete List"
            color="red"
            onPress={confirmDeleteList}
          />
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
    fontSize: 16,
    textAlign: 'center',
  },
  columnText: {
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  listsButtons: {
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
  },
});

export default Lists;
