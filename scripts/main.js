window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");

inputBtn.addEventListener("click",function(){

    //create divs for grid inside each list item
    //this has the task value
    var leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    //this will be for buttons
    var rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    //create list element for new task
    var task = document.createElement("li");
    task.classList.add("grid");
    //take value from the input box, display in the left
    var inputValue = input.value;
    if(inputValue == ""){
        alert("please enter a task");
        return;
    }
    leftDiv.innerHTML = inputValue;
    input.value = "";

    //delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "<i class=\"far fa-times-circle\"></i>";
    deleteBtn.classList.add("delete");
    deleteBtn.classList.add("right");

    deleteBtn.addEventListener("click",function(){
        let ulElement = this.parentNode.parentNode.parentNode;
        let liElement = this.parentNode.parentNode;
        ulElement.removeChild(liElement);
    });

    //edit button
    //create edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "<i class=\"fas fa-edit\"></i>";
    editBtn.classList.add("edit");
    editBtn.classList.add("right");

    //on click remove task on list and replace with input box for editing
    editBtn.addEventListener("click",function(){

        //stores the task
        let oldTaskText = inputValue;
        
        //removes list item to be replaced by the input element
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

        //create input element for editing the value
        let newTaskInput = document.createElement("input");
        newTaskInput.placeholder = "Enter new Task";
        newTaskInput.type="text";
        newTaskInput.value = oldTaskText;

        //creating the cancel button
        let cancelBtn = document.createElement("span");
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.classList.add("delete");

        //on click remove buttons an input box & replace with unedited list element
        cancelBtn.addEventListener("click",function(){
            //remove buttons
            this.parentNode.removeChild(this.previousSibling);
            this.parentNode.removeChild(this.nextSibling);
            this.parentNode.removeChild(this);

            //recreate old list item
            let oldTask = document.createElement("li");
            //oldTask.innerHTML = oldTaskText;
            oldTask.classList.add("grid");
            oldTask.appendChild(leftDiv);
            oldTask.appendChild(rightDiv);

            //add back into the DOM
            //oldTask.appendChild(editBtn);
            //oldTask.appendChild(deleteBtn);
            //add left & right divs here
            list.appendChild(oldTask);
        });

        //------------------------end of cancel button

        //confirm button
        let confirmBtn = document.createElement("span");
        confirmBtn.innerHTML = "Confirm";
        confirmBtn.classList.add("edit");
        confirmBtn.classList.add("right");

        confirmBtn.addEventListener("click",function(){
            //remove buttons
            this.parentNode.removeChild(this.previousSibling.previousSibling);
            this.parentNode.removeChild(this.previousSibling);
            this.parentNode.removeChild(this);

            //store new value as new task
            let newTask = document.createElement("li");
            leftDiv.innerHTML = newTaskInput.value;
            inputValue = newTaskInput.value;
            newTask.classList.add("grid");

            //add back into the DOM
            rightDiv.appendChild(editBtn);
            rightDiv.appendChild(deleteBtn);
            newTask.appendChild(leftDiv);
            newTask.appendChild(rightDiv);
            //newTask.appendChild(editBtn);
            //newTask.appendChild(deleteBtn);
            list.appendChild(newTask);
        });

        //replace text with input
        list.appendChild(newTaskInput);
        list.appendChild(cancelBtn);
        list.appendChild(confirmBtn);
    });

    //------------------ End of Edit mode
    
    console.log("grid2");

    //DOM interaction
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);
    task.appendChild(leftDiv);
    task.appendChild(rightDiv);
    list.appendChild(task);

});
};