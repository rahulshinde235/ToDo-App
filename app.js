const addItem=document.querySelector('.add');
const list=document.querySelector('.todos');
const generateTemplate=(todo=>{
    const html=`<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>`;
  list.innerHTML+=html;
});
addItem.addEventListener('submit',e=>{
    e.preventDefault();
    const todo=addItem.add.value.trim();//we can get a handle on input via its name field and .value is used to get content of input field and we use trim() on a string to remove spaces before and after our string
    if(todo.length){
        generateTemplate(todo);
        addItem.reset();//clears all form input queried on DOM
    }
});

//deleting todos
/*Reasons not to set event listeners on the trash icons
because it would make our site slow
Also when we add a new todo we will have to manually setup event listener on the todo
so we use event delegation
*/

list.addEventListener('click',e=>{
    //below is how we check if an event has occured at a specific place we check classList and then via contain() can check if it has the specific class
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();//we want to delete the li tag so the fa-icon parent is the li so we use the parentElement and then via the remove() we delete it from the DOM
    }
});



//Searching todos
const search=document.querySelector('.search input');


const filterTodos=(term=>{
    Array.from(list.children)
    .filter(todo=>!todo.textContent.toLowerCase().includes(term))
    .forEach(todo=>todo.classList.add('filtered'))
//when we delete a word and if its matches then we have to display it again
    Array.from(list.children)
    .filter(todo=>todo.textContent.toLowerCase().includes(term))
    .forEach(todo=>todo.classList.remove('filtered'))

});

search.addEventListener('keyup',()=>{
    const term=search.value.trim().toLowerCase();
    filterTodos(term);

});