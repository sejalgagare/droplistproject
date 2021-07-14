const state = {
  itemList: [],
  priority: "high",
  todoNum: 0,
};

const itemInput = document.querySelector(".list-input>input");
const priorityInput = document.querySelector("select");
const addButton = document.querySelector(".add-button ");
const itemList = document.querySelector(".list");
const buttons = document.querySelector(".buttons");

function addItemHandler(event) {
  let value = itemInput.value;
  if (value !== "") {
    state.itemList.unshift({
      value: value,
      priority: state.priority,
      checked: false,
    });
    state.todoNum += 1;
    loadItemHandler(state.itemList);
    loadTodoNumHandler(state.todoNum);
  }
}

function loadTodoNumHandler(todoNum) {
  let todoNumElement = document.querySelector(".title>span");
  todoNumElement.innerHTML = todoNum;
}

function loadItemHandler(items) {
  let list = items.map((item, i) => {
    return `<div class="list-item ${item.priority}" listId=${i}>
                  <div class="checkbox">
                      <input type="checkbox" checkboxId=${i} ${
      item.checked ? "checked" : ""
    } />
                  </div>
                  <div class="item-name ${
                    item.checked ? "item-done" : ""
                  }" itemNameId=${i}>${item.value}</div>
                  <div class="item-delete" deleteId=${i}>
                      <span class="material-icons delete" deleteId=${i}>delete</span>
                  </div>
              </div>`;
  });
  itemList.innerHTML = list.join(" ");
}

function priorityChangeHandler(event) {
  let value = event.target.value;
  if (state.priority != value) {
    state.priority = value;
  }
}

function onListClickHandler(event) {
  let target = event.target;
  if (target.getAttribute("type") === "checkbox") {
    let id = target.getAttribute("checkboxId");
    let isChecked = target.checked;

    onCheckHandler(id, isChecked);
  } else if (
    target.classList.contains("item-delete") ||
    target.classList.contains("delete")
  ) {
    let id = target.getAttribute("deleteId");

    onDeleteHandler(id);
  }
}

function onCheckHandler(id, isChecked) {
  let target = document.querySelector(`[itemNameId="${id}"]`);

  if (isChecked) {
    target.classList.add("item-done");
    state.itemList[id].checked = true;
    state.todoNum -= 1;
  } else {
    target.classList.remove("item-done");
    state.itemList[id].checked = false;
    state.todoNum += 1;
  }
  loadTodoNumHandler(state.todoNum);
}

function onDeleteHandler(id) {
  let target = document.querySelector(`[listId="${id}"]`);
  target.remove();
  if (state.itemList[id].checked === false) {
    state.todoNum -= 1;
  }
  state.itemList.splice(id, 1);
  loadItemHandler(state.itemList);
  loadTodoNumHandler(state.todoNum);
}

function onButtonClickHandler(event) {
  if (event.target.classList.contains("button")) {
    let unSelected = document.querySelector(".selected");
    unSelected.classList.remove("selected");
    unSelected.classList.add("unselected");

    let selected = event.target;
    selected.classList.remove("unselected");
    selected.classList.add("selected");

    loadSelectedListHandler(selected.classList[0]);
  }
}

function loadSelectedListHandler(priority) {
  if (priority === "all") {
    loadItemHandler(state.itemList);
  } else {
    let updatedList = state.itemList.filter(
      (item) => item.priority === priority
    );
    loadItemHandler(updatedList);
  }
}

addButton.addEventListener("click", addItemHandler);
priorityInput.addEventListener("change", priorityChangeHandler);
itemList.addEventListener("click", onListClickHandler);
buttons.addEventListener("click", onButtonClickHandler);
