/**
 * Data Addition
 */
$("#add_user").submit(function (event) {
  alert("Data inserted successfully");
});

/**
 * Data Updation
 */
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
$("#update_availability").submit(function (event) {
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

/**
 * Data Deletion
 */
if (window.location.pathname == "/admin") {
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

/**
 * Clock
 */
$(document).ready(function () {
  $(".timepicker").mdtimepicker();
});

/**
 * Filter by Job Type
 */
$(".jobType-filter-handle").on("change", function (e) {
  console.log("Job Type filter working");
  // retrieve the dropdown selected value
  var jobType = e.target.value;
  var table = $(".filter-table-data");
  // if a jobType is selected
  if (jobType.length) {
    // hide all not matching
    table.find("tr[data-jobType!=" + jobType + "]").hide();
    // display all matching
    table.find("tr[data-jobType=" + jobType + "]").show();
  } else {
    // jobType is not selected,
    // display all
    table.find("tr").show();
  }
});

/**
 * Populating Date inside employee Info page
 */
let curr = new Date();
let week = [];

if (document.getElementById("employeeDashboard")) {
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }
  if (sundayDate) {
    document.getElementById("sundayDate").innerHTML = week[6];
  }
  if (mondayDate) {
    document.getElementById("mondayDate").innerHTML = week[5];
  }
  if (tuesdayDate) {
    document.getElementById("tuesdayDate").innerHTML = week[4];
  }
  if (wednesdayDate) {
    document.getElementById("wednesdayDate").innerHTML = week[3];
  }
  if (thursdayDate) {
    document.getElementById("thursdayDate").innerHTML = week[2];
  }
  if (fridayDate) {
    document.getElementById("fridayDate").innerHTML = week[1];
  }
  if (saturdayDate) {
    document.getElementById("saturdayDate").innerHTML = week[0];
  }
}

/**
 * Hours Calculation
 */

// 24 hour format conversion
const convertTime = (timeToBeFormatted) => {
  const [time, modifier] = timeToBeFormatted.split(" ");
  console.log(modifier);
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

/**
 * Populating Hours inside employee Info page
 */
$(document).ready(function () {
  if (document.getElementById("employeeDashboard")) {
    // Loop through each div element with the class box
    $(".employeeRow").each(function () {
      // Test if the div element is empty
      var clockInTime = $(this).find(".clockInTime").text();
      var availabilityClockInTime = $(this).find(".availabilityClockInTime").text();
      var clockOutTime = $(this).find(".clockOutTime").text();
      var availabilityClockOutTime = $(this).find(".availabilityClockOutTime").text();
      clockInTime = convertTime(clockInTime);
      clockOutTime = convertTime(clockOutTime);
      var hourDiff = clockOutTime.split(":")[0] - clockInTime.split(":")[0];
      var clockOutTime = $(this).find(".shiftHours").text(hourDiff);
      var clockOutTime = $(this).find(".shiftAvailabilityHours").text(hourDiff);
    });
  }
});
