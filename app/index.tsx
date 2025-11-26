import BoardList from '@/components/boardList';
import { Image, StyleSheet, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('@/assets/images/Umbrella_Corporation_logo.svg.png')}
        />
      </View>
      <BoardList />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#444',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
