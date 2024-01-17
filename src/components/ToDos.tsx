import { Button, StyleSheet, Text, View } from "react-native";

export interface IToDo {
  text: string;
  description: string;
  completed: boolean;
};

type Props = {
  toDoList: IToDo[];
  toggleComplete: (index: number) => void;
  removeItem: (index: number) => void;
};

function ToDos ({toDoList, toggleComplete, removeItem}: Props): JSX.Element {
  const ideaCards = toDoList.map((toDo: IToDo, index: number) => (
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
  ))

  return (
    <View>
      {ideaCards}
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

export default ToDos;