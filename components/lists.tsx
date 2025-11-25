import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


type ListProps = {
  name: string;
  id: number;
  color: string;
  boardId: number;
};


const Lists = ({ name, color}: ListProps) => {
  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name.toUpperCase()}</Text>
      </View>

      <View style={[styles.card, {backgroundColor: color}]}>
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
  },
  
  card: {
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ffffffff',
    marginBottom: 8,
  },
});

export default Lists;
