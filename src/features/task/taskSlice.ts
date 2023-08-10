import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  memo: string;
  link: string;
  assigned_date: string;
  deadline_date: string;
  estimated_time: number | null;
  category: string;
  priority: boolean;
  regular_task: boolean;
};

interface TaskState {
  //task数の管理
  idCount: number;
  //storeに保存するタスク一覧
  tasks: Task[];
  //filetered
  filteredTasks: Task[];
  //taskのtitleを編集する際に、どのtaskが選択されているか
  selectedTask: Task;
  //Modalを開ける/閉じる
  isModalOpen: boolean;
  mode: "edit" | "add" | "calendar" | null; // spelling fixed
}

const initialTask: Task = {
  id: 1,
  completed: false,
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

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ ...initialTask }],
  filteredTasks: [{ ...initialTask }],
  selectedTask: initialTask,
  isModalOpen: false,
  mode: null,
};

const getDayLabel = (): string => {
  const todayIndex = new Date().getDay();
  switch (todayIndex) {
    case 0:
    case 6:
      return "Next Week";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    default:
      return "Next Week";
  }
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
        completed: false,
        title: action.payload.title,
        memo: action.payload.memo,
        link: action.payload.link,
        assigned_date: action.payload.assigned_date,
        deadline_date: action.payload.deadline_date,
        estimated_time: action.payload.estimated_time,
        category: action.payload.category,
        priority: action.payload.priority,
        regular_task: action.payload.regular_task,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //taskの編集
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのプロパティを変更する
        task.title = action.payload.title;
        task.memo = action.payload.memo;
        task.link = action.payload.link;
        task.assigned_date = action.payload.assigned_date;
        task.deadline_date = action.payload.deadline_date;
        task.estimated_time = action.payload.estimated_time;
        task.category = action.payload.category;
        task.priority = action.payload.priority;
        task.regular_task = action.payload.regular_task;
      }
    },
    editcalendar: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.assigned_date = action.payload.assigned_date;
        task.deadline_date = action.payload.deadline_date;
      }
    },
    filterTasks: (state, action) => {
      const { period, category } = action.payload;
      const allTasks = state.tasks;

      let fileteredByPeriod: Task[] = [];

      if (period === "today") {
        fileteredByPeriod = allTasks.filter(
          (task) => task.assigned_date === getDayLabel()
        );
      } else if (period === "week") {
        fileteredByPeriod = allTasks;
      }
      const finalFilteredTasks =
        category === "all"
          ? fileteredByPeriod
          : fileteredByPeriod.filter((task) => task.category === category);

      state.filteredTasks = finalFilteredTasks;
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
    switchMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  createTask,
  editTask,
  editcalendar,
  selectTask,
  filterTasks,
  handleModalOpen,
  completeTask,
  deleteTask,
  switchMode,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export const selectMode = (state: RootState): TaskState["mode"] =>
  state.task.mode;

export const filteredTasks = (state: RootState): TaskState["filteredTasks"] =>
  state.task.filteredTasks;

export default taskSlice.reducer;
