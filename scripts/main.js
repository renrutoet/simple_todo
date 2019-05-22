window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");

inputBtn.addEventListener("click",function(){

    let task = document.createElement("li");
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click",function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    });
    
    task.innerHTML = input.value;
    task.appendChild(deleteBtn);

    

    list.appendChild(task);

});



};