
function getAverageIncome(cb){
	$.get( "api/averageincome", function( data ) {
		cb(data)
	});
}

function plotGraph(){
	getAverageIncome(function(data){
		var myLabels = data[3].slice(2,12)
		var nationalAvg = data[6].slice(2,12)
		var bangkokAvg = data[8].slice(2,12)
		var centralAvg = data[12].slice(2,12)
		var northAvg = data[35].slice(2,12)
		var northeastAvg = data[53].slice(2,12)
		var southernAvg = data[74].slice(2,12)

		var ctx = document.getElementById("myChart").getContext('2d');
		document.getElementById("myChart").height = 200;
		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: myLabels,
		        datasets: [{
		            label: 'National',
		            data: nationalAvg,
    			    fill: false,
    			    backgroundColor: 'red',
    			    borderColor: 'red'
		        },
		        {
		            label: 'Bangkok',
		            data: bangkokAvg,
    			    fill: false,
    			    backgroundColor: 'orange',
    			    borderColor: 'orange'
		        },
		        {
		            label: 'Central Region',
		            data: centralAvg,
    			    fill: false,
    			    backgroundColor: 'black',
    			    borderColor: 'black'
		        },
		        {
		            label: 'Northern Region',
		            data: northAvg,
    			    fill: false,
    			    backgroundColor: 'pink',
    			    borderColor: 'pink'
		        },
		        {
		            label: 'Northeastern',
		            data: northeastAvg,
    			    fill: false,
    			    backgroundColor: 'green',
    			    borderColor: 'green'
		        },
		        {
		            label: 'Southern',
		            data: southernAvg,
    			    fill: false,
    			    backgroundColor: 'blue',
    			    borderColor: 'blue'
		        }],
		    },
		    options: {
		    	title: {
		    		display: true,
		    		text: "Thailand Household Income"
		    	}
		        // scales: {
		        //     yAxes: [{
		        //         ticks: {
		        //             beginAtZero:true
		        //         }
		        //     }]
		        // }
		    }
		});

		var ctxbar = document.getElementById("myBar").getContext('2d');
		document.getElementById("myBar").height = 200;
		var barData = []
		var barLabels = []

		for(var i = 8; i < 89; i++){
			barData.push({
				value: data[i][11],
				label: data[i][0]
			})
		}

		barData = barData.sort((a, b) => {
			return b.value - a.value
		})

		var myChart = new Chart(ctxbar, {
		    type: 'bar',
		    data: {
		        labels: barData.map((d) => {
		        	return d.label
		        }),
		        datasets: [{
		        	"label": "Income per province",
		        	"data": barData.map((d) => {
		        		return d.value
		        	}),
		        	"backgroundColor": 'orange'
		        }]
		    },
		    options: {
		    	title: {
		    		display: true,
		    		text: "Thailand Household Income by Province in 2558"
		    	},
		    	scales: {
		    		xAxes: [{
		    			ticks: {
		    				autoSkip: false,
		    				maxRotation: 90,
		    			}
		    		}]
		    	}
		    }
		});	


	})

}

