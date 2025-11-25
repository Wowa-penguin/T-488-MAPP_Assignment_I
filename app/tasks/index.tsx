import Tasks from '@/components/tasks';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { listId } = useLocalSearchParams();

  const tasks = data.tasks;
  const renderTasks: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }[] = [];

  tasks.forEach((task) => {
    if (Number(listId) === task.listId) renderTasks.push(task);
  });

  return (
    <View>
      {renderTasks.map((task) => (
        <View
          key={
            (task.id, task.name, task.description, task.isFinished, task.listId)
          }
        >
          <Tasks
            id={task.id}
            name={task.name}
            description={task.description}
            isFinished={task.isFinished}
            listId={task.listId}
          />
        </View>
      ))}
    </View>
  );
};
