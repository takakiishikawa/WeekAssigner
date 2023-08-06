import React from "react";
import styles from "./App.module.scss";
import Header from "./modules/header/Header";
import TaskList from "./features/task/taskList/TaskList";

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
