import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, ScrollView} from 'react-native';
import data from '@/data/data.json';
import Boards from '@/components/boards'; 

type BoardType = {
    id: number;
    name: string;
    description: string;
    thumbnailPhoto: string;
};

const BoardList = () => {
    const [boards, setBoards] = useState<BoardType[]>(data.boards);

    const [id, setId] = useState(0)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailPhoto, setThumbnailPhoto] = useState('');

    const handleAddBoard = () => {
        const lastBoard = boards[boards.length - 1 ]
        setId(lastBoard.id + 1)

        if (!name.trim()) return;

        const newBoard: BoardType = {
            id,
            name,
            description,
            thumbnailPhoto,
        };

        setBoards((prev) => [...prev, newBoard]);

        setId(0);
        setName('');
        setDescription('');
        setThumbnailPhoto('');

        boards.forEach((x) => console.log(x.id))

    };

    const handleDeleteBoard = (nameToDelete: string) => {
        setBoards((prev) => prev.filter((b) => b.name !== nameToDelete));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Create new board</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Image URL'
                    value={thumbnailPhoto}
                    onChangeText={setThumbnailPhoto}
                />
                <Button title='Add board' onPress={handleAddBoard} />
            </View>

            <View style={styles.boardGrid}>
                {boards.map((board) => (
                    <Boards
                    id={board.id}
                    name={board.name}
                    description={board.description}
                    img={board.thumbnailPhoto}
                    // onDelete={() => handleDeleteBoard(board.name)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 20,
    },

    form: {
        marginBottom: 30,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        elevation: 2,
    },

    formTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
    },

    boardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default BoardList;