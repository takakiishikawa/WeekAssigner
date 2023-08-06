import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface TaskState {
  //task数の管理
  idCount: number;
  //storeに保存するタスク一覧
  tasks: { id: number; title: string; completed: boolean }[];
  //taskのtitleを編集する際に、どのtaskが選択されているか
  selectedTask: { id: number; title: string; completed: boolean };
  //Modalを開ける/閉じる
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "taskA", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //add task
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //taskの編集
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのtitleを書き換える
        task.title = action.payload.title;
      }
    },
    //どのtaskを選択しているか管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //modal of open or close
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    //task完了/未完了
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    //task削除
    deleteTask: (state, action) => {
      //taskを削除した上で、tasksを新規作成
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const {
  createTask,
  editTask,
  selectTask,
  handleModalOpen,
  completeTask,
  deleteTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
