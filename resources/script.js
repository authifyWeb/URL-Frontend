async function fetch_Data() 
{
			const res=await fetch ("https://raw.githubusercontent.com/authifyWeb/authifyURL-Database/main/everything.json");
			const response=await res.json();
			var json = response.source;
			
			
}
fetch_Data();

function searchNow()
{	var input = document.getElementById('link_id').value;
		
	document.getElementById("data").innerHTML ="";
	document.getElementById("disclaimer").innerHTML ="";
	var url = new URL(input);
	
	var hostname = url.hostname;
	var protocol = url.protocol;
	var origin = url.origin;
	var href= url.href;
	var pathname= url.pathname;

	

	var output= authification(url, href, origin, hostname,protocol,pathname); 
		
			data.innerHTML = (output );
}
function authification(url, href, origin, hostname,protocol,pathname)
{
	if (protocol == "about:" || protocol == "chrome:" || protocol == "edge:" || protocol =="view-source:" )
	{
		return `<h3> This page is part of your browser<h3>`;
	}
	else if(protocol != "https:" ) {return `<h3> This website is not secure. Please refrain from entering or submitting personal data and please don't download files from such sources</h3>`;}
	else if((origin == "https://twitter.com") || (origin =="https://www.facebook.com") || (origin=="https://www.instagram.com") || (origin== "https://www.youtube.com") )  {link= hostname+pathname; var output=compare(link); return output; }
	else{var output= compare(hostname);
				return output ;
			}
}

function compare(link)
{	fetchData(link);
	async function fetchData(link) 
	{
		const res=await fetch ("https://raw.githubusercontent.com/authifyWeb/authifyURL-Database/main/everything.json");
			const response=await res.json();
			var json = response.source;
			for (i=0; i< json.length; i++)
			{ var cl = response.source[i].urls;
				for (j = 0; j<cl.length; j++)
				{	
					
					if(json[i].urls[j] == link )
					{ 
						var Data=`<h5 style="color:white";> ` + link + ` <p> <span style="color:#A2FB15; font-size: 16px;">This site is verified by authifyURL.</span> &nbsp;<span class="tooltip"> ✅ <span class="tooltiptext">You can use this website with complete trust. </span> </p> <p><span>Organisation : </span>` +response.source[i].name+ `</p></h5>` ;
						
						var Disclaimer=`Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white; target ="_blank"> how we verify</a> what is valid and what is not.`;
						data.innerHTML= Data;
						disclaimer.innerHTML=Disclaimer;
					return;
					}
					else{
						var Data = `<h5 style=" color:white"; >` + link + `<p><span style="color:red;font-size: 16px;"> We weren't able to verify this site. Please be cautioned continuing in this site.</span> &nbsp; <span class="tooltip"> ❌ <span class="tooltiptext">This doesn't mean that it's a fake website, it's just not in our database. </span> </p> </h5>` ;
						var Disclaimer=`Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white; target ="_blank"> how we verify</a> what is valid and what is not.`;
						data.innerHTML= Data;
						disclaimer.innerHTML=Disclaimer;
						}

					
				}
			}
		}
			
			
			
			
			

}


