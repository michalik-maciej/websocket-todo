import io from 'socket.io-client'

export const socket = io('http://localhost:8000')
export let clientTasks

socket.on('updateData', (tasks) => {
  console.log('server send updateData ', tasks)
  clientTasks = tasks
})
