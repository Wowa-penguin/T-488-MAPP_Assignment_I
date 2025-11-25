import data from '@/data/data.json';
import { Image, StyleSheet, Text, View } from 'react-native';

const Boards = () => {
  const boards = data.boards;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toodler</Text>
      </View>

      <View style={styles.mainBoard}>
        {boards.map((board) => (
          <View key={(board.name, board.description)} style={styles.board}>
            <Image
              source={{
                width: 170,
                height: 150,
                uri: board.thumbnailPhoto,
              }}
            />
            <Text style={styles.name}>{board.name}</Text>
            <Text style={styles.description}>{board.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },

// ---Header---

  header: {
  paddingTop: 40,
  paddingBottom: 20,
  backgroundColor: "#f9f9f9",
  borderBottomWidth: 1,
  borderBottomColor: "#e0e0e0",
  alignItems: "center",
},

headerTitle: {
  fontSize: 30,
  fontWeight: "900",
  color: "#444",
},


// ---Board grid---

  mainBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 20,
  },

// ---Single card---

  board: {
    width: '45%',
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 16,
    marginBottom: 20,

    // --- iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,

    // --- Android
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 150,
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
