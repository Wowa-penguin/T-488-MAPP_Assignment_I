import { useData } from '@/util/dataState';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';

type TaskProp = {
  id: number;
};

type TaskType = {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
};

const Tasks = ({ id }: TaskProp) => {
  const { tasks, setTasks } = useData();
  const router = useRouter();

  const task = tasks.find((t) => t.id === id);

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

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task?.name}</Text>

      <Text style={styles.description}>{task?.description}</Text>

      <Text style={styles.status}>
        {task?.isFinished ? '✅ Done' : '⏳ In progress'}
      </Text>

      <Button
        title={task?.isFinished ? 'Mark as not done' : 'Mark as done'}
        onPress={handleToggleFinished}
      />

      <Button
        title="Delete task"
        color="#b91c1c"
        onPress={confirmDeleteTask}
      />
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
});

export default Tasks;
