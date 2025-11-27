import { Button, Image, StyleSheet, Text, View, Pressable } from 'react-native';

import { Link } from 'expo-router';

type BoardProps = {
  id: number;
  name: string;
  description: string;
  img: string;
  onDelete: () => void;
  onEdit: () => void;
};

const Boards = ({
  id,
  name,
  description,
  img,
  onDelete,
  onEdit,
}: BoardProps) => {
  return (
    <View style={styles.board}>
      <Link
        href={{
          pathname: '/lists',
          params: { bId: id },
        }}
        asChild
      >
      <Pressable
        style={({ pressed }) => [
          styles.cardContent,
          pressed && styles.pressed,
        ]}
      >
          <Image style={styles.image} source={{ uri: img }} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
      </Pressable>
      </Link>
  
      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" color="red" onPress={onDelete} />
      </View>
    </View>  
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  image: {
    width: '100%',
    alignSelf: 'center',
    aspectRatio: 4 / 3,
    borderRadius: 12,
  },

  name: {
    marginTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 18,
    paddingHorizontal: 4,
  },

  buttonRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },

  pressed: {
    transform: [{scale: 0.97}],
    opacity: 0.9,
  },

  cardContent: {
    width: '100%',
    alignItems: 'center',
  }
});

export default Boards;
