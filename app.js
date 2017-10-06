const fs = require('fs')

const config = require('./config.json')
const avgIncome = fs.readFileSync('./public/average_income.csv', 'utf-8')

const googleTrends = require('google-trends-api');
const request = require('request')
const express = require('express')
const parseString = require('xml2js').parseString;
const csv = require('csv');
const dns = require('dns');

const app = express()
const port = 3001

var twitterTrendCache;

app.use(express.static('public'))

// app.get('/', function(){

// })

app.listen(port, function(){
	console.log('Thailand server started on port ' + port)
})


app.get('/api/googletrends', function(req, res){
	// googleTrends.interestOverTime({keyword: 'Women\'s march'})
	// .then(function(results){
	//   console.log('These results are awesome', results);
	//   res.end(results)
	// })
	// .catch(function(err){
	//   console.error('Oh no there was an error', err);
	//   res.end(err)
	// });	
})


// https://stackoverflow.com/questions/30475309/get-youtube-trends-v3-country-wise-in-json/30502270#30502270
// https://developers.google.com/apis-explorer/?hl=en_US#p/youtube/v3/youtube.videos.list
app.get('/api/youtubetrending', function(req, res){
	var regionCode = "TH"
	var url = "https://www.googleapis.com/youtube/v3/videos?" +
				"part=id,snippet,statistics" +
				"&chart=mostPopular" +
				"&regionCode=" + regionCode + 
				"&maxResults=25" + 
				"&key=" + config['google']['youtube_data']

	request(url, function(error, response, body){
		if(error){
			console.log(error)
			res.end('Error occurred getting youtube information')
		}else{
			res.header('Content-Type', 'application/json; charset=UTF-8')
			res.end(body)
		}
	})
})


app.get('/api/bangkokpost', function(req, res){
	var url = "http://www.bangkokpost.com/rss/data/topstories.xml"
	request(url, function(error, response, body){
		parseString(body, function(err, result){
			res.json(result)			
		})
	})
})

app.get('/api/tpbsfeed', function(req, res){
	var url = 'http://englishnews.thaipbs.or.th/feed/'
	request(url, function(error, response, body){
		parseString(body, function(err, result){
			res.json(result)			
		})
	})
})

app.get('/api/sanook', function(req, res){
	var url = "http://rssfeeds.sanook.com/rss/feeds/sanook/hot.news.xml"
	request(url, function(error, response, body){
		parseString(body, function(err, result){
			res.json(result)			
		})
	})
})

app.get('/api/googlenews', function(req, res){
	var url = "https://news.google.com/news/rss/headlines?ned=th_th&hl=th"
	request(url, function(error, response, body){
		parseString(body, function(err, result){
			res.json(result)			
		})
	})
})



app.get('/api/pantiptrending', function(req, res){
	var url = "https://pantip.com/home/ajax_pantip_trend?p=1"
	var options = {
	  url: url,
	  headers: {
	    'origin': 'https://pantip.com/'
	  }
	};
	request(options, function(error, response, body){
		res.header('Content-Type', 'application/json; charset=UTF-8')
		res.end(body)			
	})
})

app.get('/api/pantipfeed', function(req, res){
	var url = "https://pantip.com/forum/feed"
	request(url, function(error, response, body){
		parseString(body, function(err, result){
			res.json(result)			
		})
	})

})

app.get('/api/averageincome', function(req, res){
	csv.parse(avgIncome, function(err, data){
		res.json(data)
	})
})


app.get('/api/WeatherWarningNews', function(req, res){
	var url = "http://data.tmd.go.th/api/WeatherWarningNews/v1/?format=json&uid=" + config['tmd_api']['uid'] + "&ukey=" + config['tmd_api']['ukey']
	request(url, function(error, response, body){
			res.header('Content-Type', 'application/json; charset=UTF-8')
			res.end(body)		
	})

})

//Rate limited to 75 calls in 15 minutes window
app.get('/api/twittertrend', function(req, res){
	if(!twitterTrendCache || (twitterTrendCache && twitterTrendCache.date && checkTimeOver(twitterTrendCache.date))){
		query()
	}else{
		res.header('Content-Type', 'application/json; charset=UTF-8')
		res.end(twitterTrendCache.data)
	}

	function query(){
		var url = "https://api.twitter.com/1.1/trends/place.json?id=" + config['twitter']['th_woeid']
		var options = {
			url: url,
			headers: {
				"Authorization": "Bearer " + config['twitter']['real_access_token']
			}
		}
		request(options, function(error, response, body){
			twitterTrendCache = {date: new Date(), data: body}
			res.header('Content-Type', 'application/json; charset=UTF-8')
			res.end(body)
		})
	}

})

function checkTimeOver(date){
	var now = new Date().getTime()
	var then = date.getTime()
	if((now - then) > 1000 * 60 * 30){
		return true
	}
	return false
}
