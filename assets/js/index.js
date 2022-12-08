/**
 * Data Addition
 */
$("#add_user").submit(function (event) {
  alert("Data inserted successfully");
});
/**
 * Ticket Addition
 */
$("#create_ticket").submit(function (event) {
  alert("Ticket created successfully");
});

/**
 * Data Updation
 */
$(document).ajaxStop(function () {
  window.location.reload();
  $(".modal-box, .modal-overlay").fadeOut(500, function () {
    $(".modal-overlay").remove();
  });
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
/**********************/
$("#update_user_time").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  var shiftTime = {};

  console.log(unindexed_array);

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  console.log(data);

  if (data.sundayClockInTime != null && data.sundayClockOutTime != null) {
    shiftTime = {
      sundayClockInTime: "",
      sundayClockOutTime: "",
    };
  } else if (
    data.mondayClockInTime != null &&
    data.mondayClockOutTime != null
  ) {
    shiftTime = {
      mondayClockInTime: "",
      mondayClockOutTime: "",
    };
  } else if (
    data.tuesdayClockInTime != null &&
    data.tuesdayClockOutTime != null
  ) {
    shiftTime = {
      tuesdayClockInTime: "",
      tuesdayClockOutTime: "",
      saturdayClockOutTime: "",
    };
  } else if (
    data.wednesdayClockInTime != null &&
    data.wednesdayClockOutTime != null
  ) {
    shiftTime = {
      wednesdayClockInTime: "",
      wednesdayClockOutTime: "",
    };
  } else if (
    data.thursdayClockInTime != null &&
    data.thursdayClockOutTime != null
  ) {
    shiftTime = {
      thursdayClockInTime: "",
      thursdayClockOutTime: "",
    };
  } else if (
    data.fridayClockInTime != null &&
    data.fridayClockOutTime != null
  ) {
    shiftTime = {
      fridayClockInTime: "",
      fridayClockOutTime: "",
    };
  } else if (
    data.saturdayClockInTime != null &&
    data.saturdayClockOutTime != null
  ) {
    shiftTime = {
      saturdayClockInTime: " ",
      saturdayClockOutTime: " ",
    };
  }

  console.log(shiftTime, "shifttime");

  var updateRrequest = {
    url: `http://localhost:3000/api/users/${data.ticketeeId}`,
    method: "PUT",
    data: data,
  };
  var deleteRequest = {
    url: `http://localhost:3000/api/users/${data.ticketerId}`,
    method: "PUT",
    shiftTime: shiftTime,
  };

  $.ajax(deleteRequest).done(function (response) {
    alert("Data updated successfully");
  });
});
/*********************/
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
  $ondelete = $(".employee_delete_btn");
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
 * Data Deletion
 */
if (window.location.pathname == "/allTickets") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/tickets/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this ticket?")) {
      $.ajax(request).done(function (response) {
        alert("Ticket deleted successfully");
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
  var table = $(".employeeCard");
  // if a jobType is selected
  if (jobType.length) {
    // hide all not matching
    table.find("div[data-jobType!=" + jobType + "]").hide();
    // display all matching
    table.find("div[data-jobType=" + jobType + "]").show();
  } else {
    // jobType is not selected,
    // display all
    table.find("div").show();
  }
});

/**
 * Filter by Ticket Type
 */
$(".ticketType-filter-handle").on("change", function (e) {
  console.log("Ticket Type filter working");
  // retrieve the dropdown selected value
  var ticketType = e.target.value;
  var table = $(".filter-table-data");
  // if a ticketType is selected
  if (ticketType.length) {
    // hide all not matching
    table.find("tr[data-ticketType!=" + ticketType + "]").hide();
    // display all matching
    table.find("tr[data-ticketType=" + ticketType + "]").show();
  } else {
    // ticketType is not selected,
    // display all
    table.find("tr").show();
  }
});

/**
 * Populating Date inside employee Info page
 */

var currentDate = moment();
var weekStart = currentDate.clone().startOf("week");
var weekEnd = currentDate.clone().endOf("week");

