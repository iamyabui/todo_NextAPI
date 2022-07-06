import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from 'react'
import Head from 'next/head'
import NewTodoButton from '../components/atom/NewTodoButton'
import styles from '../styles/index.module.scss'
import prisma from "../lib/prisma";
import Router from 'next/router'
import Todo from "../src/types/Todo"
import ModalEdit from '../components/ModalEdit'
import PriorityPullDown from '../components/atom/PriorityPulldown'
import StatusPullDown from '../components/atom/StatusPulldown'
import ModalNewTodo from "../components/ModalNewTodo";

export async function getServerSideProps () {

  const data = await prisma.task.findMany({
    orderBy: [
      {
        id: `desc`,
      }
    ]
  })
  const tasks: Todo[] = JSON.parse(JSON.stringify(data))
  return { 
    props : { tasks }
  }
}

type Props = {
  tasks: Todo[]
}

const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;
  const { data: session } = useSession()
  const user_email = session?.user?.email;
  const [IsModal, setIsModal] = useState(false);
  const [IsModalEdit, setIsModalEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({
        id: 0,
        title: "",
        detail: "",
        start_date: "",
        end_date: "",
        priority: "",
        status: "",
        user_email: "",
  });

  const LoginUserTask = tasks.filter(function(task: Todo) {
    return task.user_email == user_email
  })

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
    {session && (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="todo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <p>Hi {session?.user?.name} !</p>
        <button onClick={() => signOut()}>Sign out</button>
      </header>

      <div className={styles.main}>
        <div className={styles.title}>Todo App</div>
        <div className={styles.newTodo}><NewTodoButton setIsModal = {setIsModal} /></div>
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
              {LoginUserTask.map((task: any, index: number) => (
                <tr key={index}>
                <td className={styles.table_td}>{task.title}</td>
                <td className={styles.table_td}>{task.start_date.slice(0,10)}</td>
                <td className={styles.table_td}>{task.end_date.slice(0,10)}</td>
                <td className={styles.table_td}>
                  <PriorityPullDown priority = {task.priority} todo = {task} />
                </td>
                <td className={styles.table_td}>
                  <StatusPullDown status = {task.status} todo = {task} />
                </td>
                <td className={styles.table_td} onClick={() => handleDelete(task.id)}>
                  <img src="/delete.png" width="25px" height="25px" className={styles.action_image} />
                </td>
                <td className={styles.table_td} onClick={() => handleOpenModalEdit(task)}>
                  <img src="/edit.png" width="20px" height="20px" className={styles.action_image} />
                </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>

      { IsModal &&  <ModalNewTodo setIsModal = {setIsModal} user_email = {user_email} /> }
      { IsModalEdit &&  <ModalEdit setIsModalEdit = {setIsModalEdit} editTodo = {editTodo}/> }
    </>
    )}

    {!session && (
      <div className={styles.signOut_display}>
        <p>Welcome to Todo List application!!</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )}
    </>
  )
}

export default TodoList
