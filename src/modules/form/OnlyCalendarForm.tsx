import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import DaySelect from "../daySelect/DaySelect";
import {
  editcalendar,
  handleModalOpen,
  selectSelectedTask,
} from "../../features/task/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);

  const [formData, setFormData] = useState({
    id: selectedTask.id,
    assigned_date: selectedTask.assigned_date,
    deadline_date: selectedTask.deadline_date,
  });

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

  const handleEdit = () => {
    dispatch(editcalendar(formData));
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <div className={styles.field_wrapper}>
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
      </div>
      <div className={styles.button_wrapper}>
        <button className={styles.submit_button} onClick={handleEdit}>
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
