var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var Start_Url = "https://medium.com/";
var next_pages = [];
var currentPage = 0;
next_pages.push(Start_Url);
var next = next_pages.pop();
	Crawl(next);
function Crawl(next)
{	

		request(next,function(error, response, html) 
			 {
		     if (!error && response.statusCode == 200) 
			 {
		     var $ = cheerio.load(html);
		     $('a').each(function()
		  	 {
		     var a = $(this).attr('href');
		    	console.log(a);
		    	next_pages.push(a);
		    next = next_pages[currentPage++];
		    require('fs').writeFileSync('pages.csv', next_pages.join('\r\n'));
	      Crawl(next);
		     })
		     
		     }
			 })			
}