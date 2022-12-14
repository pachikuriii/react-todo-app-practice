class TodoRow extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li>{todo.content}
      <button>編集</button>
      <button>削除</button>
      </li>
    );
  }
}

class TodoTable extends React.Component {
  render() {
    const rows = [];
    this.props.todos.forEach((todo) => {
      rows.push(
        <TodoRow
          todo={todo}
          key={todo.id} />
      );
    });

    return (
        <ul>{rows}</ul>
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

  render() {
    return (
      <div>
        <TodoInputForm addMemo={this.addMemo} />
        <TodoTable todos={this.state.todos} />
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
