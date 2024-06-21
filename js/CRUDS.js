// get input
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
// get button
let create = document.getElementById("create");
// btn mood
let mood = "create";
// index update
let temp;

// founction count price product
function getTotal() {
  if (price.value != "" && taxes.value != "" && ads.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#7b0000";
  }
}

// create
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

// function create
create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    category.value != ""
  ) {
    if (mood == "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "create";
    }
    clearData();
  }

  // save localStorge
  localStorage.setItem("product", JSON.stringify(datapro));
  showData();

  getTotal();
};

// function clear input after create
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function showData() {
  getTotal();
  let tabel = "";
  for (let i = 0; i < datapro.length; i++) {
    tabel += `   
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="udatedata(${i})" id="update">Update</button></td>
    <td><button onclick=" deleteData(${i})" id="delete">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = tabel;

  // deleteAll
  let btndelete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteAll()">DeleteAll(${datapro.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
}
showData();
// delete data
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

// delete all
function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

// udatedata
function udatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  category.value = datapro[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// get mood search
let searchmood = "title";
function getSearchMood(id) {
  let Search = document.getElementById("Search");
  if (id == "searchTotal") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  Search.placeholder = " Search By " + searchmood;
  Search.focus();
  Search.value = "";
  showData();
}

// searchData
function searchData(value) {
  let tabel = "";
  for (let i = 0; i < datapro.length; i++) {
    if (searchmood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        tabel += `   
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="udatedata(${i})" id="update">Update</button></td>
    <td><button onclick=" deleteData(${i})" id="delete">Delete</button></td>
  </tr>`;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        tabel += `   
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="udatedata(${i})" id="update">Update</button></td>
    <td><button onclick=" deleteData(${i})" id="delete">Delete</button></td>
  </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tabel;
}
