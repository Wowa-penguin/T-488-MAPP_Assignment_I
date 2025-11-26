import Tasks from '@/components/tasks';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { id } = useLocalSearchParams();

  const tasks = data.tasks;
  const currTask = tasks[Number(id) - 1];

  return (
    <View>
      <Tasks id={currTask.id} />
    </View>
  );
};

export default Index;
