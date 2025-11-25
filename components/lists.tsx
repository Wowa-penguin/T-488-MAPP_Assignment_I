import data from '@/data/data.json';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ListProps = {
  name: string;
  id: number;
  color: string;
  boardId: number;
  tasks: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }[];
};

const Lists = ({ id, name, color, boardId, tasks }: ListProps) => {
  const boards = data.boards;
  // boards[boardId - 1].name

  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name.toUpperCase()}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: color }]}>
        {tasks.map((task) => (
          <Link
            href={{
              pathname: '/tasks',
              params: { id: task.id },
            }}
            push
            key={task.name}
          >
            <Text style={styles.columnText}>{task.name}</Text>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  listsRow: {
    paddingBottom: 16,
  },
  column: {
    backgroundColor: 'ff',
    padding: 12,
    marginRight: 12,
  },
  header: {
    marginBottom: 12,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 16,
  },
  columnText: {
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    height: 60,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffffff',
    marginBottom: 8,
  },
});

export default Lists;
