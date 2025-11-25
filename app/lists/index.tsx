import Lists from '@/components/lists';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

const Index = () => {
  const { boardId } = useLocalSearchParams();
  const [lists, setLists] = useState(data.lists); // * til að breyta þegar við bætum við lista ekki taka út

  const tasks = data.tasks;

  const renderLists = lists
    .filter((list) => Number(boardId) === list.boardId)
    .map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.listId === list.id),
    }));

  return (
    <View>
      {renderLists.map((list) => (
        <View key={list.name}>
          <Lists
            id={list.id}
            name={list.name}
            color={list.color}
            boardId={list.boardId}
            tasks={list.tasks}
          />
        </View>
      ))}
    </View>
  );
};

export default Index;
