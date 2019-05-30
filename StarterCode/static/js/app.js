// from data.js
var tableData = data;

var filterCriteria = {};

var filteredData = tableData;

var filterTableBtn = d3.select("#filter-btn");

var tbody = d3.select("tbody");	

var keyAndOptions = [{
		fieldName: 'Date', 
		tableKey: 'datetime'
	},
	{
		fieldName: 'City', 
		tableKey: 'city'
	},
	{
		fieldName: 'State', 
		tableKey: 'state'
	},
	{
		fieldName: 'Country', 
		tableKey: 'country'
	},
	{
		fieldName: 'Shape', 
		tableKey: 'shape'
	}
];

Object.entries(keyAndOptions).forEach(([key, value]) => selectAndPopulate(value.fieldName, value.tableKey));

function selectAndPopulate(fieldName, tableKey) {

	var field_menu = d3.select('#sel'+fieldName);

	var optionsArray = [...new Set(tableData.map(sighting => sighting[tableKey]))];
	optionsArray.unshift('Any');
	optionsArray.forEach(option => field_menu.append('option').attr('value', option).text(option.toUpperCase()));
}

function updateFilteredData(queryField, queryValue) {

	filteredData = tableData; 

	filterCriteria[queryField] = queryValue;

  	Object.entries(filterCriteria).forEach(([key, value]) => {
		filteredData = filteredData.filter(function (sighting) {
			if (value === 'Any') {
				return sighting[key];
			} else {
				return sighting[key] === value;
			}
		});
  	});
}

filterTableBtn.on("click", function() {

	d3.event.preventDefault();

	updateTbody(filteredData);
});

function updateTbody(filteredData) {

	tbody.text('');

	filteredData.forEach(record => { 

		var row = tbody.append('tr');

		Object.entries(record).forEach( ([key, value]) => {

			row.append('td').text(value);
		});
	});
}