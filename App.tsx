import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";
import Form from "./src/components/Form";
import ToDos from "./src/components/ToDos";
import { IToDo } from "./src/types/IToDo";

export default function App() {
  const [toDoList, setToDos] = useState<IToDo[]>([]);

  const addToDo = (newToDo: IToDo) =>{
    setToDos([...toDoList, newToDo]);
  }

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <View>
        <Form addToDo={addToDo} />
      </View>
      <Text style={styles.subtitle}> Your Tasks: </Text>
      {!toDoList.length && <Text>No to do tasks available</Text>}
      <ToDos toDoList={toDoList} toggleComplete={toggleComplete} removeItem={removeItem}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
});