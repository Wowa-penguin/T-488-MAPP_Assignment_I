import { useData } from '@/util/dataState';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

type TaskProp = {
  id: number;
  move: (id: number) => void;
};

type TaskType = {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
};

const Tasks = ({ id, move }: TaskProp) => {
  const { tasks, setTasks } = useData();
  const router = useRouter();

  const task = tasks.find((t) => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  if (!task) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Task not found.</Text>
      </View>
    );
  }

  const updateTask = (taskId: number, updatedFields: Partial<TaskType>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  };

  const handleToggleFinished = () => {
    updateTask(id, { isFinished: !task?.isFinished });
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    router.back();
  };

  const confirmDeleteTask = () => {
    if (!task) return;

    Alert.alert(
      'Delete task',
      `Are you sure you want to delete "${task.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteTask(task.id),
        },
      ]
    );
  };

  const handleStartEditing = () => {
    setEditName(task.name);
    setEditDescription(task.description);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveEditing = () => {
    const trimmedName = editName.trim();
    const trimmedDescription = editDescription.trim();

    if (!trimmedName) {
      Alert.alert('Validation', 'Task name cannot be empty.');
      return;
    }

    updateTask(id, {
      name: trimmedName,
      description: trimmedDescription,
    });

    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      {isEditing ? (
        <>
          <Text style={styles.editLabel}>Edit task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task title"
            value={editName}
            onChangeText={setEditName}
          />

          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Description"
            value={editDescription}
            onChangeText={setEditDescription}
            multiline
          />

          <View style={styles.buttonWrapper}>
            <Button title="Save changes" onPress={handleSaveEditing} />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Cancel"
              color="#6b7280"
              onPress={handleCancelEditing}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{task.name}</Text>

          <Text style={styles.description}>{task.description}</Text>

          <Text style={styles.status}>
            {task.isFinished ? '✅ Done' : '⏳ In progress'}
          </Text>

          <View>
            <View style={styles.buttonWrapper}>
              <Button
                title={task.isFinished ? 'Mark as not done' : 'Mark as done'}
                onPress={handleToggleFinished}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <Button title="Edit task" onPress={handleStartEditing} />
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                title="Delete task"
                color="#b91c1c"
                onPress={confirmDeleteTask}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Move" onPress={() => move(id)} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
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
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#4b5563',
  },

  status: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
  },

  buttonWrapper: {
    marginTop: 8,
  },
  editLabel: {
    fontSize: 14,
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
});

export default Tasks;
