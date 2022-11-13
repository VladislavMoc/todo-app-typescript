import React, { useState } from 'react'
import { ITask } from './interfaces';
import TodoForm from './TodoForm'
import TodoTask from './TodoTask';

const TodoList: React.FunctionComponent = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const addTask = (task: ITask) => {
        const newTodoList = [...tasks, task];
        setTasks(newTodoList);
    }

    const completeTask = (id: number | null) => {
        let updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }
            return task
        });
        setTasks(updatedTasks);
    }

    const removeTask = (id: number) => {
        const removeList = [...tasks].filter((task) => task.id !== id)
        setTasks(removeList);
    }

    const updateTask = (taskId: number, newValue: string) => {
        let updatedTasksList = tasks.map((task) => {
            if (task.id === taskId) {
                task.text = newValue
            }
            return task
        });
        setTasks(updatedTasksList);
    }

    return (
        <div className='to-do-list'>
            <h1>Список задач</h1>
            <TodoForm onSubmit={addTask} />
            <TodoTask
                tasks={tasks}
                completeTask={completeTask}
                removeTask={removeTask}
                updateTask={updateTask}
            />
        </div>
    )
}

export default TodoList