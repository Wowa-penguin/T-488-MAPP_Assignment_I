import { StyleSheet, View } from 'react-native';

import Boards from '@/components/boards';

export default function Index() {
  return (
    <View style={styles.test}>
      <Boards name={'test'} />
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
