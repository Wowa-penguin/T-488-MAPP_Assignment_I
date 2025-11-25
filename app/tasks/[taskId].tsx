import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import data from "@/data/data.json";

type TaskType = {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
};

const TaskDetailScreen = () => {
    const { taskId } = useLocalSearchParams<{ taskId?: string }>();

    const id = Number(taskId);
    const task: TaskType | undefined = data.tasks.find((t: TaskType) => t.id === id);

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Task not found</Text>
            </View>
        );       
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.name}</Text>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>
                {task.description || 'No description'}
            </Text>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.status}>
                {task.isFinished ? '✅ Done' : '⏳ Not done'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
  error: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});

export default TaskDetailScreen;