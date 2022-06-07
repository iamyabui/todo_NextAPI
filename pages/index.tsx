import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NewTodo_Button from '../components/atom/newTodo_button'
import Priority_Button from '../components/atom/priority_button'
import Status_Button from '../components/atom/status_button'
import Modal from '../components/modal'
import styles from '../styles/index.module.scss'
import prisma from "../lib/prisma";
import Router from 'next/router'
import Todo from "../src/types/Todo"
import Modal_Edit from '../components/modal_edit'

export async function getServerSideProps () {
  const data = await prisma.task.findMany()
  const tasks = JSON.parse(JSON.stringify(data));
  return { 
    props : { tasks }
  }
}

const Home: NextPage = ({tasks}) => {
  const [IsModal, setIsModal] = useState(false);
  const [IsModalEdit, setIsModalEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  
  const handleDelete = async(id: number) => {
    const res = await fetch("/api/deleteTodo", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.ok) {
    Router.push("/");
    } else {
    alert(JSON.stringify(json));
    }
  }

  const handleOpenModalEdit = (task: Todo) => {
    setIsModalEdit(true);
    setEditTodo(task);
  }

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="todo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
          <div className={styles.title}>Todo App</div>
          <div className={styles.newTodo}><NewTodo_Button setIsModal = {setIsModal} /></div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <td className={styles.table_title}>title</td>
                  <td className={styles.table_date}>start date</td>
                  <td className={styles.table_date}>end date</td>
                  <td className={styles.table_button}>priority</td>
                  <td className={styles.table_button}>status</td>
                  <td className={styles.table_image}></td>
                  <td className={styles.table_image}></td>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: any, index: number) => (
                  <tr key={index}>
                  <td className={styles.table_td}>{task.title}</td>
                  <td className={styles.table_td}>{task.start_date.slice(0,10)}</td>
                  <td className={styles.table_td}>{task.end_date.slice(0,10)}</td>
                  <td className={styles.table_td}><Priority_Button priority = {task.priority} /></td>
                  <td className={styles.table_td}><Status_Button status = {task.status} /></td>
                  <td className={styles.table_td} onClick={() => handleDelete(task.id)}><img src="/delete.png" width="25px" height="25px" className={styles.action_image} /></td>
                  <td className={styles.table_td} onClick={() => handleOpenModalEdit(task)}><img src="/edit.png" width="20px" height="20px" className={styles.action_image} /></td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
      </div>

      { IsModal &&  <Modal IsModal = {IsModal} setIsModal = {setIsModal} /> }
      { IsModalEdit &&  <Modal_Edit IsModalEdit = {IsModalEdit} setIsModalEdit = {setIsModalEdit} editTodo = {editTodo}/> }

    </>
  )
}

export default Home
