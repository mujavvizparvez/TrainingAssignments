//Humberger Menu
const navList = document.querySelector(".navbar-list");
const closeMenu = document.querySelector(".close-menu");
const openMenu = document.querySelector(".open-menu");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

function show() {
  navList.style.display = "flex";
  navList.style.top = " 0";
}
function close() {
  navList.style.top = "-100%";
}
///// VALIDATION SECTION 2

// New  validation section

//CRUD

//GLOBAL VARIABLES
document.addEventListener("DOMContentLoaded", onLoad());
var row = null;
var customer = {
  name: null,
  surName: null,
  email: null,
};

function save() {
  var isValid = validate();
  if (!isValid) return;
  var btnSave = document.getElementById("btnSave").value;
  if (btnSave == "Add Friend") {
    var customerDetails = retrieveData();
    setDataToLocalStorage(customerDetails);
    addGridData(customerDetails);
  } else {
    update();
    document.getElementById("btnSave").value = "Add Friend";
  }
  reset();

  // console.log(readData);
}
//CREATE
//Retrieving data from form
function retrieveData() {
  customer.name = document.getElementById("name").value;
  customer.surName = document.getElementById("surname").value;
  customer.email = document.getElementById("email").value;
  return customer;
}
// READ
//Data in local storage
function setDataToLocalStorage(customerDetails) {
  // Storing data in local storage
  var data = localStorage.getItem("CustomerDetails");
  var customerList = JSON.parse(data);
  if (customerList === undefined || customerList == null) customerList = [];
  customerList.push(customerDetails);
  localStorage.setItem("CustomerDetails", JSON.stringify(customerList));
}

// INSERT
function addGridData(data) {
  var table = document.getElementById("table");
  if (table.rows.length > 0) {
    table.style.display = "table";
  }
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  cell1.innerHTML = data.name;
  var cell2 = row.insertCell(1);
  cell2.innerHTML = data.surName;
  row.insertCell(2).innerHTML = data.email;
  row.insertCell(
    3
  ).innerHTML = `<button onclick="edit(this)"><i class="fa-solid fa-pen-to-square action-btn" id="remove"></i></button>
                <button onclick="remove(this)"><i class="fa-solid fa-trash-can action-btn"></i></button>`;
}
// EDIT
function edit(tableData) {
  row = tableData.parentElement.parentElement;
  document.getElementById("name").value = row.cells[0].innerHTML;
  document.getElementById("surname").value = row.cells[1].innerHTML;
  document.getElementById("email").value = row.cells[2].innerHTML;
  document.getElementById("btnSave").value = "Update";
}
// // UPDATE
function update() {
  row.cells[0].innerHTML = document.getElementById("name").value;
  row.cells[1].innerHTML = document.getElementById("surname").value;
  row.cells[2].innerHTML = document.getElementById("email").value;
}

/// DELETE
function remove(cell) {
  var row = cell.parentElement.parentElement;
  var index = row.rowIndex;
  var table = document.getElementById("table").deleteRow(index, 1);
  var data = localStorage.getItem("CustomerDetails");
  var customerList = JSON.parse(data);
  customerList.splice(index - 1, 1);
  localStorage.setItem("CustomerDetails", JSON.stringify(customerList));
}
/// RESET
function reset() {
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("email").value = "";
}

/// VALIDATIONS
function validate() {
  let isValidate = false;
  console.log("validation function clicked");
  let name = document.getElementById("name");
  let surname = document.getElementById("surname");
  let email = document.getElementById("email");

  if (name.value == "") {
    document.querySelectorAll(".errorMsg")[0].textContent =
      "Name can't be empty";
    return isValidate;
  } else if (!isNaN(name.value)) {
    document.querySelectorAll(".errorMsg")[0].textContent =
      "Name should not contain number";
    return isValidate;
  } else if (name.value.length < 3) {
    document.querySelectorAll(".errorMsg")[0].textContent =
      "Name length should be minimum 3";
    return isValidate;
  } else {
    document.querySelectorAll(".errorMsg")[0].textContent = "";
  }

  // SURNAME VALIDATION
  if (surname.value == "") {
    document.querySelectorAll(".errorMsg")[1].textContent =
      "Surname can't be empty";
    return isValidate;
  } else if (!isNaN(surname.value)) {
    document.querySelectorAll(".errorMsg")[1].textContent =
      "Surname should not contain number";
    return isValidate;
  } else if (surname.value.length < 3) {
    document.querySelectorAll(".errorMsg")[1].textContent =
      "Surname length should be minimum 3";
    return isValidate;
  } else {
    document.querySelectorAll(".errorMsg")[1].textContent = "";
  }

  //  EMAIL VALIDATION
  if (email.value == "") {
    document.querySelectorAll(".errorMsg")[2].textContent =
      "Email can't be empty";
    return isValidate;
  } else if (email.value.startsWith("@")) {
    document.querySelectorAll(".errorMsg")[2].textContent =
      "Email Can't starts with @";
    return isValidate;
  } else if (!isNaN(email.value)) {
    document.querySelectorAll(".errorMsg")[2].textContent =
      "Email should not contain number";
    return isValidate;
  } else if (
    !(
      email.value.endsWith("qualminds.com") || email.value.endsWith("gmail.com")
    )
  ) {
    document.querySelectorAll(".errorMsg")[2].textContent = "Enter valid mail!";
    return isValidate;
  } else {
    document.querySelectorAll(".errorMsg")[2].textContent = "";
  }
  isValidate = true;
  return isValidate;
}

function onLoad() {
  var data = localStorage.getItem("CustomerDetails");
  var customerList = JSON.parse(data);
  if (customerList != null || customerList != undefined) {
    var table = document.getElementById("table");
    customerList.forEach(loop);

    function loop(item) {
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      cell1.innerHTML = item.name;
      var cell2 = row.insertCell(1);
      cell2.innerHTML = item.surName;
      var cell3 = row.insertCell(2);
      cell3.innerHTML = item.email;
      row.insertCell(
        3
      ).innerHTML = `<button onclick="edit(this)" class="action-btn"><i class="fa-solid fa-pen-to-square action-icon" id="remove"></i></button>
                <button onclick="remove(this)" class="action-btn"><i class="fa-solid fa-trash-can action-icon"></i></button>`;
    }
  } else {
    var table = document.getElementById("table");
    table.style.display = "none";
  }
}
