import { prisma } from '../lib/prisma'

async function main() {
    await prisma.task.create({
        data: {
            title: "test1",
            detail: "input test1 data",
        }
    })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })