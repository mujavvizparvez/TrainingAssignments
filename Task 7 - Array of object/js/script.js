$(document).ready(function () {
  let productDetails = [];
  var trElement;
  $("#btnSubmit").on("click", function () {
    let productName = $("#pName").val();
    let productQuantity = $("#quantity").val();
    let productPrice = $("#price").val();

    let product = {
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      productTotal: productQuantity * productPrice,
    };
    var isValid = validate();
    if (!isValid) {
      return;
    }
    var action = $("#btnSubmit").val();
    if (action == "Submit") {
      productDetails.push(product);
    }

    $("#pName").val("");
    $("#quantity").val("");
    $("#price").val("");
    $("tbody").empty();
    displayData(productDetails);
    displayCartData(productDetails);
    console.log(productDetails);
  });

  function displayData(productDetails) {
    for (i = 0; i < productDetails.length; i++) {
      $(".prod-list-table").append(`<tr> <td class='srNo'> ${i + 1}</td>
        <td class='table-data-name'> ${productDetails[i].name}</td>
         <td class='table-data-quantity'> <i class="fa-solid fa-circle-minus decrease"></i>   <input  value="${
           productDetails[i].quantity
         }"> <i class="fa-solid fa-circle-plus increase"></i> </td>
          <td class='table-data-price'> ${productDetails[i].price}</td>
          <td>${productDetails[i].productTotal}</td>
          <td  class='remove-btn'> <button><i class="fa-solid fa-trash-can action-btn" id='remove'></i></button></td>
          </tr>`);
    }
    getFinalTotal();
  }

  // CART DATA

  function displayCartData(productDetails) {
    $(".prod-summary-table tbody").empty();
    var quantityTotal = 0;
    for (i = 0; i < productDetails.length; i++) {
      $(".prod-summary-table").append(`<tr> <td> ${i + 1}</td>
        <td> ${productDetails[i].quantity}</td>
         <td>${productDetails[i].name}</td>
          <td>${productDetails[i].productTotal}</td>
          </tr>`);
      quantityTotal += productDetails[i].productTotal;
    }
    $("#summary-total").text(quantityTotal);
  }
  //TOTAL CALCULATION

  $(document).on("click", "tr td .increase", function () {
    var quantity = parseInt($(this).prev().val());
    quantity += 1;
    $(this).prev().val(quantity);
    var tr = $(this).parents("tr");
    var name = tr.children("td:eq(1)").text().trim();
    var price = tr.children("td:eq(3)").text().trim();
    var total = quantity * price;
    tr.children("td:eq(4)").text(total);
    var index = $(this).closest("tr").index();
    productDetails[index].quantity = quantity;
    productDetails[index].productTotal = total;
    getFinalTotal();
    displayCartData(productDetails);
  });

  $(document).on("click", "tr td .decrease", function () {
    var quantity = parseInt($(this).next().val());
    quantity -= 1;
    var index = $(this).closest("tr").index();
    if (quantity == 0) {
      productDetails.splice(index, 1);
      $(".prod-list-table tr")
        .eq(index + 1)
        .remove();

      $(".prod-summary-table tr")
        .eq(index + 1)
        .remove();

      getFinalTotal();
    } else {
      $(this).next().val(quantity);
      var tr = $(this).parents("tr");
      var name = tr.children("td:eq(1)").text().trim();
      var price = tr.children("td:eq(3)").text().trim();
      var total = quantity * price;
      tr.children("td:eq(4)").text(total);

      productDetails[index].quantity = quantity;
      productDetails[index].productTotal = total;
      getFinalTotal();
      displayCartData(productDetails);
    }
  });

  function getFinalTotal() {
    var pTotal = 0;
    for (a = 0; a < productDetails.length; a++) {
      pTotal += productDetails[a].productTotal;
    }
    $("#prod-list-total").text(pTotal);
    $("#summary-total").text(pTotal);
    return pTotal;
  }

  // DELETE FUNCTION
  $(document).on("click", "#remove", function () {
    var index = $(this).closest("tr").index();
    $(this).closest("tr").remove();
    productDetails.splice(index, 1);
    $(".prod-summary-table tr")
      .eq(index + 1)
      .remove();
    getFinalTotal();
   
  });


  //  VALIDATIONS
  function validate() {
    let isValidate = false;
    productName = $("#pName").val();
    productQuantity = $("#quantity").val();
    productPrice = $("#price").val();

    // if (productName == "" || productQuantity == "" || productPrice == "")
    if (productName == "") {
      alert("Product name cannot be blank");
      return isValidate;
    } else if (!isNaN(productName)) {
      alert("Product name should not contain number");
      return isValidate;
    } else if (productName.match(/ /g)) {
      alert("No whitespaces allowed");
      return isValidate;
    } else if (productQuantity.includes(".")) {
      alert("Quantity can't accept decimal value");
      return isValidate;
    } else if (productQuantity == "") {
      alert("Product quantity cannot be blank");
      return isValidate;
    } else if (productQuantity < 1) {
      alert("Quantity can't be negative");
      return isValidate;
    } else if (productPrice == "") {
      alert("Product price cannot be blank");
      return isValidate;
    } else if (productPrice.match(/ /g)) {
      alert("No whitespaces allowed");
      return isValidate;
    } else if (productPrice < 1) {
      alert("Price can't be negative");
      return isValidate;
    } else if (productPrice.includes(".")) {
      alert("Quantity can't accept decimal value");
      return isValidate;
    }
    return true;
  }
});
