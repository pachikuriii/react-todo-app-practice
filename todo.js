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
          key={todo.content} />
      );
    });

    return (
        <ul>{rows}</ul>
    );
  }
}

class TodoInputForm extends React.Component {
  render() {
      return (
          <form>
              <input type="text" name="content" id="content" required></input>
              <input type="submit" value="追加"></input>
          </form>
    );
  }
}

class AppTable extends React.Component {
  render() {
    return (
      <div>
        <TodoInputForm />
        <TodoTable todos={this.props.todos} />
      </div>
    );
  }
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
root.render(<AppTable todos={todoStorage.fetch()} />);