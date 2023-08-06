import React from "react";
import styles from "./App.module.scss";
import Header from "./components/header/Header";
import TaskForm from "./features/task/taskForm/TaskForm";
import TaskList from "./features/task/taskList/TaskList";

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskList />
        <TaskForm />
      </div>
    </div>
  );
};

export default App;
