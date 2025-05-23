class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._completed = data.completed;
  }

  _setEventListeners() {
    this.todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._todoElement.remove();
    });
    this.todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheck(this._data.completed);
    });
  }

  _generateCheckboxEl() {
    this.todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    this.todoCheckboxEl.checked = this._data.completed;
    this.todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this.todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._generateCheckboxEl();
    this._setEventListeners();
    return this._todoElement;
  }
}

export default Todo;
