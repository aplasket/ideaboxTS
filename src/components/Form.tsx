import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { IToDo } from "../types/IToDo";

function Form({addToDo}: {addToDo: (todo: IToDo) => void}): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    const newToDo: IToDo = {
      text: title,
      description: description,
      completed: false,
    }

    if (title.trim() && description.trim()){
      addToDo(newToDo);
      showError(false);
      clearInput();
    } else {
      showError(true);
      clearInput();
    }
  };

  function clearInput() {
    setTitle("");
    setDescription("");
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder="Enter a todo item"
        value={title}
        onChangeText={setTitle}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={styles.inputBox}
      />
      <Button title="Add Task" onPress={handleSubmit} />

      {error && (<Text style={styles.error}>Error: all fields must be filled out</Text>)}
    </View>
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
  error: {
    padding: 10,
    color: "red"
  }
});


export default Form;