import React from "react";
import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";

type Inputs = {
  taskTitle: string;
};

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const handleCreate = (data: Inputs) => {
    void console.log(data);
    reset();
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          {...register("taskTitle")}
          className={styles.textField}
        />
      </form>
    </div>
  );
};

export default TaskForm;
