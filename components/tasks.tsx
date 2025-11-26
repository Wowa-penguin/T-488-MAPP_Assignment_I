import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

type TaskProp = {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
};

const Tasks = ({ id, name, description, isFinished, listId }: TaskProp) => {
  const [finished, setFinished] = useState(isFinished);

  const handleToggleFinished = () => {
    setFinished((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.status}>
        {finished ? '✅ Done' : '⏳ In progress'}
      </Text>

      <Button
        title={finished ? 'Mark as not done' : 'Mark as done'}
        onPress={handleToggleFinished}
      />  
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
  },
});

export default Tasks;
