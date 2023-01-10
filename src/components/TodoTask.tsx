import React, { useState, useContext } from 'react'
import { ITask } from './interfaces'
import TodoForm from './TodoForm'
import { MdOutlineClose } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import {TasksContext} from './TodoList'

type TodoTaskProps = {
    //tasks: ITask[]
    completeTask(id: number|null): void
    removeTask(id: number|null): void
    updateTask(taskId: number|null, newValue: string): void
}

const TodoTask: React.FC<TodoTaskProps> = ({ /* tasks, */ completeTask, removeTask, updateTask }) => {
    const newtasks = useContext(TasksContext);
    const [editTask, setEditTask] = useState<ITask>({
        id: null,
        text: '',
        isComplete: false
    });

    const submitUpdate = (updTask: ITask) => {
        updateTask(editTask.id, updTask.text)
        setEditTask({
            id: null,
            text: '',
            isComplete: false
        })
    };

    if (editTask.id) {
        return <TodoForm editTask={editTask} onSubmit={submitUpdate} />
    };

    return (
        <div>
            <div className='tasks-to-be-done'>
                {newtasks.map((task, index) => (
                    <div className={task.isComplete ? 'taskItem complete hidden' : 'taskItem'} key={index}>
                        <div className="task-info">
                            <input
                                type='checkbox'
                                onChange={() => completeTask(task.id)}
                                checked={task.isComplete} />
                            <div key={task.id} className="task-description">
                                {task.text}
                            </div>
                        </div>
                        <div className='icons'>
                            <MdOutlineClose
                                onClick={() => removeTask(task.id)}
                                className='delete-task-icon'
                            />
                            <BiEditAlt
                                onClick={() => setEditTask({
                                    id: task.id,
                                    text: task.text,
                                    isComplete: task.isComplete
                                })}
                                className='edit-task-icon'
                            />
                        </div>
                    </div>
                )
                )}
            </div>
            <div className='tasks-completed'>
                <h2>Выполненные задачи</h2>
                {newtasks.map((task, index) => (
                    <div className={task.isComplete ? 'taskItem complete' : 'taskItem hidden'} key={index}>
                        <div className="task-info">
                            <input
                                type='checkbox'
                                onChange={() => completeTask(task.id)}
                                checked={task.isComplete} />
                            <div key={task.id} className="task-description">
                                {task.text}
                            </div>
                        </div>
                        <div className='icons'>
                            <MdOutlineClose
                                onClick={() => removeTask(task.id)}
                                className='delete-task-icon'
                            />
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default TodoTask