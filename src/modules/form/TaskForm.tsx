import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from "../../features/task/taskSlice";

type taskFormProps = {
  isMode: "add" | "edit" | null;
};

const TaskForm: React.FC<taskFormProps> = ({ isMode }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);

  const [formData, setFormData] = useState({
    id: selectedTask.id,
    title: selectedTask.title,
  });

  console.log(formData);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    dispatch(createTask(formData.title));
    dispatch(handleModalOpen(false));
  };

  const handleEdit = () => {
    dispatch(editTask(formData));
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <TextField
        id="outlined-basic"
        name="title"
        label={isMode === "add" ? "New Task" : "Edit Task"}
        defaultValue={isMode === "add" ? null : selectedTask.title}
        variant="outlined"
        onChange={handleChangeForm}
        className={styles.textField}
      />
      <div className={styles.button_wrapper}>
        <button
          className={styles.submit_button}
          onClick={isMode === "add" ? handleAdd : handleEdit}
        >
          Submit
        </button>
        <button
          onClick={() => dispatch(handleModalOpen(false))}
          className={styles.cancel_button}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
