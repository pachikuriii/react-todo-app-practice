class TodoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "view",
      className2: "edit",
      content: this.props.todo.content
    };
  }
  render() {
    const todo = this.props.todo;
    return (
      <li>
        <div className={this.state.className}>
          <label>{ todo.content }</label>
        </div>
        <input className={this.state.className2} type="text" value={this.state.content} onChange={this.handleChange}  />
        <button className={this.state.className} onClick={() => this.edit()}>編集</button>
        <button className={this.state.className2} onClick={() => this.doneEdit(todo.id)}>変更</button>
        <button onClick={() => this.props.deleteTodo(todo.id)}>削除</button>
      </li>
    );
  }

  edit = () => {
    this.setState({ className: "edit" });
    this.setState({ className2: "view" });
  };

  doneEdit = id => {
    this.props.editTodo(id, this.state.content)
    this.setState({ className: "view" });
    this.setState({ className2: "edit" });
    this.setState({ content: this.props.todo.content });
  };

  handleChange = event => {
    const content = event.target.value;
    this.setState({ content: content });
  };
}

class TodoTable extends React.Component {
  render() {
    const rows = [];
    this.props.todos.forEach((todo) => {
      rows.push(
        <TodoRow
          todo={todo}
          key={todo.id} 
          deleteTodo={this.props.deleteTodo}
          editTodo={this.props.editTodo}
          />
      );
    });

    return (
      <ul className="todo-list">{rows}</ul>
    );
  }
}

class TodoInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }
  render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <input value={this.state.content} onChange={this.handleChange} type="text" required></input>
              <input type="submit" value="追加"></input>
          </form>
    );
  }

  handleChange = event => {
    const content = event.target.value;
    this.setState({ content: content });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addMemo(this.state.content)
    this.setState({ content: "" });
  };

}

class AppTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoStorage.fetch()
    };
  }

  addMemo = content => {
    this.state.todos.push({ id: new Date().getTime(), content: content })
    todoStorage.save(this.state.todos)
    this.setState({todos:this.state.todos});
  }

  deleteTodo = id => {
    const todo = this.state.todos.find((todo) => todo.id === id)
    const index = this.state.todos.indexOf(todo)
    const result = confirm('本当に削除しますか？')
    if (result) {
      this.state.todos.splice(index, 1)
    }
    todoStorage.save(this.state.todos)
    this.setState({ todos: this.state.todos });
  }

  editTodo = (id,content) => {
    console.log(content)
    const todo = this.state.todos.find((todo) => todo.id === id)
    const index = this.state.todos.indexOf(todo)
    this.state.todos[index].content = content
    todoStorage.save(this.state.todos)
    this.setState({ todos: this.state.todos });
  }

  render() {
    return (
      <div>
        <TodoInputForm addMemo={this.addMemo} />
        <TodoTable todos={this.state.todos} deleteTodo={this.deleteTodo} editTodo={this.editTodo} />
      </div>
    );
  };
}
 
const STORAGE_KEY = 'react-todo'
const todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<AppTable />);
