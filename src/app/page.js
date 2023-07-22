"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setCount1(count1 + 1);
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setCount1(count1 - 1);
    setTasks(newTasks);

    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete && taskToDelete.completed) {
      setCount2(Math.max(count2 - 1, 0));
    }
  };

  const toggleDoneTask = (taskId) => {
    const newTasks = structuredClone(tasks);

    const task = newTasks.find((x) => x.id === taskId);
    const isTaskCompleted = task.completed;
    task.completed = !task.completed;
    setTasks(newTasks);

    if (task.completed && !isTaskCompleted) {
      setCount2(count2 + 1);
    } else if (!task.completed && isTaskCompleted) {
      setCount2(Math.max(count2 - 1, 0));
    }
  };

  return (
    <div className="container mx-auto">
      <Header />

      <div style={{ maxWidth: "400px" }} className="mx-auto">
        <p className="text-center text-secondary fst-italic">
          All ({count1}) Done ({count2})
        </p>

        <TaskInput addTaskFunc={addTask} />

        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>
      <Footer
        year="2023"
        fullName="Chananchida Thawornwong"
        studentId=" 650612080"
      />
    </div>
  );
}
