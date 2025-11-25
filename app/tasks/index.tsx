import Tasks from '@/components/tasks';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { taskId } = useLocalSearchParams();

  const tasks = data.tasks;
  const currTask = tasks[Number(taskId)];
  //todo: það er villa hér sem ég er að vinna í ekki bryta þessu
  return (
    <View>
      <Tasks
        id={currTask.id}
        name={currTask.name}
        description={currTask.description}
        isFinished={currTask.isFinished}
        listId={currTask.listId}
      />
    </View>
  );
};

export default Index;
