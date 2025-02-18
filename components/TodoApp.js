import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../redux/todoSlice';
import { actions as authActions } from '../redux/authSlice'; // Import actions từ authSlice

const TodoApp = () => {
    const [text, setText] = useState('');
    const todos = useSelector(state => state.todos);
    const user = useSelector(state => state.auth.user); // Lấy thông tin người dùng từ Redux store
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
                <Text style={[styles.todoText, item.completed && styles.completed]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => dispatch(deleteTodo(item.id))} />
        </View>
    );

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>You need to log in to access TODOs</Text>
                <Button title="Login" onPress={() => dispatch(authActions.login({ username: 'testUser' }))} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo App</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Add a new todo"
                />
                <Button title="Add" onPress={handleAddTodo} />
            </View>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Logout" onPress={() => dispatch(authActions.logout())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginRight: 10,
        borderRadius: 4,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    todoText: {
        fontSize: 16,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default TodoApp;
