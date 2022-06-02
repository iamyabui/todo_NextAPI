
import { useState } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'
import Todo from '../src/types/Todo';
import styles from '../styles/index.module.scss'
import prisma from '../lib/prisma'
import { getServerSideProps } from '../pages';
import type { NextApiHandler } from 'next';

export default function Modal (props: any) {

    const { IsModal, setIsModal } = props;
    const [ todo, setTodo ] = useState<Todo>({
        id: 0,
        title: "",
        detail: "",
        start_date: "",
        end_date: "",
        priority: "",
    })

    const handleCloseModal = () => {
        setIsModal(false);
    }

    // const handleSaveTodo: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        const handleSaveTodo = async () => {
        console.log(todo)
        // try {
            await prisma.task.create({
                data: {
                    title: todo.title,
                    detail: todo.detail,
                    start_date: todo.start_date,
                    end_date: todo.end_date,
                    priority: todo.priority,
                }
            })
            // res.status(200).send("ok");
        // } catch (error) {
        //     alert("I couldn't save new todo, sorry.");
        //     res.status(500).json(error)
        // }

        await getServerSideProps();
        setIsModal(false);
    }


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
                <input type="date" className={styles.date_form}  onChange={(e) => (setTodo({...todo, start_date: e.target.value}))}></input>
                </div>

                <div className={styles.date_box}>
                <p className={styles.todo_label}>End Date</p>
                <input type="date" className={styles.date_form} onChange={(e) => (setTodo({...todo, end_date: e.target.value}))}></input>
                </div>
            </div>

            <button className={styles.modal_save_button} onClick={() => handleSaveTodo()}>Save</button>

        </div>
    )
}