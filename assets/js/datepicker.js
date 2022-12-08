$(function () {
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    duration: "fast",
    firstDay: 0,
    beforeShowDay: function (date) {
      //var sunday = new Date("June 2, 2013 00:00:00");
      var sunday = new Date();
      sunday.setHours(0, 0, 0, 0);
      //alert(sunday.getDay() + ' : ' + sunday.getDate() + ' : ' + (sunday.getDay() || 0) + ' : ' + sunday.getTime());
      sunday.setDate(sunday.getDate() - (sunday.getDay() || 0));
      var saturday = new Date(sunday.getTime());
      saturday.setDate(sunday.getDate() + 6);
      return [date >= sunday && date <= saturday, ""];
    },
  });

  $("#datepicker1").datepicker({
    dateFormat: "yy-mm-dd",
    duration: "fast",
    firstDay: 0,
    beforeShowDay: function (date) {
      //var sunday = new Date("June 2, 2013 00:00:00");
      var sunday = new Date();
      sunday.setHours(0, 0, 0, 0);
      //alert(sunday.getDay() + ' : ' + sunday.getDate() + ' : ' + (sunday.getDay() || 0) + ' : ' + sunday.getTime());
      sunday.setDate(sunday.getDate() - (sunday.getDay() || 0));
      var saturday = new Date(sunday.getTime());
      saturday.setDate(sunday.getDate() + 6);
      return [date >= sunday && date <= saturday, ""];
    },
  });

  $("#datepicker2").datepicker({
    dateFormat: "yy-mm-dd",
    duration: "fast",
    firstDay: 0,
    beforeShowDay: function (date) {
      //var sunday = new Date("June 2, 2013 00:00:00");
      var sunday = new Date();
      sunday.setHours(0, 0, 0, 0);
      //alert(sunday.getDay() + ' : ' + sunday.getDate() + ' : ' + (sunday.getDay() || 0) + ' : ' + sunday.getTime());
      sunday.setDate(sunday.getDate() - (sunday.getDay() || 0));
      var saturday = new Date(sunday.getTime());
      saturday.setDate(sunday.getDate() + 6);
      return [date >= sunday && date <= saturday, ""];
    },
  });
});
