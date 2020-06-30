import React, { Component } from "react";

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false },
      ],
      newTask: "",
    };
  }

  handleSubmit(event) {
    const taskId = this.state.tasks.length + 1;
    if (this.state.newTask.length !== 0){
      this.setState({
        tasks: [
          ...this.state.tasks,
          { id: taskId, name: this.state.newTask, done: false },
        ],
        newTask: "",
      });
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      newTask: event.target.value,
    });
  }

  handleClick(id, event) {
    this.setState({
      task: this.state.tasks.map((task) => {
        if (task.id === id) {
          return {
            id: task.id,
            name: task.name,
            done: task.done === true ? task.done = false : task.done = true,
          };
        } else {
          return { id: task.id, name: task.name, done: task.done };
        }
      }),
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task) => (
              <li
                className={task.done === true ? "done" : ""}
                onClick={(e) => this.handleClick(task.id, e)}
                key={task.id}
              >
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="new-task"
              className={this.state.newTask.length === 0 ? 'error' : null}
              onChange={this.handleChange}
              placeholder="Ingresa una tarea y oprime Enter"
              value={this.state.newTask}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
