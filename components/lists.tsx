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
  TouchableOpacity,
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

const COLORS = [
  '#ff6b6b',
  '#4dabf7',
  '#51cf66',
  '#ffa94d',
  '#845ef7',
  '#f783ac',
  '#20c997',
];

const darkenHex = (hex: string, amount: number = 30): string => {
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
  const { setLists } = useData();

  const [listName, setListName] = useState(name);
  const [listColor, setListColor] = useState(color);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editListVar, setEditListVar] = useState(false);

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

  const handleNameChange = () => {
    setLists((prev) =>
      prev.map((list) => (list.id === id ? { ...list, name: listName } : list))
    );
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, color: listColor } : list
      )
    );
    setEditListVar(false);
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
            <View style={{ gap: 8 }}>
              <View style={styles.addListButtons}>
                <Button
                  title="Confirm"
                  color={'white'}
                  onPress={handleConfirm}
                />
              </View>
              <View style={styles.addListButtons}>
                <Button title="Cancel" color={'white'} onPress={handleCancel} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {editListVar ? (
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            placeholder={listName.toUpperCase()}
            value={listName.toUpperCase()}
            onChangeText={setListName}
          />
          <View style={styles.colorPick}>
            {COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setListColor(c)}
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
          <View style={styles.confirmButton}>
            <Button title="Confirm" onPress={handleNameChange} />
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerText}>{listName.toUpperCase()}</Text>
        </View>
      )}

      <View
        style={[
          styles.card,
          {
            backgroundColor: listColor,
            borderColor: darkenHex(listColor, 40),
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
            <Button
              title="Add task"
              onPress={() => setEditModalVisible(true)}
            />
          </View>
          <View
            style={[
              styles.buttons,
              { borderStyle: 'solid', borderLeftWidth: 2, borderRightWidth: 2 },
            ]}
          >
            <Button title="Edit" onPress={() => setEditListVar(true)} />
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
  colorPick: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  card: {
    gap: 4,
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
    width: 'auto',
    alignSelf: 'center',
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#ffffff',
    width: '25%',
    alignSelf: 'center',
    borderRadius: 25,
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
    padding: 3,
  },
  addListButtons: {
    alignSelf: 'center',
    backgroundColor: '#0b3f8cff',
    width: '50%',
    borderRadius: 25,
  },
});

export default Lists;
