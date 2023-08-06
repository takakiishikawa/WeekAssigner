import React from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import styles from "./TaskItem.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  selectTask,
  handleModalOpen,
  completeTask,
  deleteTask,
  selectMode,
} from "../taskSlice";
import TaskModal from "../../../modules/modal/TaskModal";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem = ({ task }: PropTypes) => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(selectMode("edit"));
    dispatch(handleModalOpen(true));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={() => dispatch(completeTask(task))}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task))}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <TaskModal task={task} />
    </div>
  );
};

export default TaskItem;
