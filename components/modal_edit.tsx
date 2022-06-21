
import { useState } from 'react';
import styles from '../styles/index.module.scss'
import Router from 'next/router';
import Todo from '../src/types/Todo';

export default function Modal_Edit (props: any) {

    const { IsModalEdit, setIsModalEdit, editTodo } = props;

    const [ todo, setTodo ] = useState({
        id: editTodo.id,
        title: editTodo.title,
        detail: editTodo.detail,
        start_date: editTodo.start_date,
        end_date: editTodo.end_date,
        priority: editTodo.priority,
        user_email: editTodo.user_email,
    });

    const handleCloseModal = () => {
        setIsModalEdit(false);
    }

    const handleUpdate = async(todo: Todo) => {
    const res = await fetch("/api/updateTodo", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await res.json();
    if (json.ok) {
    Router.push("/");
    setIsModalEdit(false);
    } else {
    alert(JSON.stringify(json));
    }
  }



    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <p className={styles.name}>New Todo</p>
                <p className={styles.close} onClick={() => handleCloseModal()}>✗</p>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Title</p>
                <input type="text" className={styles.todo_form} value={todo.title} onChange={(e) => (setTodo({...todo, title: e.target.value}))}></input>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Detail</p>
                <textarea className={styles.detail_form} value={todo.detail} onChange={(e) => (setTodo({...todo, detail: e.target.value}))}></textarea>
            </div>

            <div className={styles.date_box}>
                <p className={styles.todo_label}>priority</p>
                <select className={styles.date_form} value={todo.priority} onChange={(e) => (setTodo({...todo, priority: e.target.value}))}>
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className={styles.date_flex}>
                <div className={styles.date_box}>
                <p className={styles.todo_label}>Start Date</p>
                <input type="date" className={styles.date_form} value={todo.start_date.slice(0,10)} onChange={(e) => (setTodo({...todo, start_date: `${e.target.value}T00:00:00.000Z`}))}></input>
                </div>

                <div className={styles.date_box}>
                <p className={styles.todo_label}>End Date</p>
                <input type="date" className={styles.date_form} value={todo.end_date.slice(0,10)} onChange={(e) => (setTodo({...todo, end_date: `${e.target.value}T00:00:00.000Z`}))}></input>
                </div>
            </div>

            <button className={styles.modal_save_button} onClick={() => handleUpdate(todo)}>Update</button>

        </div>
    )
}