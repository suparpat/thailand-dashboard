function getYoutubeTrending(){
	$.get( "api/youtubetrending", function( data ) {
		var temp = "<h2>YouTube</h2><table style='width:320px; margin-right:0; margin-left:auto;'>"
		var limit = 15
		data['items'].slice(0, limit).forEach((i, index) => {
			if(i['statistics'] && i['snippet'] && i['snippet']['thumbnails']){
				temp += "<tr>"

				temp += "<td style='padding-top:20px'><strong>" + i['snippet']['title'] + "</strong><br>" + 
				"<a target='_blank' href='https://www.youtube.com/watch?v=" + i['id'] + "'>" +
				"<img src='" + i['snippet']['thumbnails']['medium']['url'] + "'>"

				var tempDate = new Date(i['snippet']['publishedAt'])

				temp += "</a><br>published at: " + getDateString(tempDate) + "<br>views: " + numberWithCommas(i['statistics']['viewCount']) + 
				" likes: " + numberWithCommas(i['statistics']['likeCount']) + 
				" dislikes: " + numberWithCommas(i['statistics']['dislikeCount']) + 
				"</td>"

			}
		})
		temp += "</table>"

		$('#youtubetrending').html(temp)
	});

}

function getBangkokPost(){
	$.get( "api/bangkokpost", function( data ) {
		var temp = "<h2>Bangkok Post [Top Stories]</h2><table>"
		data['rss']['channel'][0]['item'].forEach((i, index) => {
			temp += "<tr>"

			temp += "<td style='padding-top:10px'><a target='_blank' href='" + i['link'] + "'>" + 
					i['title'] + "</a><br>" + 
					i['description']
			temp += "</td>"

		})
		temp += "</table>"

		$('#bangkokpost').html(temp)
	});
}


function getGoogleNews(){
	$.get( "api/googlenews", function( data ) {
		var temp = "<h2>Google News</h2><table>"
		data['rss']['channel'][0]['item'].forEach((i, index) => {
			temp += "<tr>"

			temp += "<td style='padding-top:10px'><a target='_blank' href='" + i['link'][0] + "'>" + 
					i['title'][0] + "</a><br>" + getDateString(new Date(i['pubDate']))
			temp += "</td>"

		})
		temp += "</table>"

		$('#googlenews').html(temp)
	});
}

function getPantip(){
	$.get( "api/pantiptrending", function( data ) {
		var temp = "<h2>Pantip Trending</h2><table>"
		data['trend'].forEach((i, index) => {
			temp += "<tr>"

			temp += "<td style='padding-top:10px'><a target='_blank' title='" + i['disp_msg'] + "' href='https://pantip.com/topic/" + i['topic_id'] + "'>" + 
					i['disp_topic'] + "</a>"
			temp += "</td>"

		})
		temp += "</table>"

		$('#pantip').html(temp)
	});

	// $.get( "https://pantip.com/forum/feed", function( data ) {
	// 	var temp = "<h2>Pantip Feed</h2><table>"
	// 	var x2js = new X2JS()
	// 	var json = x2js.xml_str2json(data)
	// 	console.log(json)
	// 	json['rss']['channel'][0]['item'].forEach((i, index) => {
	// 		var temp_cats = []

	// 		if(i['category']){
	// 			i['category'].forEach((c) => {
	// 				temp_cats.push(c['_'])
	// 			})
	// 		}

	// 		temp += "<tr>"

	// 		temp += "<td style='padding-top:10px'><a target='_blank' title='" + i['description'] + "' href='" + i['link'] + "'>" + 
	// 				i['title'] + "</a>" + (temp_cats.length > 0 ? "<br> [" + temp_cats.join(", ") + "]" : "") + "<br>" + getDateString(new Date(i['pubDate']))
	// 		temp += "</td>"

	// 	})
	// 	temp += "</table>"

	// 	$('#pantip').html(temp)
	// });
}

function getWeatherWarning(){
	$.get("api/WeatherWarningNews", function(data){
		var temp = ""
		temp += "<a target='_blank' href='https://www.tmd.go.th/list_warning.php'>" + data['WarningNews']['TitleThai'] + "</a>"
		$('#weatherWarning').html(temp)
	})
}

function getTwitter(){
	$.get("api/twittertrend", function(data){
		var temp = "<h2>Twitter Trends</h2><ul>"
		data[0]['trends'].forEach((d) => {
			temp += "<li><a target='_blank' href=" + d['url'] + ">" + d['name'] + "</a></li>" 
		})
		temp += "</ul>"
		$('#twitter').html(temp)
	})	
}
