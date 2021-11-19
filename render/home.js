fetch('https://mapi.cyberhub.repl.co')
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    var link = data.links
    var img = data.imgs
    for(var j=0;j<data.titles.length;j++){
        link[j] = btoa(link[j]);
    }
    const html = data.titles.map((img, i) =>{
        return `
        <div class="slide-item col-12 col-m-6 col-l-3 media-block">
        <!-- Poster  -->
        <a href="anime-stream.html?view=${data.links[i]}" class="image ti-play" data-src="${data.imgs[i]}" style="background-image:url('${data.imgs[i]}')"></a>
        <!-- Info -->
        <div class="info">
            <a href="anime-stream.html?view=${data.links[i]}"><h3>${data.titles[i]}</h3></a>
        </div>
    </div>`;
    }).join('');
    document.querySelector("#animel").insertAdjacentHTML("afterbegin", html);
})

