function createAndAppend(task, assigned, inputField, taskProgressing, nodeId, TaskCardStyle, container) {
  const taskP = document.createElement("p");
  taskP.innerText = task;

  const assignedP = document.createElement("p");
  assignedP.innerText = assigned;

  const inputName = document.createElement("input");
  inputName.placeholder = "Enter Name";
  inputName.id = nodeId


  const btn = document.createElement("button");
  btn.innerText = taskProgressing;
  btn.id = nodeId;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add(TaskCardStyle);

  if (inputField == null) {
    cardDiv.append(taskP, assignedP, btn);
  }
  else {
    cardDiv.append(taskP, assignedP, inputName, btn);
  }
  container.append(cardDiv);

}

export { createAndAppend }