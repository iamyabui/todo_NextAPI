import { PrismaClient } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { todoListState } from '../src/TodoListAtom'


// const [todoList, setTodoList] = useRecoilState(todoListState)

export default async function getStaticProps () {
    const prisma = new PrismaClient()
    const tasks = await prisma.task.findMany()
    console.log(tasks)
    // setTodoList(tasks);
    return { 
      props : { tasks }
    }
}

// getStaticProps()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })