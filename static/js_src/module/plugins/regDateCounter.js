var bigMonth = {'1': 1,'3': 1, '5': 1, '7': 1, '8': 1, '10': 1, '12': 1};
var months = [
	{value: '', text: 'Month'},
	{value: '1', text: 'January'},
	{value: '2', text: 'February'},
	{value: '3', text: 'March'},
	{value: '4', text: 'April'},
	{value: '5', text: 'May'},
	{value: '6', text: 'June'},
	{value: '7', text: 'July'},
	{value: '8', text: 'August'},
	{value: '9', text: 'September'},
	{value: '10', text: 'October'},
	{value: '11', text: 'November'},
	{value: '12', text: 'December'}
];

var formUI = require('../ui/form');
var yearSelect = formUI.sels.year,
	monthSelect = formUI.sels.month,
	daySelect = formUI.sels.day,
	currentMonth = new Date().getMonth() + 1,
	currentDate = new Date().getDate();

yearSelect.on('change', function (){
	updateMonth();
});
monthSelect.on('change', function (){
	updateDates();
});
monthSelect.on('update', function (){
	updateDates();
});

yearSelect.emit('change');

function updateMonth(){
	if(yearSelect.value === yearSelect.datas[1].value){
		var monthNum = currentMonth, fixmonths = [];
		for(var i = 0; i <= monthNum; i++){
			fixmonths.push(months[i]);
		}
		monthSelect.update(fixmonths);
	} else {
		monthSelect.update(months);
	}
}
function updateDates(){
	var year = yearSelect.value, month = monthSelect.value;
	var datesNum = bigMonth[month] ? 31 : (month === 2 ? ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0) ? 29 : 28) : 30);
	if(year == yearSelect.datas[1].value && month == currentMonth){
		datesNum = new Date().getDate(); // 最小年 最小月日期不超过今日
	}
	var dates = [{text: 'Day', value: ''}];
	for(var i = 1; i <= datesNum; i++){
		dates.push({value: i, text: i});
	}
	daySelect.update(dates);
}