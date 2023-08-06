import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, selectTask, handleModalOpen } from "../taskSlice";
import styles from "./TaskList.module.scss";
import TaskItem from "../taskItem/TaskItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(handleModalOpen(true));
  };

  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <button onClick={handleOpen} className={styles.add}>
        <AddCircleIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default TaskList;
