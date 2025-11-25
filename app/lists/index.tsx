import Lists from '@/components/lists';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const { boardId } = useLocalSearchParams();
  const renderLists: {
    id: number;
    name: string;
    color: string;
    boardId: number;
  }[] = [];

  const lists = data.lists;

  lists.forEach((list) => {
    if (Number(boardId) === list.boardId) renderLists.push(list);
  });

  return (
    <View>
      {renderLists.map((list) => (
        <View key={(list.id, list.name, list.color, list.boardId)}>
          <Lists
            id={list.id}
            name={list.name}
            color={list.color}
            boardId={list.boardId}
          />
        </View>
      ))}
    </View>
  );
};

export default Index;
