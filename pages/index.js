import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/Todocounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupselector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;
    const cardDate = new Date(date);
    cardDate.setMinutes(cardDate.getMinutes() + cardDate.getTimezoneOffset());
    const id = uuidv4();
    renderTodo(name, cardDate, id);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const newTodo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    const newTodoElement = newTodo.getView();
    section.addItem(newTodoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const renderTodo = (name, date, id) => {
  const todo = generateTodo({ name, date, id });
  section.addItem(todo);
  todoCounter.updateTotal(true);
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
