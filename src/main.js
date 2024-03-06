import { createAndAppend } from "./modules/display.js";
import { deleteTasks, getTasks, patchTasks, postTasks } from "./modules/fetch.js";

const form = document.querySelector("form");
const toDoContainer = document.querySelector("#toDo");
const inProgressContainer = document.querySelector("#inProgress");
const doneContainer = document.querySelector("#done");

getTasks().then(data => {
  console.log(data);

  for (const task in data) {
    let TaskCardStyle;
    if (data[task].category == "ux") {
      TaskCardStyle = "uxTask"
    }
    else if (data[task].category == "dev backend") {
      TaskCardStyle = "backDevTask"
    }
    else if (data[task].category == "dev frontend") {
      TaskCardStyle = "frontDevTask"
    }

    if (data[task].status == "to do") {
      let inputField = document.createElement("input");
      // inputField.setAttribute("required", "")
      createAndAppend(data[task].task, data[task].assigned, inputField, "Assign>>", task, TaskCardStyle, toDoContainer)

      inputField.id = task
      toDoContainer.addEventListener("click", ({ target }) => {

        if (target.innerText == "Assign>>" && task == target.id) {
          let inputValue = document.getElementById(task).value;
          if (inputValue.length > 2) {
            patchTasks(task, "-" + inputValue, "in progress").then(() => {
              window.location.reload();
            }).catch(e => console.log(e));
          }
          else {
            alert("please enter a name!")
          }
        }
      })
    }
    else if (data[task].status == "in progress") {
      createAndAppend(data[task].task, data[task].assigned, null, "Done>>", task, TaskCardStyle, inProgressContainer);

      inProgressContainer.addEventListener("click", ({ target }) => {
        if (target.innerText == "Done>>" && task == target.id) {
          patchTasks(task, data[task].assigned, "done").then(() => {
            window.location.reload();
          }).catch(e => console.log(e));

        }
      })
    }
    else if (data[task].status == "done") {
      createAndAppend(data[task].task, data[task].assigned, null, "Remove X", task, TaskCardStyle, doneContainer)

      doneContainer.addEventListener("click", ({ target }) => {
        if (target.innerText == "Remove X" && task == target.id) {
          deleteTasks(task).then(() => {
            window.location.reload();
          }).catch(e => console.log(e));
        }
      })
    }
  }
})


form.addEventListener("submit", (event) => {
  event.preventDefault();

  let category = document.querySelector("#category").value;
  let task = document.querySelector("#taskInput").value;
  form.reset()

  console.log(category, task);
  postTasks(category, task).then(() => {
    window.location.reload();
  }).catch(e => console.log(e));
})

