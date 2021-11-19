
const params = new URLSearchParams(document.location.search);
var name = params.get("view");
fetch(`https://mapi.cyberhub.repl.co/info/${name}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    document.getElementById("title").innerHTML = data.titles[0];
    var link = data.epls
    for(var i=0;i<data.epls.length;i++){
        link[i]= btoa(link[i]);
    }
    console.log(link)
    const html = data.epls.map((img, i) =>{
        return `<a onclick="render('${data.epls[i]}');" class="episode-item">${data.epts[i]}</a>`;
    }).join('');
    document.querySelector("#epl").insertAdjacentHTML("afterbegin", html);
    
    var link1 = data.rls
    for(var j=0;j<data.rls.length;j++){
        link1[j] = btoa(link1[j]);
    }

    const html1 = data.rimgs.map((img, i) =>{
        return `<!-- Media Block -->
        <div class="slide-item media-block col-12 col-m-6 col-l-3">
            <!-- Poster  -->
            <a href="anime-stream.html?view=${data.rls[i]}" class="image ti-play" data-src="${data.rimgs[i]}" style="background-image:url('${data.rimgs[i]}')"></a>
            <!-- Info -->
            <div class="info">
                <a href="anime-stream.html?view=${data.rls[i]}"><h3>${data.rts[i]}</h3></a>
            </div>
        </div>
        <!-- Media Block -->`;
    }).join('');
    document.querySelector("#lolwaii").insertAdjacentHTML("afterbegin", html1);
    
    
})
function render(x){
    var x = x;
    fetch(`https://mapi.cyberhub.repl.co/video/${x}`)
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();})
        .then(data => {
            console.log(data);
            document.getElementById("frame").src = data.links[0];
            
    })
}