var days = [];
for (i = 0; i <= 6; i++) {
  days.push(moment(weekStart).add(i, "days").format("MMMM Do,dddd"));
}

for (let i = 0; i < days.length; i++) {
  if (document.getElementById("employeeDashboard")) {
    // Loop through each div element with the class box
    $(".employeeRow").each(function () {
      // Test if the div element is empty
      var day = $(this).find(".day").text();
      if (day == days[i].split(",")[1]) {
        $(this).find(".date").text(days[i].split(",")[0]);
        console.log(days[i].split(",")[0]);
      }
    });
  }
}

/**
 * Hours Calculation
 */

// 24 hour format conversion
const convertTime = (timeToBeFormatted) => {
  const [time, modifier] = timeToBeFormatted.split(" ");
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
      var availabilityClockInTime = $(this)
        .find(".availabilityClockInTime")
        .text();
      var clockOutTime = $(this).find(".clockOutTime").text();
      var availabilityClockOutTime = $(this)
        .find(".availabilityClockOutTime")
        .text();
      clockInTime = convertTime(clockInTime);
      clockOutTime = convertTime(clockOutTime);
      availabilityClockInTime = convertTime(availabilityClockInTime);
      availabilityClockOutTime = convertTime(availabilityClockOutTime);

      var hourDiff = clockOutTime.split(":")[0] - clockInTime.split(":")[0];
      var availabilityHourDiff =
        availabilityClockOutTime.split(":")[0] -
        availabilityClockInTime.split(":")[0];

      if (hourDiff < 0) {
        hourDiff = hourDiff * -1;
      }

      if (availabilityHourDiff < 0) {
        availabilityHourDiff = availabilityHourDiff * -1;
      }

      var clockOutTime = $(this).find(".shiftHours").text(hourDiff);
      var clockOutTime = $(this)
        .find(".shiftAvailabilityHours")
        .text(availabilityHourDiff);
    });
  }
});

/**
 * Modal Box
 */
$(function () {
  var appendthis = "<div class='modal-overlay js-modal-close'></div>";

  $("a[data-modal-id]").click(function (e) {
    e.preventDefault();
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(500, 0.7);
    var modalBox = $(this).attr("data-modal-id");
    $("#" + modalBox).fadeIn($(this).data());
  });

  $(".js-modal-close, .modal-overlay").click(function () {
    $(".modal-box, .modal-overlay").fadeOut(500, function () {
      $(".modal-overlay").remove();
    });
  });
});

/**
 * Radio check/uncheck
 */
const transferForms = document.getElementById("transferForms");
const swapForms = document.getElementById("swapForms");

function handleRadioClick() {
  if (document.getElementById("transfer").checked) {
    transferForms.style.display = "block";
    swapForms.style.display = "none";
  } else if (document.getElementById("swap").checked) {
    transferForms.style.display = "none";
    swapForms.style.display = "block";
  }
}

const radioButtons = document.querySelectorAll('input[name="ticketType"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("click", handleRadioClick);
});

$(document).ready(function () {
  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  $(".sunday").hide();
  $(".monday").hide();
  $(".tuesday").hide();
  $(".wednesday").hide();
  $(".thursday").hide();
  $(".friday").hide();
  $(".saturday").hide();

  $(".sunday input").attr("disabled", true);
  $(".monday input").attr("disabled", true);
  $(".tuesday input").attr("disabled", true);
  $(".wednesday input").attr("disabled", true);
  $(".thursday input").attr("disabled", true);
  $(".friday input").attr("disabled", true);
  $(".saturday input").attr("disabled", true);

  var date = $(".dateFormat").text();
  const d = new Date(date);
  let day = d.getDay();

  $(".day").append(dayArray[day + 1]);

  for (let i = 0; i < dayArray.length; i++) {
    console.log(day + 1);
    if (dayArray.indexOf(dayArray[day + 1]) == day + 1) {
      $("." + dayArray[day + 1].toLocaleLowerCase()).show();
      $("." + dayArray[day + 1].toLocaleLowerCase() + " input").attr(
        "disabled",
        false
      );
    }
  }
});
