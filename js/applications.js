//this file can be used to add any type of "custom" event that a client my be interested in seeing in a dashbaord
MP.api.segment('Loan Application Successful', {from: moment().subtract(30, 'days'), unit: 'day'}).done(function(transferResults) {
	//chart monthly transfer date
    var transferData = transferResults.values()
    console.log("loans data", transferData);
    var transferChart = $('#transfer-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
      legend: {
        enabled: true,
        y:-7
      },
    }});
    transferChart.MPChart('setData', transferResults.values()); // Set the chart's data
	$("#transfer-header").show()           //display chart header
	//update the transfer header pannel
	var today = moment().format('YYYY-MM-DD')
	var todaysLoans = transferData['Loan Application Successful'][today]
  console.log("loans header", todaysLoans);
	$('#dau-header').text(addCommas(todaysLoans));
});

//get the average transfer amount
var avgparams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Total Loan Amount"]', 	// selector
    'method': 'average'

};
var minParams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Total Loan Amount"]', 	// selector
    'method': 'min'

};
var maxParams = {
    from: moment().subtract(30, 'days'),    // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    limit: 100,                             // maximum number of results to return
    type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
    'on': 'properties["Total Loan Amount"]', 	// selector
    'method': 'max'

};

//get averages
MP.api.segment('Loan Application Successful', avgparams).done(function(avgTransferResults) {
	//get max
	MP.api.segment('Loan Application Successful', minParams).done(function(minTransferResults) {
		//get min
		console.log('min trans', minTransferResults.values())
		MP.api.segment('Loan Application Successful', maxParams).done(function(maxTransferResults) {
			//get averages
			console.log('max trans', maxTransferResults.values())
			var transferData  = {}
			//combine data for graphing
			transferData['Max Loan Granted'] = maxTransferResults.values()
			transferData['Min Loan Granted'] = minTransferResults.values()
			transferData['Average Loan Granted'] = avgTransferResults.values()
			var transferAmountChart = $('#transfer-amounts-graph').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
		      legend: {
		        enabled: false,
		        y:-15
		      }
		    }});
		 $("#transfer-amount-header").show()           //display chart header
		 transferAmountChart.MPChart('setData', transferData); // Set the chart's data
		})
	})
})
