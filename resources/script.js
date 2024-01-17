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
notFound: (resultSet) => {   return `Nothing found for <span style="color:yellow; background-color:#1f282d; text-transform: uppercase;">" ${resultSet.query} "</span>. `;},

footer:() => 'an <a href="https://authifyweb.com" target="_blank" style="color:goldenrod; font-size:14px;"> authifyWeb.com</a> project ',
loader: () => '<div style="text-align: center"><img src="images/loader.svg" /></div>',
/*empty: (resultSet) => {
  return `<div style="font-size:12px;">Enter organisation name and click enter</div>`;
    },*/
},

onSubmit: (e, selectedSuggestion) => {
 
if (selectedSuggestion) {
 //Clear previous data 
  data.innerHTML = "";
  disclaimer.innerHTML = "";
  error_message.innerHTML="";
 
const myJSON = JSON.stringify(selectedSuggestion);
const outp=JSON.parse(myJSON);
const {name, urls,type,id,official} = outp;

authData=outp;

//document.getElementById('output').innerHTML ="";
document.getElementById("compatible").innerHTML ="";
document.getElementById("verify_your_company").innerHTML ="";

document.getElementById('naam').innerHTML = `<p style="font-size:1em;"> Submit URL below to verify whether the site belongs to <span style="color:#DFB014 "> ${name} </span></> </p>`;

var form=`<input type='url' id='link_id'  autocomplete="off" placeholder="Paste the URL" > `;
var btn = `<input type="submit" id="search_btn" value="Search 🔍"> <p style="color:white; font-size:12px; padding-top:2px;">Please use a valid URL format (with https://). Otherwise, no data will be displayed.</p><div class="refresh_btn_box" style="margin-top:5px; margin-bottom:5px;"><button type="button" id="refresh_btn">Search Another Link</button></div> `;

input_form.innerHTML=form;
document.getElementById('input_btn').addEventListener('click', searchNow);
input_btn.innerHTML=btn;
no_promote.innerHTML="";

document.getElementById('refresh_btn').addEventListener('click', function() {
  window.location.reload();
});


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
  document.getElementById("error_message").innerHTML = ""; 

  try {
    var url = new URL(input);
    // URL format is valid, continue with your code logic
  } catch (error) {
    // URL format is not valid, show an error message
    var err_msg= `<p id="err_msg"style="margin-top:5px;">Submit a valid URL (eg https://url.authifyweb.com).</p>`;
    error_message.innerHTML=err_msg;
    
    return; // stop further execution
  }
	
    var hostname = url.hostname;
    var protocol = url.protocol;
    var origin = url.origin;
    var href= url.href;
    var pathname= url.pathname;
    var search = url.search;

    var domain = filterdomain_from_hostname(hostname);
    

    var output = filtering(url, href, origin, hostname,protocol,pathname,search,domain);
		
			data.innerHTML = (output || "...Verifying");
			




}

function filterdomain_from_hostname(hostname)
{
  var parts = hostname.split('.');
  var domain;

  if (parts.length > 2) {
    if (parts[parts.length - 2].length === 2 || parts[parts.length - 2].length === 3) {
      domain = parts.slice(-3).join('.');
    } else {
      domain = parts.slice(-2).join('.');
    }
  } else {
    domain = hostname;
  }

  return domain;

}

function compare(link,display_link){

var json = authData; 


var cl= json.urls;


var conditionMet = false; // Flag variable to track if the condition is met

for (var i = 0; i < cl.length; i++) {
  if (json.urls[i] === link) {
    var Data = `<div style="color:white;font-size:12px; background-color:#1f282d;">` + display_link + `</br> <p> <span style="color:#A2FB15; font-size: 14px; ">Verified by authifyURL.</span> &nbsp;<span class="tooltip" > ✅ <span class="tooltiptext">This website is valid and legal. </span> </p></br> <p><span style="font-size:14px; color:white;">The page you submitted belongs to: </span><br> <span class="op_logo"><img src="${json.logo}"></span><span style="font-size:18px; color: #DFb014"> ${json.name}</span></p></br></div>`;
                
    var Disclaimer = `<p style="color:yellow;">Unless explicitly mentioned with an "Official" tag, all data is obtained from the public domain. </p></br>`;
    
    data.innerHTML = Data;
    disclaimer.innerHTML = Disclaimer;
    no_promote.innerHTML = "";

    conditionMet = true; // Set the flag to true indicating the condition is met
    break; // Exit the loop since the condition is met
  }
}

if (!conditionMet) {
  var Data = `<div style="color:white; background-color:#1f282d; font-size:12px;" >` + display_link+`<p><br><span style="color:red;  font-size: 18px;"> The page you submitted doesn't belong to the organization selected above</span>&nbsp; <span class="tooltip"> ❌ <span class="tooltiptext">Possibly a scam. Report the page directly to the owner. </span> </p> </div>`;
    
  var Disclaimer = `<br><p style="color:yellow;">Unless explicitly mentioned with an "Official" tag, all data is obtained from the public domain.</p></br>`;
    
  data.innerHTML = Data;
  disclaimer.innerHTML = Disclaimer;
  no_promote.innerHTML = "";
}

return Data; 











}


/* Loader or the svg spinner is modified from the works of Utkarsh Verma https://github.com/n3r4zzurr0/svg-spinners (MIT)  */