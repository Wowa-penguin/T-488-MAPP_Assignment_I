import data from '@/data/data.json';
import { Text, View } from 'react-native';

const Lists = () => {
  const lists = data.lists;

  return (
    <View>
      <Text>Lists</Text>
    </View>
  );
};

export default Lists;
