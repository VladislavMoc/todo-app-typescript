import React, { useState, useEffect, useRef } from 'react'
import { ITask } from './interfaces';

interface TodoFormProps {
    onSubmit(task: ITask): void;
    editTask?: ITask
}

const TodoForm: React.FunctionComponent<TodoFormProps> = (props) => {
    const [input, setInput] = useState<string>(props.editTask ? props.editTask.text : '');

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        inputRef.current!.focus();
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit({
            id: props.editTask ? props.editTask.id : Math.floor(Math.random() * 10000),
            text: input,
            isComplete: false
        })
        setInput('');
    }

    const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            className='task-input-form'
            onSubmit={handleSubmit}
        >
            <textarea
                value={input}
                onChange={handleChange}
                placeholder={(props.editTask) ? 'Внесите корректировку в задачу' : 'Введите новую задачу'}
                name='text'
                ref={inputRef}
                onKeyPress={handleUserKeyPress}
            >
            </textarea>
            <input
                type='submit'
                className='task-submit-button'
                value={(props.editTask) ? 'Добавить корректировку' : 'Добавить задачу'}
            />
        </form >
    )
}

export default TodoForm