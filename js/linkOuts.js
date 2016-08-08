$('.panel-footer-revenue').click(function () {
	 var today = new Date().toISOString().split('T')[0]
	 var a = new Date();
	 var yesterday  = new Date(a.setDate(a.getDate() - 1)).toISOString().split('T')[0];
	 var params = {
	 	start_date: yesterday,
	 	end_date: today
	 }
	 MP.api.jql( function main() {
	        return Events({
	          from_date: params.start_date,
	          to_date:   params.end_date
	        })
	        .filter(function(event){
	          //change this value to the property where revenue is stored
	          var type = event.properties["$revenue"]
	          type = typeof type
	          if (type === "number"){
	            return event
	          }
	        })
	        // change this value if your utm campaign params are different
	        .groupBy(["name"], mixpanel.reducer.count())
	        .reduce(mixpanel.reducer.top(1))
    }, params).done(function(results) {
	    console.log(results)
	    //grab the top event that is generating revenue and store as a variable
	    var revenueEvent = results[0][0].key[0]
	    console.log(revenueEvent)
	    var mp_url_platform = window.document.referrer.split('/mpplatform')[0]
	    console.log(mp_url_platform)
	    var mp_url_segmentation = mp_url_platform + "/segmentation/#action:sum,arb_event:"+revenueEvent+",bool_op:and,chart_analysis_type:linear,chart_type:line,from_date:-29,ms_checked:("+revenueEvent+":!t),ms_values:!("+revenueEvent+"),segfilter:!((dropdown_tab_index:0,property:(name:'$revenue',source:properties,type:number),selected_property_type:number,type:number)),segment_type:number,to_date:0,type:general,unit:day"
	    window.open(mp_url_segmentation)
	})
})
$('.panel-footer-dau, .panel-footer-avg-events, .panel-footer-mau').click(function () {

	    //grab the top project numbe and url from the window and store so we can redirect to top evnts in segmentation
	    var mp_url_platform =   window.document.referrer.split('/mpplatform')[0]
	    console.log(mp_url_platform)
	    var mp_url_segmentation = mp_url_platform + "/segmentation/#action:segment,arb_event:"
	    window.open(mp_url_segmentation)
})
$('#marketing-table-header').click(function () {

	    //grab the top project numbe and url from the window and store so we can redirect to top evnts in segmentation
	    var mp_url_platform =   window.document.referrer.split('/mpplatform')[0]
	    console.log(mp_url_platform)
	    var mp_url_segmentation = mp_url_platform + "/segmentation/#action:average,arb_event:'Loan%20Application%20Successful',bool_op:and,chart_type:bar,from_date:-29,ms_checked:('All%20Adwords':!t,'Facebook%20Audience':!t,'Facebook%20Mobile%20Video':!t,'New%20Users':!t,'Philly%20Local%20Push':!t,'SMB%20Sweep':!t,'Short%20Term%20Loan%20Promotion':!t,'TechCrunch%20Article':!t,'Venture%20Beat%20Article':!t),ms_values:!('Short%20Term%20Loan%20Promotion','SMB%20Sweep','TechCrunch%20Article','New%20Users','All%20Adwords','Facebook%20Mobile%20Video','Facebook%20Audience','Philly%20Local%20Push','Venture%20Beat%20Article'),segfilter:!((dropdown_tab_index:0,property:(name:'Total%20Loan%20Amount',source:properties,type:number),selected_property_type:number,type:number)),segment_type:number,subsegment_property:(name:utm_campaign,source:properties,type:string),subsegment_type:string,to_date:0,type:general,unit:day"
	    window.open(mp_url_segmentation)
})
