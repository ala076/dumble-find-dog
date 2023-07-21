var today = dayjs();
var dayWeek = today.format('[Today is] dddd');
$('#dayJsEl').text(dayWeek);