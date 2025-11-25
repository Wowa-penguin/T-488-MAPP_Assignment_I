import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TaskProps = {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
};

const Tasks = ({ name, description, isFinished }: TaskProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      <Text style={styles.status}>
        {isFinished ? '✅ Done' : '⏳ In progress'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,

    elevation: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#4b5563',
  },

  status: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
  }
});

export default Tasks;
