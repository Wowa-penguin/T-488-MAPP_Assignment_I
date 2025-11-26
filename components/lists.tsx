import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ListProps = {
  name: string;
  id: number;
  color: string;
  tasks: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }[];
};

const Lists = ({ id, name, color, tasks }: ListProps) => {
  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {name.toUpperCase()} - {id}
        </Text>
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
    textAlign: 'center',
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
    textAlign: 'center',
  },
  columnText: {
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    padding: 10,
    borderRadius: 8,
  },
});

export default Lists;
