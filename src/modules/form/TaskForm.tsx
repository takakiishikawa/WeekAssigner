import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from "../../features/task/taskSlice";

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
  task: { id: number; title: string; completed: boolean };
};

const TaskForm: React.FC<PropTypes> = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };

  const handleEdit = (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={task ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={task ? "Edit Task" : "New Task"}
          defaultValue={task ? selectedTask.title : null}
          variant="outlined"
          {...register("taskTitle")}
          className={styles.textField}
        />
        <div className={styles.button_wrapper}>
          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => dispatch(handleModalOpen(false))}
            className={styles.cancel_button}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
