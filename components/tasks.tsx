import data from '@/data/data.json';
import { Text, View } from 'react-native';

const Tasks = () => {
  const tasks = data.tasks;

  return (
    <View>
      <Text>Tasks</Text>
    </View>
  );
};

export default Tasks;
