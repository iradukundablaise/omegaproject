$('#time').timepicker({
    timeFormat: 'HH:mm',
});

$("#date").datepicker({
    altFormat: "dd/mm/yy",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    minDate: new Date()
})