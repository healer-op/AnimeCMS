const params = new URLSearchParams(document.location.search);
var name = params.get("term");
fetch(`https://mapi.cyberhub.repl.co/search/${name}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    var link1 = data.rls
    for(var j=0;j<data.rls.length;j++){
        link1[j] = btoa(link1[j]);
    }

    const html = data.rimgs.map((img, i) =>{
        return `
        <!-- Media Block -->
                <div class="col-12 col-m-6 col-l-3 media-block">
                    <!-- Poster  -->
                    <a href="anime-stream.html?view=${data.rls[i]}" class="image ti-play" data-src="${data.rimgs[i]}" style="background-image:url('${data.rimgs[i]}')"></a>
                    <!-- Info -->
                    <div class="info">
                        <a href="anime-details.html"><h3>${data.rts[i]}</h3></a>
                    </div>
                </div>
                <!-- Media Block -->`;
    }).join('');
    document.querySelector("#row").insertAdjacentHTML("afterbegin", html);
})