import React from "react";
import styles from "./TaskList.module.scss";
import sampleData from "./sampleData.json";
import TaskItem from "../taskItem/TaskItem";

const TaskList = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
