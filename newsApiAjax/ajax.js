//ApiKey: 7a7929fdea8b4448b794f0296078ca13
window.addEventListener("load",bindEvents);
function bindEvents(){
    getHeadlines();
    
    var buttons=document.querySelectorAll("button");
    buttons.forEach(button=>{
        button.addEventListener("click",getHeadlines);
    }
    );
    document.querySelector("#search").removeEventListener("click",getHeadlines);
    document.querySelector("#search").addEventListener("click",search);
}
function getHeadlines(keyword){
    if(this.innerText!="LATEST")keyword=this.innerText;
    else keyword=undefined;
    document.querySelector("#lat").innerText="";
    console.log(keyword);
    var url;
    if(keyword==undefined)url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=7a7929fdea8b4448b794f0296078ca13`;
    else url=`https://newsapi.org/v2/top-headlines?sources=${keyword}&apiKey=7a7929fdea8b4448b794f0296078ca13`;
    var pr=fetch(url);
    pr.then(successLat).catch(failLat);
}
function successLat(response){
    console.log("Response is ",response);
    var promise= response.json();
    promise.then(successLatJSON).catch(failLatJSON);
}
function failLat(err){
    console.log("Fail is ",fail);
}

function successLatJSON(obj){
    console.log("Data is ",obj);
    var articles=obj["articles"];
    var lat=document.querySelector("#lat");
    for(let key of articles){
        var h5=document.createElement("h5");
        h5.innerText=key["title"];
        h5.className='headline';

        var p=document.createElement("p");
        p.innerText=key["description"];
        p.className='description show';

        var span=document.createElement("p");
        span.innerText=key["content"]+" ";
        
        var link=document.createElement("a");
        link.innerText="Read more...";
        link.href=key["url"];
        span.appendChild(link);

        span.className="description hide";

        h5.appendChild(span);
        h5.appendChild(p);
        h5.addEventListener("click",content);
        var div=document.createElement("div");
        lat.appendChild(document.createElement("br"));
        div.appendChild(h5);
        lat.appendChild(div);
        div.classList.add("border","cen");
    }
}

function failLatJSON(){
    console.log("JSON Convert Fail ",err);
    document.querySelector("#lat").innerText="";
}

function content(){
    console.log("hello");
    var span=this.querySelector(".hide");
    var p=this.querySelector(".show");
    span.className="description show";
    p.className="description hide";
}

function search(){
    var keyword=document.querySelector("#srch").value;
    var temp="";
    for(let i=0;i<keyword.length;i++){if(keyword[i]==' ')temp+='+';
                                    else temp+=keyword[i];}
                                    console.log(temp);
    var d = new Date()
    var mon = d.getMonth()
    if(mon==0)mon=12

    var url=`https://newsapi.org/v2/everything?q=${temp}&from=2019-${mon}-${d.getDate()}&sortBy=popularity&apiKey=7a7929fdea8b4448b794f0296078ca13`;

    fetch(url).then(response=>{
        document.querySelector("#result").innerText="";

        response.json().then(obj=>{
        
        console.log("Data is ",obj);
        
        var heading=obj["articles"][0]["title"];
        var description=obj["articles"][0]["description"];
        var cntnt=obj["articles"][0]["content"];
        var h3=document.createElement("h3");
        h3.innerText=heading;
        var p=document.createElement("p");
        p.innerText=description; p.className="show description";
        var span=document.createElement("p");
        span.innerText=cntnt; span.className="hide description";
        var link=document.createElement("a")
        link.innerText="Read more...";
        link.href=obj["articles"][0]["url"];
        span.appendChild(link);
        h3.appendChild(p); h3.appendChild(span);
        h3.addEventListener("click",content);
        
        document.querySelector("#result").appendChild(document.createElement("br"));
        document.querySelector("#result").appendChild(h3);
        document.querySelector("#result").appendChild(document.createElement("br"));
        }).catch(e=>{
        
        console.log("JSON Parse Error ",e);
        
        }).catch(err=>{
        
        console.log("Server Error ",err);
        
        })
        
        })
        
}