import Lists from '@/components/lists';
import data from '@/data/data.json';
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type ListsType = {
  id: number;
  name: string;
  color: string;
  boardId: number;
};

type ListProp = {
  boardId: number;
};

const AllLists = ({ boardId }: ListProp) => {
  const [lists, setLists] = useState<ListsType[]>(data.lists);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const boards = data.boards;
  const tasks = data.tasks;

  const board = boards.find((b: { id: number }) => b.id === boardId);
  const boardName = board?.name;

  const renderLists = lists
    .filter((list) => Number(boardId) === list.boardId)
    .map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.listId === list.id),
    }));

  const handleAddList = () => {
    const newId = lists[lists.length - 1].id + 1;

    const newList: ListsType = {
      id: newId,
      name: name.trim(),
      color: color.trim(),
      boardId,
    };

    setLists((prev) => [...prev, newList]);

    setName('');
    setColor('');
  };

  console.log('boardName:', boardName);
  console.log('boardId prop:', boardId);
  console.log('lists from data:', lists);
  console.log('renderLists:', renderLists);
  console.log('renderListsTasks:', renderLists[0].tasks);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.boardNameView}>
        <Text style={styles.boardName}>{boardName}</Text>
      </View>
      {renderLists.map((list) => (
        <View key={list.id}>
          <Lists
            id={list.id}
            name={list.name}
            color={list.color}
            tasks={list.tasks}
          />
        </View>
      ))}
      <View style={styles.button}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
        <Button
          title="Add new list"
          color={'#21252b'}
          onPress={handleAddList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
  },
  boardName: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  boardNameView: {
    marginBottom: '8%',
    marginTop: '8%',
  },
  button: {
    //Todo: Vantar góða styles
    padding: 5,
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#a2bade',
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
});

export default AllLists;
