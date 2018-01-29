![](http://prowebscraping.com/wp-content/uploads/2015/10/web-scraping-vs-web-crawling.png)
# The-Node.js-Web-Crawler
A Simple Web Crawler By Using Node.JS

<ol>
  <h3>Steps to make a web crawler</h3>  
  <li>Install Node.js from  https://nodejs.org/en/  and also Npm from https://www.npmjs.com/</li>
  <li>Get all hyperlinks from Very first Web-Page by using jquery selectors</li>
  <li>After that just store all these hyperlins into a array or queue/</li>
  <li>Then follow first hyperlink by using recursion method of function/</li>
  <li>Follow till the queue gets empty/</li>
  <li>get .csv output by using File write method of Node.js</li>
</ol>

// Declare All modules

var request = require('request');

var cheerio = require('cheerio');

var parallelLimit = require('run-parallel-limit');

var fs = require('fs');

// Save first URL

var Start_Url = "https://medium.com/";

var next_pages = [];   // declare an array for store all the Hyper links of first page

var currentPage = 0;   // take a currentPage so we can move to next page by increment this one

next_pages.push(Start_Url); // put first URL inside the next_pages array 

var next = next_pages.pop(); // Take a first URL inside the next 

// All parallel requests

var tasks = [

	function (callback) {
		setTimeout(function () {
			callback(null, 'one')
		}, 200)
		console.log("this is first request");
	},
	
	function (callback) {
		setTimeout(function () {
			callback(null, 'two')
		}, 200)
		console.log("this is Second request");
	},
	
	function (callback) {
		setTimeout(function () {
			callback(null, 'three')
		},200)
		console.log("this is Thrid request");	
	},
	
	function (callback) {
		setTimeout(function () {
			callback(null, 'four')
		},200)
		console.log("this is Fourth request");
	},
	
	function (callback) {
		setTimeout(function () {
			callback(null, 'five')
		},200)
		console.log("this is Fifth request");
	},
]

Crawl(next); // Call the Main function which Crawls the web pages

function Crawl(next)
	{
	
	// It's generate 5 parallel request at a time 
		
		parallelLimit(tasks, 5, function (err, results) { 
	
	// request module 
	
		request(next,function(error, response, html) 
		
			{
			
			if (!error && response.statusCode == 200) 
			
			{     
	
	// parse the HTML document by using cheerio module
		
			var $ = cheerio.load(html);
	
	// select all the a tags for getting their hyper links
		
			$('a').each(function()
			
			{
			
			var a = $(this).attr('href');
			
			console.log(a);
	
	// Save all the hyper links inside next_pages array
		
			next_pages.push(a);
	
	// move to second page
			
			next = next_pages[currentPage++];
	
	// Save the Data inside a .CSV file
			
			require('fs').writeFileSync('pages.csv', next_pages.join('\r\n'));
	
	// Keep Scraping web pages by using Recursion of this function 
			
			Crawl(next);
		         })	
		   }
	    })			
     });
	
}



















































