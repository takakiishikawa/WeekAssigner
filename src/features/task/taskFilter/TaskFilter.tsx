import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterTasks } from "../taskSlice";
import styles from "./TaskFilter.module.scss";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const handleSwitchPeriod = (value: string) => {
    console.log(1);
    console.log(2);

    setPeriod(value);
    console.log(period, category);

    dispatch(filterTasks({ period, category }));
  };

  const handleSwitchCategory = (value: string) => {
    console.log(1);
    console.log(2);

    setCategory(value);
    console.log(period, category);

    dispatch(filterTasks({ period, category }));
  };

  return (
    <div>
      {/* 日付スイッチ */}
      <button onClick={() => handleSwitchPeriod("today")}>Today</button>
      <button onClick={() => handleSwitchPeriod("week")}>Week</button>

      {/* カテゴリースイッチ */}
      <button onClick={() => handleSwitchCategory("dev")}>Dev</button>
      <button onClick={() => handleSwitchCategory("ops")}>Ops</button>
      <button onClick={() => handleSwitchCategory("all")}>All</button>
    </div>
  );
};

export default TaskFilter;
