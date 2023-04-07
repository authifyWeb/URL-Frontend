const el = document.querySelector(".searchterm");
var authData;


/* Initialising typeahead-standalone.js: https://typeahead.digitalfortress.tech/ */

typeahead({
    input: el,
    source: {
    remote: {
        url: "https://apiurl-theta.vercel.app/api/products?alias=%QUERY", 
		wildcard: "%QUERY",


      requestOptions: {}
        },
        
		
		
	identifier: 'alias',
	
    transform: (data) => { 
    return data.Source;
    },
	
  identity: (suggestion) => `${suggestion.name}`
	},
	
	
  display: (item, event) => {
    

    return `${item.name}`;
	 },
	


debounceRemote: 300,
highlight: true,
className: 'typeahead-sgst',
minLength: 3,
preventSubmit: false,
limit:25,
hint: false,
autoSelect: false,
templates: {
    suggestion: (authifyURL) => (
		
    `<div  class="single-item">
      <img src=${authifyURL.logo} style="background-color:${authifyURL.bg}; font-size:12px;" loading="lazy">
      <div class="details">
      <div class="company_name"><span>${authifyURL.name}</span><span> <img class="badge" src="images/goldbadge.svg"></span></div>
	  <div class="company_type">${authifyURL.cat}: ${authifyURL.origin} </div>
    </div></div>`
    ),
   
header: (resultSet) => `Results for <span style="color:#A2FB15; background-color:#1f282d; text-transform: uppercase;">" ${resultSet.query} "</span> : ${resultSet.count} `,
notFound: (resultSet) => {   return `Nothing found for <span style="color:yellow; background-color:#1f282d; text-transform: uppercase;">" ${resultSet.query} "</span>`;},

footer:() => 'an <a href="https://authifyweb.com" target="_blank" style="color:goldenrod; font-size:14px;"> authifyWeb</a> project',
loader: () => '<div style="text-align: center"><img src="images/loader.svg" /></div>',
},

onSubmit: (e, selectedSuggestion) => {



 
if (selectedSuggestion) {

 document.getElementById('output'),innerHTML ="";
 document.getElementById("compatible").innerHTML ="";
const myJSON = JSON.stringify(selectedSuggestion);
const outp=JSON.parse(myJSON);
const {name, urls,type,id,official} = outp;
console.log(myJSON)
//console.log(outp)
authData=outp;









document.getElementById('naam').innerHTML = `<p style="font-size:1em;"> Submit URL below to verify whether the site belongs to <span style="color:#DFB014 "> ${name} </span></> </p>`;

var form=`<input type='url' id='link_id'  autocomplete="off" placeholder="Paste the URL" > `;
var btn=`<input type="submit" id="search_btn" value="Search 🔍" onClick="searchNow()" > <p style="color:white; font-size:12px; padding-top:2px;">Please use a valid URL format (with https://). Or else no data will be displayed.</p><div class="refresh_btn_box" style="margin-top:5px; margin-bottom:5px;"><button type="button"; onClick="window.location.reload()">Search Another Link </button></div> `;
input_form.innerHTML=form;
input_btn.innerHTML=btn;




}

}



});	 



input_form.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
     
      case "Enter":
        searchNow();
        link_id.blur();
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  
function searchNow()
{   var input = document.getElementById('link_id').value;
	
	
	document.getElementById("data").innerHTML ="";
	document.getElementById("disclaimer").innerHTML ="";
    var url = new URL(input);
	
    var hostname = url.hostname;
    var protocol = url.protocol;
    var origin = url.origin;
    var href= url.href;
    var pathname= url.pathname;

    var output= authification(url, href, origin, hostname,protocol,pathname); 
		
			data.innerHTML = (output || "...Verifying");
			




}

