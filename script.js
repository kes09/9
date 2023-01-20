let mainWrapper = document.getElementById("postWrapper");
let overlay = document.getElementById("overlay");
let popapContent = document.getElementById("content");
let closeIcon = document.getElementById("close");
let addButton = document.getElementById("add");
let overlayAdd = document.getElementById("overlay-add");
let addForm = document.getElementById("form-add");
let inputTitle = document.getElementById("title");

function ajax(url, callback) {
  let requist = new XMLHttpRequest();
  requist.open("GET", url);
  requist.addEventListener("load", function () {
    let mosuliData = JSON.parse(this.responseText);
    callback(mosuliData);
  });
  requist.send();
}


ajax("https://jsonplaceholder.typicode.com/posts", function (mosuliData) {
  mosuliData.forEach((item) => {
    createPost(item);
  });
});

function createPost(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");
  divWrapper.setAttribute("data-id", item.id);

  let postId = document.createElement("h4");
  postId.innerText = item.id;

  let postTittle = document.createElement("h2");
  postTittle.innerText = item.title;

  let deleteButton = document.createElement("button");
  deleteButton.classList.add('fa-solid');
  deleteButton.classList.add('fa-trash');
  deleteButton.setAttribute('data_id', item.id);

  divWrapper.appendChild(postId);
  divWrapper.appendChild(postTittle);
  divWrapper.appendChild(deleteButton);


  divWrapper.addEventListener("click", function (event) {
    let id = event.currentTarget.getAttribute("data-id");
    overlay.classList.add("active");
    let serverUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(serverUrl, function (mosuliData) {
      overlayDescription(mosuliData);
    });
  });

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let deleteId = event.target.getAttribute("data-id");
    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => divWrapper.remove());
  });

  mainWrapper.appendChild(divWrapper);

  console.log(divWrapper);
}

function overlayDescription(item) {
  let description = document.createElement("p");
  description.innerText = item.body;

  popapContent.appendChild(description);
}

closeIcon.addEventListener("click", function () {
  overlay.classList.remove("active");
  popapContent.innerHTML = " ";
});

addButton.addEventListener("click", function () {
  overlayAdd.classList.add("activeAdd");
  inputTitle.value = " ";
});

addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let formData = {
    title: event.target[0].value,
  };


  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((axaliPosti) => {
      createPost(axaliPosti);
      overlayAdd.classList.remove("activeAdd");
    });
});
