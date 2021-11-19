const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000

var whitelist = ['http://example1.com', 'http://127.0.0.1:5500']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/',cors(corsOptionsDelegate), (req, res) => {
    var data={};
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`https://www.animekisa.cc/anime`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('article.bs').each((i,element) =>{
            
            const link = $(element).find('a.cona').attr('href')
            data.links.push(link);
            const title = $(element).find('h2').text()
            data.titles.push(title.trim());
            const img = $(element).find('img.coveri.coveris.lazy').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/top',cors(corsOptionsDelegate), (req, res) => {
    var data={};
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`https://www.animekisa.cc/browse`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.zr-list').find('li').each((i,element) =>{
            
            const link = $(element).find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('span.result-title').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})



app.get('/info/:li',cors(corsOptionsDelegate), async (req, res) => {
    var li = req.params.li;
    var lis = Buffer.from(li, 'base64').toString('ascii')
    var data={};
    data.imgs =[];
    data.titles = [];
    data.desps = [];
    data.epls = [];
    data.epts = [];
    data.eptts = [];
    data.rimgs = [];
    data.rts = [];
    data.rls = [];

    
        axios.get(`${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.infoboxc').each((i,element) =>{
            const img = $(element).find('img.posteri').attr('src')
            data.imgs.push(img);
            const desp = $(element).find('div.infodes2').text()
            data.desps.push(desp.trim());
            const title = $(element).find('h1.infodes').text()
            data.titles.push(title.trim());
        });
        $('div.infoepbox').find('a.infovan').each((i,element) =>{
            const epl = $(element).attr('href')
            data.epls.push(epl.trim());
            const ept = $(element).find('div.infoept2').find('div.centerv').text()
            data.epts.push(ept.trim());
            const eptt = $(element).find('div.infoept3').find('div.centerv').text()
            data.eptts.push(eptt.trim());
        });
        $('div.zr-list').find('li').each((i,element) =>{
            const rimg = $(element).find('img').attr('src')
            data.rimgs.push(rimg.trim());
            const rt = $(element).find('span.result-title').text()
            data.rts.push(rt.trim());
            const rl = $(element).find('a').attr('href')
            data.rls.push(rl.trim());
        });
        
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/video/:li',cors(corsOptionsDelegate), async (req, res) => {
    var li = req.params.li;
    var lis = Buffer.from(li, 'base64').toString('ascii')
    var data={};
    data.links = [];
    
        axios.get(`${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('iframe').each((i,element) =>{
            
            const link = $(element).attr('src')
            data.links.push(link.trim());
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/search/:li',cors(corsOptionsDelegate), async (req, res) => {
    var li = req.params.li;
    var data={};
    data.rimgs = [];
    data.rts = [];
    data.rls = [];
    
        axios.get(`https://www.animekisa.cc/search?name=${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.zr-list').find('li').each((i,element) =>{
            const rimg = $(element).find('img').attr('src')
            data.rimgs.push(rimg.trim());
            const rt = $(element).find('span.result-title').text()
            data.rts.push(rt.trim());
            const rl = $(element).find('a').attr('href')
            data.rls.push(rl.trim());
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/tv/search/:search',cors(corsOptionsDelegate), async (req, res) => {
    var search = req.params.search;
    var data={};
    data.titles = [];
    data.links = [];
    
        axios.get(`https://www.topcartoons.tv/?s=${search}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.col-lg-3.col-md-3.col-sm-12').each((i,element) =>{
            
            const link = $(element).find('a').attr('href')
            data.links.push(link.trim());
            const title = $(element).find('h3.title').text()
            data.titles.push(title.trim());

            
        });
    })
    .then(() => {
        res.send(data);
    })

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('MADE BY HEALER')
  })