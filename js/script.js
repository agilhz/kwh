// refresh
window.onresize = function () {
  location.reload();
};

// Navbar

const navbar = document.getElementById("navbar");

const onScroll = () => {
  const scroll = document.documentElement.scrollTop;
  if (scroll > 0) {
    navbar.classList.add("active");
    navbar.classList.add("shadow");
  } else {
    navbar.classList.remove("active");
    navbar.classList.remove("shadow");
  }
};

window.addEventListener("scroll", onScroll);

// Pricing

const orderNow = document.getElementById("order-now");
const pricing = document.getElementById("pricing");
const exit = document.getElementById("exit");
const mask = document.getElementById("mask");

orderNow.addEventListener("click", function () {
  pricing.style.display = "block";
  mask.style.display = "block";
});

exit.addEventListener("click", function () {
  pricing.style.display = "none";
  mask.style.display = "none";
});

// carousel auto play

const imageWrapper = document.querySelector(".image-wrapper");
const imageItems = document.querySelectorAll(".image-wrapper > *");
const imageLength = imageItems.length;
const perView = view();
let totalScroll = 0;
const delay = 2000;

function view() {
  if (window.innerWidth > 1024) {
    return 3;
  } else if (window.innerWidth > 768) {
    return 2;
  } else {
    return 1;
  }
}

imageWrapper.style.setProperty("--per-view", perView);
for (let i = 0; i < perView; i++) {
  imageWrapper.insertAdjacentHTML("beforeend", imageItems[i].outerHTML);
}

let autoScroll = setInterval(scrolling, delay);

imageWrapper.addEventListener("mouseover", function () {
  clearInterval(autoScroll);
});

imageWrapper.addEventListener("mouseout", function () {
  autoScroll = setInterval(scrolling, delay);
});

function scrolling() {
  totalScroll++;
  if (totalScroll == imageLength + 1) {
    clearInterval(autoScroll);
    totalScroll = 1;
    imageWrapper.style.transition = "0s";
    imageWrapper.style.left = "0";
    autoScroll = setInterval(scrolling, delay);
  }
  const widthEl = document.querySelector(".image-wrapper > :first-child").offsetWidth + 24;
  imageWrapper.style.left = `-${totalScroll * widthEl}px`;
  imageWrapper.style.transition = ".3s";
}



// todo list

      const newTodoForm = document.querySelector('#tambah-todo');
      const todoList = document.querySelector('.todo-list');
      let todos = JSON.parse(localStorage.getItem('todos') || '[]');

      function init() {
        newTodoForm.addEventListener('submit', newTodo);
        updateList();
      }
      
      function* index() {
        let i = todos.length;

        while(true) {
          yield i;

          i = i + 1;
        }
      }

      function createTodo({ content = '', completed = false } = {}) {
        const id = index().next().value;

        return {
          id: id,
          date: new Date().toLocaleDateString(),
          content: content,
          complete: completed,
        };
      }

      function newTodo(e) {
        e.preventDefault();

        const newTodoContentInput = this.querySelector('[name="new-todo-content"]')
        const content = newTodoContentInput.value || '';

        if (content.length === 0) {
          return;
        }

        const newTodo = createTodo({ content: content });

        const newTodos = [...todos, newTodo];

        newTodoContentInput.value = '';
        updateTodos(newTodos);
      }

      function removeTodo(e) {
        e.preventDefault();
        if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
          return;
        }
        
        const id = +this.parentNode.dataset.id;
        const newTodos = todos.filter(todo => todo.id !== id);
        
        updateTodos(newTodos);
      }

      function toggleComplete(e) {
        if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) {
          return;
        }

        const id = +this.parentNode.dataset.id;
        const newTodos = todos.slice();
        newTodos[id] = { ...newTodos[id], complete: this.checked };

        updateTodos(newTodos);
      }

      function updateTodos(newTodos) {
        todos = newTodos;
        localStorage.setItem('todos', JSON.stringify(todos));

        updateList();
      }

      function updateList() {
        let content = todos.map(todo => {
          return `
            <div class="card row justify-content-between mb-2">
            <div class="card-body row-todos justify-content-between todo-list-item justify-content-lg-between ${ todo.complete ? 'completed' : '' }" data-id="${ todo.id }">
              <input class="check list-left" type="checkbox" ${ todo.complete ? 'checked' : '' } />
              <div class="list-center">
                <span>${ todo.content }</span> <br>
                <small class="text-muted">${ todo.date }</small>
              </div>
                <button class="hapus-todo btn btn-danger list-right" type="button"><i class="fas fa-times"></i></button>
            </div>
            </div>
          `;
        }).join('');

        todoList.innerHTML = content;

        const deleteButtons = todoList.querySelectorAll('.hapus-todo');
        deleteButtons.forEach(button => button.addEventListener('click', removeTodo));

        const completedCheckboxes = todoList.querySelectorAll('input[type="checkbox"]');
        completedCheckboxes.forEach(checkbox => checkbox.addEventListener('click', toggleComplete));
      }

      init();