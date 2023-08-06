import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./TaskModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../form/TaskForm";
import {
  selectIsModalOpen,
  handleModalOpen,
} from "../../features/task/taskSlice";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}

const TaskModal: React.FC<PropTypes> = ({ task }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_title}>{task ? "Edit" : "Add"}</div>
        <TaskForm task={task} />
      </div>
    </Modal>
  );
};

export default TaskModal;
