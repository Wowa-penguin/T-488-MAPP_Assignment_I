import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Tasks from '@/components/tasks';
import { useData } from '@/util/dataState';

const Index = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks } = useData();

  // 1) No id passed in the URL
  if (!id) {
    return (
      <View style={styles.center}>
        <Text>No task id provided in the URL.</Text>
      </View>
    );
  }

  const numericId = Number(id);

  // 2) id is not a valid number
  if (Number.isNaN(numericId)) {
    return (
      <View style={styles.center}>
        <Text>Invalid task id: {id}</Text>
      </View>
    );
  }

  // 3) Find the task in the shared tasks state (NOT in data.json)
  const task = tasks.find((t) => t.id === numericId);

  // 4) No task found → show friendly message instead of crashing
  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Task not found for id {numericId}</Text>
      </View>
    );
  }

  // 5) Valid task → render the Tasks component using its id
  return (
    <View style={styles.container}>
      <Tasks id={task.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#f2f2f2',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default Index;