var jwt = localStorage.getItem("jwt");
if (jwt == null) {
    window.location.href = './login.html'
}

const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const titleValue2 = document.getElementById("title-value2");
const bodyValue2 = document.getElementById("body-value2");
const btnSubmit = document.querySelector(".btn");
const btnSubmit2 = document.querySelector(".btn2");
const btnDelete = document.querySelector(".btn3");

// Button Loading
const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");
const myAlert2 = document.querySelector(".my-alert2");
const btnSend2 = document.querySelector(".btn2");
const btnLoading2 = document.querySelector(".btn-loading2");

let output = "";

const renderPosts = (posts) => {
  posts.forEach((post) => {
    console.log(post);
    output += `
    
        <div class="card col-md-12">
        <div class="card-body" data-id=${post.id}>
          <h5 class="card-title">${post.attributes.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.attributes.createdAt}</h6>
          <p class="card-text text-primary mb-3">${post.attributes.link}</p>
          <a href="#" class="card-link" id="edit-post" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</a>
          <a href="#" class="card-link card-link" data-toggle="modal"
              data-target="#exampleModal2" data-whatever="@mdo">Delete</a>
      </div>
      </div>
      
      `;
    postsList.innerHTML = output;
  });
};

// const url2 = "https://fakestoreapi.com/products";

const url = "https://condfe-api.herokuapp.com/api/linkcondfes";

// Get - Read the posts
//  Method : GET
const jwtToken = localStorage.getItem('jwt')
fetch(url,{
  method: 'GET',
  headers: {
     Authorization: `Bearer ${jwtToken}`
  },
})
  .then((res) => res.json())
  .then((data) => renderPosts(data.data));
// Create - Insert new post
// Method : POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // ketika tombol submit di click
  // tampilkan tombol loading hilangkan tombol kirim
  btnLoading.classList.toggle("d-none");
  btnSend.classList.toggle("d-none");
  myAlert.classList.toggle("d-none");

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      data: {
        title: titleValue.value,
        link: bodyValue.value,
      },
    }),
  })
    .then((res) => res.json().then(() => location.reload()))
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    });

  // Reset input field to empty
  titleValue.value = "";
  bodyValue.value = "";
});

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";
  // console.log(e.target.id);
  let id = e.target.parentElement.dataset.id;

  // Update - update the existing post
  // Method : PATCH

  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent;
    console.log(titleContent, bodyContent);

    titleValue2.value = titleContent;
    bodyValue2.value = bodyContent;
  }
  btnSubmit2.addEventListener("click", (e) => {
    btnLoading2.classList.toggle("d-none");
    btnSend2.classList.toggle("d-none");
    myAlert2.classList.toggle("d-none");

    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        data: {
          title: titleValue2.value,
          link: bodyValue2.value,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });

  btnDelete.addEventListener("click", (e) => {

    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        data: {
          title: titleValue2.value,
          link: bodyValue2.value,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });

  if (delButtonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }

  // Update - update the existing post
  // Method : PATCH
});



function logout(){
  localStorage.removeItem("jwt")
  window.location.href = './index.html';
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}