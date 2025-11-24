import data from '@/data/data.json';
import { Text, View } from 'react-native';

export default function Boards() {
  const boardsArr = data.boards;
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
