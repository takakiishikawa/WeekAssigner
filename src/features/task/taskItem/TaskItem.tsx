import React from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import styles from "./TaskItem.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  selectTask,
  handleModalOpen,
  completeTask,
  deleteTask,
  switchMode,
} from "../taskSlice";
import TaskModal from "../../../modules/modal/TaskModal";

interface taskItemProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
    estimated_time: number | null;
    link: string;
    category: string;
    assigned_date: string;
  };
}

const TaskItem = ({ task }: taskItemProps) => {
  const dispatch = useDispatch();
  const taskModalOpen = (isMode: "calendar" | "edit") => {
    return () => {
      dispatch(selectTask(task));
      dispatch(switchMode(isMode));
      dispatch(handleModalOpen(true));
    };
  };

  const completedClass = task.completed ? styles.completed : null;

  return (
    <div className={`${styles.root} ${completedClass}`}>
      <Checkbox
        checked={task.completed}
        onClick={() => dispatch(completeTask(task))}
        className={styles.checkbox}
      />
      <div className={styles.title}>
        <div className={styles.start_time}>8:00~(※ダミー)</div>

        {task.link ? (
          <a href={task.link}>
            <div className={`${styles.title_text} ${completedClass}`}>
              {task.title}
            </div>
          </a>
        ) : (
          <div className={`${styles.title_text} ${completedClass}`}>
            {task.title}
          </div>
        )}
        <div className={styles.estimated_time}>{task.estimated_time} h</div>
        <div className={styles.category}>{task.category}</div>
        <div className={styles.assigned_date}>{task.assigned_date}</div>
      </div>
      <div className={styles.right_item}>
        <button
          onClick={taskModalOpen("calendar")}
          className={styles.calendar_button}
        >
          <CalendarTodayIcon className={styles.icon} />
        </button>
        <button onClick={taskModalOpen("edit")} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task))}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <TaskModal />
    </div>
  );
};

export default TaskItem;
