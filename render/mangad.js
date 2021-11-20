
const params = new URLSearchParams(document.location.search);
var name = params.get("view");
var tt = params.get("title");
document.getElementById('tt').innerHTML = tt;
fetch(`https://mapi.cyberhub.repl.co/m/info/${name}`)
.then(response =>{
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();})
.then(data => {
    // console.log(data);
    var link = data.links
    for(var j=0;j<data.titles.length;j++){
        link[j] = btoa(link[j]);
    }
    const html = data.titles.map((img, i) =>{
        return `
        <button onclick="render('${data.links[i]}')">${data.titles[i]}</button>`;
    }).join('');
    document.querySelector("#man").insertAdjacentHTML("afterbegin", html);
})

function render(x){
    var x = x;
    fetch(`https://mapi.cyberhub.repl.co/m/read/${x}`)
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();})
        .then(data => {
            console.log(data);
            
            const html = data.imgs.map((img, i) =>{
                return `
                <img src="${data.imgs[i]}" alt=""></img>`;
            }).join('');
            document.querySelector("#loaders").insertAdjacentHTML("afterbegin", html);
    })
}