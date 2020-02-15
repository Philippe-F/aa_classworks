const addTodo = (e) => {
  e.preventDefault();
  // grab onto the input with the correct name
  const text = document.querySelector('[name=add-todo]').value;
  const todo = {
    text,
    done: false
  };
}

