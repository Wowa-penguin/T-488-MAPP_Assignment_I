import { useData } from '@/util/dataState';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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

  const handleAdd = () => {
    onAddTask(taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {name.toUpperCase()} - {id}
        </Text>
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

        <View style={styles.addTaskContainer}>
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
          <Button title="Add task" onPress={handleAdd} />
        </View>
        <Button
          title="Delete List"
          color="red"
          onPress={() => deleteList(id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  listsRow: {
    paddingBottom: 16,
  },
  column: {
    backgroundColor: 'ff',
    padding: 12,
    marginRight: 12,
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
  addTaskContainer: {
    marginTop: 10,
    backgroundColor: '#ffffffaa',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 6,
    marginBottom: 6,
    fontSize: 13,
  },
});

export default Lists;
