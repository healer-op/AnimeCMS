
const params = new URLSearchParams(document.location.search);
var name = params.get("term");
fetch(`https://mapi.cyberhub.repl.co/m/search/${name}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    var link1 = data.links
    for(var j=0;j<data.links.length;j++){
        link1[j] = btoa(link1[j]);
    }

    const html = data.imgs.map((img, i) =>{
        return `
        <!-- Media Block -->
                <div class="col-12 col-m-6 col-l-3 media-block">
                    <!-- Poster  -->
                    <a href="manga-read.html?view=${data.links[i]}&title=${data.titles[i]}" class="image ti-file-document" data-src="${data.imgs[i]}" style="background-image:url('${data.imgs[i]}')"></a>
                    <!-- Info -->
                    <div class="info">
                        <a href="manga-read.html?view=${data.links[i]}&title=${data.titles[i]}"><h3>${data.titles[i]}</h3></a>
                    </div>
                </div>
                <!-- Media Block -->`;
    }).join('');
    document.querySelector("#row").insertAdjacentHTML("afterbegin", html);
})