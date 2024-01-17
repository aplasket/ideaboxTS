import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";

interface IToDo {
  text: string;
  description: string;
  completed: boolean;
}

export default function App() {
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    const newToDo: IToDo = {
      text: titleValue,
      description: descriptionValue,
      completed: false,
    }

    if (titleValue.trim() && descriptionValue.trim())
      setToDos([...toDoList, newToDo]);
    else showError(true);
    setTitleValue("");
    setDescriptionValue("");
  };

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
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter a todo item"
          value={titleValue}
          onChangeText={setTitleValue}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Enter description"
          value={descriptionValue}
          onChangeText={setDescriptionValue}
          style={styles.inputBox}
        />
        <Button title="Add Task" onPress={handleSubmit} />
      </View>
      {error && (<Text style={styles.error}>Error: all fields must be filled out</Text>)}
      <Text style={styles.subtitle}> Your Tasks: </Text>
      {!toDoList.length && <Text>No to do tasks available</Text>}
      {toDoList.map((toDo: IToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text style={[styles.task, {textDecorationLine: toDo.completed ? "line-through" : "none" }]}>
            {toDo.text}: {toDo.description}
          </Text>
          <Button
            title={ toDo.completed ? "Completed" : "Complete" }
            onPress={() => toggleComplete(index)}
          />
          <Button
            title="X"
            onPress={()=> removeItem(index)}
            color="crimson"
          />
        </View>
      ))}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    padding: 12,
    marginBottom: 8
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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  task: {
    width: 200
  },
  error: {
    color: "red"
  }
});