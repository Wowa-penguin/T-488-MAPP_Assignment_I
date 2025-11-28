import Tasks from '@/components/tasks';
import { useData } from '@/util/dataState';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { tasks, setTasks } = useData();
  const { lists } = useData();
  const { isMove, setIsMove } = useData();

  const idToNumber = Number(id);

  const task = tasks.find((t) => t.id === idToNumber);
  const currTaskList = lists.find((list) => list.id === task?.listId);
  const currBoardId = currTaskList?.boardId;

  const allListsInCurrBoard = lists.filter(
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
      <View style={[styles.moveMain, { backgroundColor: '#d5e9f5' }]}>
        {allListsInCurrBoard.map((list) => (
          <View key={list.id}>
            {task?.listId === list.id ? (
              <View style={[styles.listMain, { backgroundColor: list.color }]}>
                <Text style={styles.text}>{list.name} - Task in this list</Text>
              </View>
            ) : (
              <View
                style={[
                  styles.moveTo,
                  styles.listMain,
                  { backgroundColor: list.color },
                ]}
              >
                <Text style={styles.text}>{list.name}</Text>
                <View style={styles.button}>
                  <Button
                    title="Move to"
                    color={'#fff'}
                    onPress={() => confirmMove(list.id)}
                  />
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={styles.button}>
          <Button title="Cancel" onPress={handleCancelMove} color={'#fff'} />
        </View>
      </View>
    );
  }

  //? 1) Error handel
  if (!id) {
    return (
      <View style={[styles.center, { backgroundColor: '#d5e9f5' }]}>
        <Text>No task id provided in the URL.</Text>
      </View>
    );
  }

  if (Number.isNaN(idToNumber)) {
    return (
      <View style={[styles.center, { backgroundColor: '#d5e9f5' }]}>
        <Text>Invalid task id: {id}</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={[styles.center, { backgroundColor: '#d5e9f5' }]}>
        <Text>Task not found for id {idToNumber}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#d5e9f5' }]}>
      {currTaskList ? (
        <Link
          style={styles.listName}
          href={{
            pathname: '/lists',
            params: { bId: currBoardId },
          }}
        >
          <Text>{currTaskList.name}</Text>
        </Link>
      ) : (
        <Text style={styles.listName}>No name</Text>
      )}
      {currTaskList?.color ? (
        <Tasks
          id={task.id}
          name={task.name}
          description={task.description}
          priority={task.priority}
          isFinished={task.isFinished}
          listColor={currTaskList?.color}
          move={handleMove}
        />
      ) : (
        <Tasks
          id={task.id}
          name={task.name}
          description={task.description}
          priority={task.priority}
          isFinished={task.isFinished}
          listColor={'#ffffffff'}
          move={handleMove}
        />
      )}
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
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
    alignContent: 'center',
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
  listMain: {
    padding: 10,
    width: 300,
    borderRadius: 25,
  },
  moveTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0b3f8cff',
    borderRadius: 25,
    marginLeft: 2,
  },
  text: {
    fontSize: 18,
  },
  listName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default Index;
