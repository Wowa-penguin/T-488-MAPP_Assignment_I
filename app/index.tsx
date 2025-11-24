import data from '@/data/data.json';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const boards = data.boards;
  const tasks = data.tasks;

  return (
    <View style={styles.test}>
      <Text>Edit app/index.tsx to edit this screen.</Text>

      {tasks.map((task) => (
        <Text key={task.id}>{task.id}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
