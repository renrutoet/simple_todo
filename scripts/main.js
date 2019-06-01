

window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");


class Task {

    constructor(){

        //task value
        this.value = "input.value";
        // this.state = "display";

        //create li container
        this.taskDOMElement = document.createElement("li");
        this.taskDOMElement.classList.add("grid");

        this.leftDiv = document.createElement("div");
        this.rightDiv = document.createElement("div");

        this.leftDiv.innerHTML = this.value;

        this.leftDiv.classList.add("left");
        this.rightDiv.classList.add("right");

        this.editInput = document.createElement("input");
        this.editInput.placeholder = "Please enter new task";
        this.editInput.type = "text";
        this.editInput.value = this.value;
        this.editInput.classList.add("hide");


        // -----------------------------------------------------------

            //create edit & delete buttons
            this.editButton = document.createElement("span");
            this.deleteButton = document.createElement("span");

            //create the innerHTML
            this.editButton.innerHTML = "Edit";
            this.deleteButton.innerHTML = "Delete";

            //add styling
            this.editButton.classList.add("edit");
            this.deleteButton.classList.add("delete");

        // -------------------------------------------------------------

            //create cancel & confirm buttons
            this.cancelButton = document.createElement("span");
            this.confirmButton = document.createElement("span");

            //create the innerHTML
            this.cancelButton.innerHTML = "Cancel";
            this.confirmButton.innerHTML = "Confirm";
            
            //add styling
            this.cancelButton.classList.add("delete");
            this.confirmButton.classList.add("edit");
            this.cancelButton.classList.add("hide");
            this.confirmButton.classList.add("hide");

        // ----------------------------------------------------------------

        //  Assemble all the elements under the li element ready for adding to the DOM
        this.rightDiv.appendChild(this.editButton);
        this.rightDiv.appendChild(this.deleteButton);

        this.rightDiv.appendChild(this.confirmButton);
        this.rightDiv.appendChild(this.cancelButton);

        this.taskDOMElement.appendChild(this.leftDiv);
        this.taskDOMElement.appendChild(this.rightDiv);


        //now for button behaviour

        //We need to use .bind() to pass in the 'context'of this task instance.
        this.deleteButton.addEventListener("click", this.deleteTask.bind(this));

        this.editButton.addEventListener("click",this.enterEditMode.bind(this));

        // ----------------------------------------------------------------

        //edit mode

        this.cancelButton.addEventListener("click",this.exitEditMode.bind(this));
        this.confirmButton.addEventListener("click",this.exitEditMode.bind(this,"confirm"));

        // ----------------------------------------------------------------



    }

    enterEditMode(){
        this.leftDiv.innerHTML = "";

        this.editInput.value = this.value;

        this.editInput.classList.toggle("hide");

        this.leftDiv.appendChild(this.editInput);
        this.toggleButtons();
    }

    exitEditMode(input){
        if(input == "confirm"){
        
        this.leftDiv.innerHTML = this.editInput.value;
        this.value = this.editInput.value;
        this.editInput.classList.toggle("hide");

        this.toggleButtons();
        }
        else{
            this.leftDiv.innerHTML = this.value;
            this.editInput.classList.toggle("hide");

            this.toggleButtons();
        }
    }

    toggleButtons (){
        this.deleteButton.classList.toggle("hide");
        this.editButton.classList.toggle("hide");

        this.cancelButton.classList.toggle("hide");
        this.confirmButton.classList.toggle("hide");
    }

    deleteTask(){
        this.taskDOMElement.parentNode.removeChild(this.taskDOMElement);
    }


    addToDom(){
        var target = document.querySelector("#todoList");
        console.log(target);
        target.appendChild(this.taskDOMElement);
    }

    logValue(){
        console.log(this.value);
    }

}

task1 = new Task();
task1.addToDom();
task1.logValue();
// task1.deleteTask();
console.log(task1);


inputBtn.addEventListener("click",function(){


    //create divs for grid
    var leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    var rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    //task input box
    var task = document.createElement("li");
    task.classList.add("grid")
    var inputValue = input.value;
    leftDiv.innerHTML = inputValue;

    //delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.classList.add("right");

    deleteBtn.addEventListener("click",function(){
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    });

    //edit button
    //create edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "Edit"
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
    
    //DOM interaction
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);
    task.appendChild(leftDiv);
    task.appendChild(rightDiv);
    list.appendChild(task);

});
};

