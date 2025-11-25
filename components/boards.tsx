import { Image, StyleSheet, Text, View } from 'react-native';

type BoardProps = {
  name: string;
  description: string;
  img: string;
};

const Boards = ({ name, description, img }: BoardProps) => {
  return (
    <View style={styles.board}>
      <Image
          style={styles.image}
          source={{ uri: img }}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '45%',
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
