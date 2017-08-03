var trendingPageLoaded = false
var statsPageLoaded = false

var hash = window.location.hash.substr(1);

switch(hash){
	case "stats":
		initStatsPage()
		break;

	case "trending":
		initTrendingPage()
		break;

	default:
		initTrendingPage()
		break;
}

$('#trending_link').click(function(){
	initTrendingPage()
})

$('#stats_link').click(function(){
	initStatsPage()
})

function initTrendingPage(){
	$('#stats_page').hide()
	$('#trending_page').show()

	if(!trendingPageLoaded){
		trendingPageLoaded = true;
		getYoutubeTrending()
		getBangkokPost()
		getGoogleNews()
		getPantip()
		getWeatherWarning()
		getTwitter()
	}
}

function initStatsPage(){
	$('#stats_page').show()
	$('#trending_page').hide()

	if(!statsPageLoaded){
		statsPageLoaded = true
		plotGraph()
	}
}


function getDateString(date){
	return date.getHours() + ":" + (String(date.getMinutes()).length == 2 ? date.getMinutes() : "0"+date.getMinutes()) + " " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
}

function numberWithCommas(x) {
	if(x){
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}else{
		return "-"
	}
}