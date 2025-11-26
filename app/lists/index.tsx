import Lists from '@/components/lists';
import data from '@/data/data.json';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const { boardId } = useLocalSearchParams();
  const [lists, setLists] = useState(data.lists); // * til að breyta þegar við bætum við lista ekki taka út

  const boards = data.boards;
  const tasks = data.tasks;

  const boardName = boards[Number(boardId) - 1].name;

  const renderLists = lists
    .filter((list) => Number(boardId) === list.boardId)
    .map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.listId === list.id),
    }));

  console.log(renderLists[0].tasks);

  return (
    <View>
      <View style={styles.boardNameView}>
        <Text style={styles.boardName}>{boardName}</Text>
      </View>
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

const styles = StyleSheet.create({
  boardName: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  boardNameView: {
    marginBottom: '8%',
    marginTop: '8%',
  },
});

export default Index;
