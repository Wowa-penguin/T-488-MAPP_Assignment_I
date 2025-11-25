import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Link } from 'expo-router';

type BoardProps = {
  id: number;
  name: string;
  description: string;
  img: string;
  onDelete: () => void;
};

const Boards = ({ id, name, description, img, onDelete }: BoardProps) => {
  return (
    <ScrollView style={styles.board}>
      <Image style={styles.image} source={{ uri: img }} />
      <Link
        href={{
          pathname: '/lists',
          params: { boardId: id },
        }}
      >
        <View style={styles.textDiv}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Link>
      <Button title="Delete" onPress={onDelete} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 16,
    marginBottom: 20,

    // --- iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,

    // --- Android
    elevation: 4,
  },

  textDiv: {
    flex: 1,
    alignItems: 'flex-start',
  },

  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default Boards;
