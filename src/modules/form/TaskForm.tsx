import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";
import DaySelect from "../daySelect/DaySelect";
import {
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from "../../features/task/taskSlice";

type taskFormProps = {
  isMode: "add" | "edit" | "calendar" | null;
};

const TaskForm: React.FC<taskFormProps> = ({ isMode }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);

  const [formData, setFormData] = useState({
    id: selectedTask.id,
    title: selectedTask.title,
    memo: selectedTask.memo,
    link: selectedTask.link,
    assigned_date: selectedTask.assigned_date,
    deadline_date: selectedTask.deadline_date,
    estimated_time: selectedTask.estimated_time,
    category: selectedTask.category,
    priority: selectedTask.priority,
    regular_task: selectedTask.regular_task,
  });

  const formDataReset = {
    id: 0,
    title: "",
    memo: "",
    link: "",
    assigned_date: "",
    deadline_date: "",
    estimated_time: null,
    category: "",
    priority: false,
    regular_task: false,
  };

  console.log("formData", formData);
  console.log("selectedTask", selectedTask);

  const handleChangeForm = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChangeCheckbox = (
    event: React.ChangeEvent<{ name?: string | undefined; checked: boolean }>
  ) => {
    const { name, checked } = event.target;
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    }
  };

  const handleAdd = () => {
    dispatch(createTask(formData));
    dispatch(handleModalOpen(false));
    setFormData(formDataReset);
  };

  const handleEdit = () => {
    dispatch(editTask(formData));
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <div className={styles.field_wrapper}>
        <TextField
          id="outlined-basic"
          name="title"
          label="title"
          variant="outlined"
          defaultValue={selectedTask.title}
          onChange={handleChangeForm}
          className={styles.textField}
        />
        <TextField
          id="outlined-basic"
          name="memo"
          label="memo"
          variant="outlined"
          defaultValue={selectedTask.memo}
          onChange={handleChangeForm}
          className={styles.textField}
        />
        <TextField
          id="outlined-basic"
          name="link"
          label="link"
          variant="outlined"
          defaultValue={selectedTask.link}
          onChange={handleChangeForm}
          className={styles.textField}
        />
        <DaySelect
          name="assigned_date"
          defaultValue={selectedTask.assigned_date}
          onChange={handleChangeForm}
        />
        <DaySelect
          name="deadline_date"
          defaultValue={selectedTask.deadline_date}
          onChange={handleChangeForm}
        />
        <TextField
          id="outlined-basic"
          name="estimated_time"
          label="estimated_time"
          type="number"
          variant="outlined"
          defaultValue={selectedTask.estimated_time}
          onChange={handleChangeForm}
          className={styles.textField}
        />

        <Select
          name="category"
          defaultValue={selectedTask.category}
          onChange={handleChangeForm}
        >
          <MenuItem value="Dev">Dev</MenuItem>
          <MenuItem value="Ops">Ops</MenuItem>
        </Select>
        <FormControlLabel
          label="priority"
          control={
            <Checkbox
              name="priority"
              checked={formData.priority}
              onChange={handleChangeCheckbox}
              className={styles.textField}
            />
          }
        />
        <FormControlLabel
          label="regular_task"
          control={
            <Checkbox
              name="regular_task"
              checked={selectedTask.regular_task}
              onChange={handleChangeCheckbox}
              className={styles.textField}
            />
          }
        />
      </div>
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
