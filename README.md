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

#Source Code:

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

















































