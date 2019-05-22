window.onload = function(){


const input = document.querySelector("#input");
const inputBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");

inputBtn.addEventListener("click",function(){

    let task = document.createElement("li");
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = " delete";
    task.innerHTML = input.value + deleteBtn.innerHTML;

    list.appendChild(task);

});



};