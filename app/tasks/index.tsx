import Tasks from '@/components/tasks';
import { useData } from '@/util/dataState';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { tasks, setTasks } = useData();
  const { lists } = useData();
  const { currListsInBoard } = useData();
  const { isMove, setIsMove } = useData();

  const idToNumber = Number(id);

  const task = tasks.find((t) => t.id === idToNumber);
  const currTaskList = lists.find((list) => list.id === task?.listId);
  const currBoardId = currTaskList?.boardId;

  const allListsInCurrBoard = currListsInBoard.filter(
    (list) => list.boardId === currBoardId
  );

  const handleMove = (id: number) => {
    setIsMove(true);
    router.navigate({
      pathname: '/tasks',
      params: { id: id },
    });
  };

  const handleCancelMove = () => {
    setIsMove(false);
    router.navigate({
      pathname: '/tasks',
      params: { id: id },
    });
  };

  const confirmMove = (newListId: number) => {
    setIsMove(false);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === idToNumber ? { ...task, listId: newListId } : task
      )
    );

    router.navigate({
      pathname: '/lists',
      params: { bId: currBoardId },
    });
  };

  if (isMove) {
    return (
      <View style={styles.moveMain}>
        {allListsInCurrBoard.map((list) => (
          <View key={list.id}>
            {task?.listId === list.id ? (
              <>
                <Text>Curr List: {list.name}</Text>
              </>
            ) : (
              <>
                <View style={styles.moveTo}>
                  <Text>
                    {list.id} - {list.name}
                  </Text>
                  <Button
                    title="Move to"
                    onPress={() => confirmMove(list.id)}
                  />
                </View>
              </>
            )}
          </View>
        ))}
        <Button title="Cancel" onPress={handleCancelMove} />
      </View>
    );
  }

  //? 1) Error handel
  if (!id) {
    return (
      <View style={styles.center}>
        <Text>No task id provided in the URL.</Text>
      </View>
    );
  }

  if (Number.isNaN(idToNumber)) {
    return (
      <View style={styles.center}>
        <Text>Invalid task id: {id}</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Task not found for id {idToNumber}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Tasks id={task.id} move={handleMove} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#f2f2f2',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  moveMain: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'center',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  moveTo: {
    // todo: fix button and text
  },
});

export default Index;
