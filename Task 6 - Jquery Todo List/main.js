$(document).ready(function () {
  var liElement = null;

  $("#btn").click(function () {
    var txtName = $(".input").val();
    if (txtName == "") {
      alert("Input can not be left blank");
    }

    var action = $("#btn").val();
    if (action == "Add") {
      $(".order-list").append(
        `<div class="add-List"><li id='input-list'>${txtName} </li> <button id='remove'><i class="fa-solid fa-trash-can"></i></button> </div> `
      );
    } else {
      liElement.text(txtName);
      $("#btn").val("Add");
    }
    $(".input").val("");
  });

  $(document).on("click", "li", function () {
    liElement = $(this);
    $(".input").val(liElement.text());
    $("#btn").val("Update");
  });

  $(document).on("click", "button", function () {
    $(this).prev().remove();
    $(this).remove();
  });
});
