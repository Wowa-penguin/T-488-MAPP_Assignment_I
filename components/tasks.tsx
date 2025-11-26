import { useData } from '@/util/dataState';
import { Button, StyleSheet, Text, View } from 'react-native';

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
