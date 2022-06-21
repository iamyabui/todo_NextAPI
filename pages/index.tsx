import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NewTodo_Button from '../components/atom/newTodo_button'
import Modal from '../components/modal'
import styles from '../styles/index.module.scss'
import prisma from "../lib/prisma";
import Router from 'next/router'
import Todo from "../src/types/Todo"
import Modal_Edit from '../components/modal_edit'
import Priority_PullDown from '../components/atom/priority_pulldown'
import Status_PullDown from '../components/atom/status_pulldown'

export async function getServerSideProps () {
  const data = await prisma.task.findMany()
  const tasks = JSON.parse(JSON.stringify(data)).sort((a: Todo, b:Todo) => {
    return (a.id < b.id) ? -1 : 1;
  });
  return { 
    props : { tasks }
  }
}

export default function Session(props: any) {
  const { tasks } = props;
  const { data: session } = useSession()
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

  if (session) {
    return (
      <>
        <header className={styles.header}>
          <p>Hi {session.user?.name} !</p>
          <button onClick={() => signOut()}>Sign out</button>
        </header>
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
                    <td className={styles.table_td}><Priority_PullDown priority = {task.priority} todo = {task} /></td>
                    <td className={styles.table_td}><Status_PullDown status = {task.status} todo = {task} /></td>
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
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
