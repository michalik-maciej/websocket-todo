import { useEffect, useState } from 'react'

import io from 'socket.io-client'
import shortId from 'shortid'

//const socket = io('http://localhost:8000')

const App = function () {
  const [tasks, setTasks] = useState([])
  //socket.on('updateData', (data) => setTasks(data))

  function addTask({ event, newTask }) {
    event.preventDefault()
    if (newTask !== '') {
      setTasks([...tasks, { id: shortId(), name: newTask }])
      document.getElementById('task-name').value = ''
      //socket.emit('addTask', newTask)
    }
  }

  function removeTask(taskId) {
    const filteredTasks = tasks.filter((item) => item.id !== taskId)
    setTasks(filteredTasks)
    //socket.emit('removeTask', tasks.indexOf(task))
  }

  return (
    <div className="App">
      <header>
        <h1>todo.app</h1>
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map((task) => (
              <li key={task.id} class="task">
                {task.name}
                <button
                  class="btn btn--red"
                  onClick={() => removeTask(task.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <form id="add-task-form">
            <input
              className="text-input"
              autocomplete="off"
              type="text"
              placeholder="Type your description"
              id="task-name"
            />
            <button
              className="btn"
              type="submit"
              onClick={(event) =>
                addTask({
                  event,
                  newTask: document.getElementById('task-name').value,
                })
              }
            >
              Add
            </button>
          </form>
        </section>
      </header>
    </div>
  )
}

export default App
