import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, handleModalOpen, switchMode } from "../taskSlice";
import styles from "./TaskList.module.scss";
import TaskItem from "../taskItem/TaskItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//import { filterTasks } from "../taskSlice";
import TaskFilter from "../taskFilter/TaskFilter";

const TaskList = () => {
  const filteredTasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(handleModalOpen(true));
    dispatch(switchMode("add"));
  };

  /*　後で実装する
  useEffect(() => {
    const today = new Date().getDay();
    dispatch(filterTasks(today));
  }, [dispatch]);
  */

  return (
    <div>
      <div className={styles.root}>
        <TaskFilter />
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleOpen} className={styles.add_button}>
          <AddCircleIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
