import AllList from '@/components/allLists';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { bId } = useLocalSearchParams();
  const boardId = Number(bId);

  return (
    <View
      style={{
        backgroundColor: '#d5e9f5',
      }}
    >
      <AllList boardId={boardId} />
    </View>
  );
};

export default Index;
