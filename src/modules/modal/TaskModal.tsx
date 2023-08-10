import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./TaskModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../form/TaskForm";
import {
  selectIsModalOpen,
  handleModalOpen,
  selectMode,
} from "../../features/task/taskSlice";

const TaskModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const isMode = useSelector(selectMode);

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_title}>
          {isMode === "add" ? "Add" : "Edit"}
        </div>
        <TaskForm isMode={isMode} />
      </div>
    </Modal>
  );
};

export default TaskModal;
