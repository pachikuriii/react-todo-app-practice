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

const TODOS = [
  {content: 'Football'},
  {content: 'Baseball'},
  {content: 'Basketball'},
  {content: 'iPod Touch'},
  {content: 'iPhone 5'},
  {content: 'Nexus 7'}
];
 
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<AppTable todos={TODOS} />);