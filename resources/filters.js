import { compare } from './script.js';

export function filtering(url, href, origin, hostname,protocol,pathname,search)
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
  else if(hostname=="play.google.com")
        {
         link=hostname+pathname+search;
         var output = compare(link);
				 return output; 
        }    
  else if(hostname=="apps.apple.com")
            { function extractId(appleStoreLink) {
              const regex = /\/id(\d+)/;
              const match = appleStoreLink.match(regex);
              return match ? match[1] : null;
            }
        const Id = 'id'+ extractId(pathname);
          if(pathname.includes('developer')){link=hostname+'/developer/'+Id;}
          else if(pathname.includes('app')){link=hostname+'/app/'+Id;}
          var output= compare(link);
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
  /* Mastodon Instances
  mastodon.social --- Mastodon gGmbH
  mastodon.online  --- Mastodon gGmbH
  social.vivaldi.net --- Vivaldi
  mozilla.social --- Mozilla 
  */
  else if(hostname == "mastodon.social" || hostname=="social.vivaldi.net" || hostname=="mastodon.online" || hostname=="mozilla.social")
  
      {
        link = hostname + pathname.toLowerCase(); 
				var output = compare(link); 
			  return output;

      }      
  else if(origin == "https://ko-fi.com" || origin =="https://www.buymeacoffee.com" || origin=="https://liberapay.com" || origin =="https://opencollective.com")
				{
					
					link=hostname+'/'+pathname.split('/')[1].toLowerCase();
					var output = compare(link);
					return output ;
				}
  else if(origin=="https://www.patreon.com")
				{	
					var id=pathname.split('/')[1];
						if(id=="join")
							{ var link= hostname+'/'+pathname.split('/')[2].toLowerCase();}
						else { var link = hostname+'/'+pathname.split('/')[1].toLowerCase(); }
					var output = compare(link);	
					return output;	
				
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
  /*Once the above condition is true, the function replaces the URL language to the the default en. This is used since mozilla supports multiple languages and the url structure is directly based on user language.  */
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