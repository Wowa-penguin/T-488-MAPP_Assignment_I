import { useData } from '@/util/dataState';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type TaskProp = {
  id: number;
  name: string;
  description: string;
  priority: number;
  isFinished: boolean;
  listColor: string;

  move: (id: number) => void;
};

const PRIORITY = ['🧊Low', '📌Mid', '❗High'];
const OPTIONS = [1, 2, 3];
const PRIORITY_COLORS = ['#72f029', '#d4cd00', '#fc1100'];

const Tasks = ({
  id,
  name,
  description,
  priority,
  isFinished,
  listColor,
  move,
}: TaskProp) => {
  const { setTasks } = useData();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDescription, setEditDescription] = useState(description);
  const [editIsFinished, setEditIsFinished] = useState(isFinished);

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    router.back();
  };

  const confirmDeleteTask = () => {
    Alert.alert('Delete task', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => handleDeleteTask(id),
      },
    ]);
  };

  const handleFinished = () => {
    setEditIsFinished(!editIsFinished);
    handleSaveEditing();
  };

  const handleSaveEditing = () => {
    if (!editName) {
      Alert.alert('Validation', 'Task name cannot be empty.');
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              name: editName.trim(),
              description: editDescription.trim(),
              priority: editPriority,
              isFinished: editIsFinished,
            }
          : task
      )
    );
    setIsEditing(false);
  };

  return (
    <View style={[styles.card, { backgroundColor: listColor }]}>
      {isEditing ? (
        <>
          <Text style={styles.editLabel}>Edit task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task title"
            value={editName}
            onChangeText={setEditName}
          />
          <Text>Priority:</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {OPTIONS.map((x) => (
              <TouchableOpacity
                key={x}
                onPress={() => setEditPriority(x)}
                style={[
                  styles.prioritySelect,
                  {
                    borderWidth: editPriority === x ? 2 : 1,
                    borderColor: editPriority === x ? '#000' : '#777',
                  },
                ]}
              >
                <Text
                  style={{
                    color: PRIORITY_COLORS[x - 1],
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                >
                  {PRIORITY[x - 1]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Description"
            value={editDescription}
            onChangeText={setEditDescription}
            multiline
          />
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Save changes"
                onPress={handleSaveEditing}
                color={'white'}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                title="Cancel"
                color="#cb0202ff"
                onPress={() => setIsEditing(false)}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{name}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={styles.description}>Priority:</Text>
            <Text
              style={[
                styles.description,
                { color: PRIORITY_COLORS[priority - 1] },
              ]}
            >
              {PRIORITY[priority - 1]}
            </Text>
          </View>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.status}>
            {editIsFinished ? '✅ Done' : '⏳ In progress'}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleFinished}
            >
              <Text style={styles.buttonText}>
                {editIsFinished ? 'Not done' : 'Mark as done'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={confirmDeleteTask}
            >
              <Text style={[styles.buttonText, { color: '#bf2727ff' }]}>
                Delete task
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => move(id)}
            >
              <Text style={styles.buttonText}>Move</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#000000ff',
  },
  status: {
    fontSize: 16,
    color: '#000000ff',
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  buttonWrapper: {
    width: '44%',
    padding: 5,
    backgroundColor: '#0b3f8cff',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#fff',
  },
  editLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  prioritySelect: {
    width: 'auto',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 8,
  },
});

export default Tasks;
