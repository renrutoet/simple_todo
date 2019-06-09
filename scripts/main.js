

window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");
const taskList = [];


class Task {

    constructor(){

        //task value
        this.value = input.value;
        this.index = Task.incrementIndex();
        this.isDone = false;

        //create li container
        this.taskDOMElement = document.createElement("li");
        this.taskDOMElement.classList.add("grid");

        this.leftDiv = document.createElement("div");
        this.rightDiv = document.createElement("div");

        this.leftDiv.innerHTML = this.value;

        this.leftDiv.classList.add("left");
        this.rightDiv.classList.add("right");
        this.rightDiv.classList.add("grid-right-buttons");


        this.editInput = document.createElement("input");
        this.editInput.placeholder = "Please enter new task";
        this.editInput.type = "text";
        this.editInput.value = this.value;
        this.editInput.classList.add("hide");

        this.leftDiv.addEventListener("click",this.toggleDone.bind(this));

        // -----------------------------------------------------------

            //create edit & delete buttons
            this.editButton = document.createElement("span");
            this.deleteButton = document.createElement("span");

            //create the innerHTML
            this.editButton.innerHTML = "<i class=\"fas fa-edit\"></i>";
            this.deleteButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";

            //add styling
            this.editButton.classList.add("edit");
            this.deleteButton.classList.add("delete");

        // -------------------------------------------------------------

            //create cancel & confirm buttons
            this.cancelButton = document.createElement("span");
            this.confirmButton = document.createElement("span");

            //create the innerHTML
            this.cancelButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";
            this.confirmButton.innerHTML = "<i class=\"fas fa-check\"></i>";
            
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

    toggleDone(){

        if(!this.editButton.classList.contains("hide")){

        if(this.isDone){
            this.isDone = false;
        }
        else {
            this.isDone = true;
        }

        
            this.leftDiv.classList.toggle("done");
        }
    }

    enterEditMode(){


        if(this.isDone){
            this.leftDiv.classList.toggle("done");
        }

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
        if(this.isDone && !this.leftDiv.classList.contains("done")){
            this.leftDiv.classList.toggle("done");
        }
    }

    toggleButtons (){
        this.deleteButton.classList.toggle("hide");
        this.editButton.classList.toggle("hide");

        this.cancelButton.classList.toggle("hide");
        this.confirmButton.classList.toggle("hide");
    }

    deleteTask(){

        taskList.splice(this.index - 1,1);

        this.taskDOMElement.parentNode.removeChild(this.taskDOMElement);
    }

    addToDom(){
        var target = document.querySelector("#todoList");
        target.appendChild(this.taskDOMElement);
    }

    static incrementIndex(){
        if(!this.latestIndex){
            this.latestIndex = 1;
        }
        else {
            this.latestIndex++;
        }
        return this.latestIndex;
    }

}



inputBtn.addEventListener("click",function(){
    let index = 0;

    taskList.push(new Task());
    taskList.forEach(function(task){
        index++;
        task.addToDom();
        task.index = index;
    })
    input.value = "";
    
});
};

