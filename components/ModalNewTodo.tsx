
import { Dispatch, SetStateAction, useState } from 'react';
import styles from '../styles/index.module.scss'
import Router from 'next/router';

type Props = {
    setIsModal: Dispatch<SetStateAction<boolean>>
    user_email: string | undefined | null
}

const ModalNewTodo: React.FC<Props> = (props) => {

    const { setIsModal, user_email } = props;
    let today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const default_date = `${year}-${month}-${date}T00:00:00.000Z`;

    const [ todo, setTodo ] = useState({
        title: "",
        detail: "",
        start_date: default_date,
        end_date: default_date,
        priority: "Low",
        user_email: user_email,
    });

    const handleCloseModal = () => {
        setIsModal(false);
    }

    const handleSaveTodo = async () => {
        const res = await fetch("/api/createTodo", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();
        if (json.ok) {
        Router.push("/");
        setIsModal(false);
        } else {
        alert(JSON.stringify(json));
        }
    };


    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <p className={styles.name}>New Todo</p>
                <p className={styles.close} onClick={() => handleCloseModal()}>✗</p>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Title</p>
                <input type="text" className={styles.todo_form} onChange={(e) => (setTodo({...todo, title: e.target.value}))}></input>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Detail</p>
                <textarea className={styles.detail_form} onChange={(e) => (setTodo({...todo, detail: e.target.value}))}></textarea>
            </div>

            <div className={styles.date_box}>
                <p className={styles.todo_label}>priority</p>
                <select className={styles.date_form} onChange={(e) => (setTodo({...todo, detail: e.target.value}))}>
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className={styles.date_flex}>
                <div className={styles.date_box}>
                <p className={styles.todo_label}>Start Date</p>
                <input type="date" className={styles.date_form} onChange={(e) => (setTodo({...todo, start_date: `${e.target.value}T00:00:00.000Z`}))}></input>
                </div>

                <div className={styles.date_box}>
                <p className={styles.todo_label}>End Date</p>
                <input type="date" className={styles.date_form} onChange={(e) => (setTodo({...todo, end_date: `${e.target.value}T00:00:00.000Z`}))}></input>
                </div>
            </div>

            <button className={styles.modal_save_button} onClick={() => handleSaveTodo()}>Save</button>

        </div>
    )
}

export default ModalNewTodo;