function authification(url, href, origin, hostname,protocol,pathname)
{
	if(protocol != "https:" ) {return `<p style="padding:40px; color:lightred;"> This website is not secure. Please refrain from submitting personal data and don't download files from such sources</p>`;}

  else if(origin=="https://duckduckgo.com")
  { if(pathname=="/") return `<p> This is DuckDuckGo Search Results page. Be wary of the links you click from a results page.</p>`;
    else{ link=hostname; var output = compare(link); return output;}
  } 
  else if(origin=="https://www.bing.com") 
		{ if(pathname=="/search" || pathname=="/shop") { return `<p> This is Microsoft Bing Search Results page. Be wary of the links you click from a results page.</p>`;}
		else{ link=hostname; var output = compare(link); return output;}
		}
    else if(hostname=="www.google.com"||hostname=="www.google.ca"||hostname=="www.google.co.in"||hostname=="www.google.co.uk"||hostname=="europe.google.com"){
      var hostname="www.google.com"; 				
        if(pathname=="/search") /*||pathname=="/"||pathname=="/webhp"*/
        {
          return `<p> This is Google Search Results page. Be wary of the links you click from a results page.</p>`;
        }
        else{link=hostname; var output=compare(link); return output;}
  
    }
    else if(hostname=="search.yahoo.com"||hostname=="in.search.yahoo.com"||hostname=="uk.search.yahoo.com"||hostname=="us.search.hostname.com"){

      if(pathname.split(';')[0]=="/search")
      {
        return `<p>This is Yahoo Search Results page. Be wary of the links you click from a results page.</p>`;
      }
    }
    else if(origin=="https://search.brave.com") 
		{ return `<p> This is Brave Search Results page. Be wary of the links you click from a results page.</p>`;}		
	else if( origin =="https://www.facebook.com" )  
			{	
				link= hostname+'/'+pathname.split('/')[1];
				var output = compare(link);
				return output;
			}
	else if(origin =="https://twitter.com")
			{
				
				link=hostname+'/'+pathname.split('/')[1].toLowerCase();
				var output = compare(link);	
				return output;
			}
	else if(origin=="https://www.youtube.com")
      {
        var channel=(pathname.split('/')[1]);
        if(channel=="channel") { link = hostname +'/' +pathname.split('/')[1]+ '/' + pathname.split('/')[2];}
        else if(channel=="c") { 
        var id=pathname.split('/')[2].toLowerCase();
        link= hostname+'/'+id}
        else{link=hostname+'/'+pathname.split('/')[1].toLowerCase();}
        var output = compare(link);	
        return output;
      }
	else if( origin=="https://www.twitch.tv" || origin=="https://www.instagram.com" )
			{
				link = hostname + pathname.toLowerCase(); 
				var output = compare(link); 
			  return output;
			}
	else if(origin=="https://www.reddit.com" || origin=="https://old.reddit.com")
			{	
				link=hostname +'/' +pathname.split('/')[1]+ '/' + pathname.split('/')[2].toLowerCase();
				var output = compare(link);
				return output;
			}
	else if(origin == "https://github.com")
				{
				var id= pathname.split('/')[1];
					
					if(id=="orgs" || id=="sponsors")
						{ var link= hostname+'/'+pathname.split('/')[2].toLowerCase();
						}
					else{
						var link=hostname+'/'+pathname.split('/')[1].toLowerCase();
						}
				var output = compare(link);	
				return output;	
				}
	else if(origin == "https://ko-fi.com" || origin =="https://www.buymeacoffee.com" || origin=="https://liberapay.com" || origin =="https://opencollective.com")
				{
					
					link=hostname+'/'+pathname.split('/')[1].toLowerCase();
					var output = compare(link);
					return output ;
				}

else if(hostname == "addons.mozilla.org")
        /*Once the above condition is true, the function replaces the URL language to the the default en-US. This is used since mozilla supports multiple languages and the url structure is directly based on user language.  */
          { lang=pathname.split('/')[1];
            default_lang=lang.replace(lang,"en-US"); 
          link= hostname +'/'+ default_lang+ '/' +pathname.split('/')[2]+'/'+pathname.split('/')[3]+'/'+pathname.split('/')[4];
          var output = compare(link);
          return output;
      
          }   
             
else if(hostname+'/'+pathname.split('/')[1] == "chrome.google.com/webstore")
          {
            link= hostname +'/'+pathname.split('/')[1] +'/'+ pathname.split('/')[2] +'/'+ pathname.split('/')[3] +'/'+ pathname.split('/')[4]
            var output= compare(link);
            return output;
          }		

else if(hostname == "microsoftedge.microsoft.com")
        {
          link=hostname+'/'+pathname;
          var output= compare(link);
          return output;
        }

else if(hostname == "addons.opera.com")
        {
          lang=pathname.split('/')[1];
          default_lang=lang.replace(lang,"en");
          link= hostname +'/'+ default_lang+'/' +pathname.split('/')[2]+'/'+pathname.split('/')[3]+'/'+pathname.split('/')[4];
          var output = compare(link);
          return output;
        }        
   
					
	else{var output= compare(hostname);
				return output ;
			}
}

function compare(link){
var json = authData; 

var new_link=link;
var cl= json.urls;


for(i=0;i<cl.length;i++){

    if(json.urls[i]===link)
      {//console.log("Yay")
      var Data=`<div style="color:white;font-size:12px; background-color:#1f282d;">  ` + new_link + `</br> <p> <span style="color:#A2FB15; font-size: 14px; ">Verified by authifyURL.</span> &nbsp;<span class="tooltip" > ✅ <span class="tooltiptext">This website is valid and legal. </span> </p></br> <p><span style="font-size:14px; color:white;">The page you submitted belongs to: </span><br> <span class="op_logo"><img src=${json.logo}></span><span style="font-size:18px; color: #DFb014"> ` +json.name+ `</span></p></br></div>` ;
                
                var Disclaimer=`Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white"; target ="_blank"> how we verify</a> what is valid and what is not. </br>`;
                data.innerHTML= Data;
                disclaimer.innerHTML=Disclaimer;
				no_promote.innerHTML="";
              return Data;
      }
} 
 
   // console.log("Nop")
    var Data = `<div style=" color:white; background-color:#1f282d; font-size:12px;" >` + new_link + `<p><br><span style="color:red;  font-size: 18px;"> The page you submitted doesn't belong to the organisation selected above</span>&nbsp; <span class="tooltip"> ❌ <span class="tooltiptext">Possibly scam. Report the page directly to the owner. </span> </p> </div>` ;
	/*if(json.off != ""){
		console.log("Not Empty");
	var Official = `<div style="font-size:10px;">To visit the official website of <span> `+json.id+` </span>use <a href="${json.off}">`+ json.off+` </a></div>`;
	official.innerHTML=Official;}*/
  var Disclaimer=`<br>Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white;" target ="_blank"> how we verify</a> what is valid and what is not. </br> </div>`;
  data.innerHTML= Data;

  disclaimer.innerHTML=Disclaimer;
  no_promote.innerHTML="";
  return Data;













}


/* Loader or the svg spinner is modified from the works of Utkarsh Verma https://github.com/n3r4zzurr0/svg-spinners (MIT)  */