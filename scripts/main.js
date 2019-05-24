window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");

inputBtn.addEventListener("click",function(){

    //task input box
    var task = document.createElement("li");
    var inputValue = input.value;
    task.innerHTML = inputValue;

    //delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete");
    //deleteBtn.classList.add("right");

    deleteBtn.addEventListener("click",function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    });

    //edit button
    //create edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("edit");

    //on click remove task on list and replace with input box for editing
    editBtn.addEventListener("click",function(){

        //stores the task
        let oldTaskText = inputValue;
        
        //removes list item to be replaced by the input element
        this.parentNode.parentNode.removeChild(this.parentNode);

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
            oldTask.innerHTML = oldTaskText;

            //add back into the DOM
            oldTask.appendChild(editBtn);
            oldTask.appendChild(deleteBtn);
            list.appendChild(oldTask);
        });

        let confirmBtn = document.createElement("span");
        confirmBtn.innerHTML = "Confirm";
        confirmBtn.classList.add("edit");

        confirmBtn.addEventListener("click",function(){
            //remove buttons
            this.parentNode.removeChild(this.previousSibling.previousSibling);
            this.parentNode.removeChild(this.previousSibling);
            this.parentNode.removeChild(this);

            //store new value as new task
            let newTask = document.createElement("li");
            newTask.innerHTML = newTaskInput.value;
            inputValue = newTaskInput.value;

            //add back into the DOM
            newTask.appendChild(editBtn);
            newTask.appendChild(deleteBtn);
            list.appendChild(newTask);
        });

        //replace text with input
        list.appendChild(newTaskInput);
        list.appendChild(cancelBtn);
        list.appendChild(confirmBtn);
    });
    
    
    //DOM interaction
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);
    list.appendChild(task);

});



};