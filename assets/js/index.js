$("#add_user").submit(function (event) {
  alert("Data inserted successfully");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  console.log(data);

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data updated successfully");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this user?")) {
      $.ajax(request).done(function (response) {
        alert("Data deleted successfully");
        location.reload();
      });
    }
  });
}

$(document).ready(function () {
  $(".timepicker").mdtimepicker();
});

let curr = new Date();
let week = [];
var dateSelect = document.getElementById("date-filter-handle");

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  week.push(day);
  console.log(day);

  var opt = document.createElement("option");
  opt.value = day;
  opt.innerHTML = day;
  dateSelect.appendChild(opt);
}

$(".filter-handle").on("change", function (e) {
  // retrieve the dropdown selected value
  var location = e.target.value;
  var table = $(".filter-table-data");
  // if a location is selected
  if (location.length) {
    // hide all not matching
    table.find("tr[data-type!=" + location + "]").hide();
    // display all matching
    table.find("tr[data-type=" + location + "]").show();
  } else {
    // location is not selected,
    // display all
    table.find("tr").show();
  }
});
