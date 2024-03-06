const baseUrl = "https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks";

const header = {
  "Content-type": "application/json; charset=UTF-8"
}

async function getTasks() {
  const url = baseUrl + ".json"

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data);
  return data;
}

async function postTasks(categoryInput, taskInput) {
  const url = baseUrl + ".json"

  const content = {
    assigned: "",
    category: categoryInput,
    status: "to do",
    task: taskInput
  }

  const option = {
    method: "POST",
    body: JSON.stringify(content),
    headers: header
  }

  const res = await fetch(url, option);
  const data = await res.json();

  console.log(data);

}

async function patchTasks(node, assign, updateStatus) {
  const url = baseUrl + `/${node}.json`

  const content = {
    assigned: assign,
    status: updateStatus
  }

  const option = {
    method: "PATCH",
    body: JSON.stringify(content),
    headers: header
  }

  const res = await fetch(url, option);
  const data = await res.json();
  console.log(data);

}

async function deleteTasks(node) {
  const url = baseUrl + `/${node}.json`;

  const option = {
    method: "DELETE"
  }

  const res = await fetch(url, option);
  const data = await res.json();
  console.log(node + " has been deleted");
}


export { getTasks, postTasks, patchTasks, deleteTasks }