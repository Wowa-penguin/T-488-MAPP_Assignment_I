import AllList from '@/components/allLists';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { bId } = useLocalSearchParams();
  const boardId = Number(bId);

  return (
    <View>
      <AllList boardId={boardId} />
    </View>
  );
};

export default Index;
