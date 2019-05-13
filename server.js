const express = require("express")

const app = express()

app.get('/', function(req,res){
    res.send(
        {
            page: 'home',
        }
    )
})

app.get('/about', function(req,res){
    res.send(
        {
            page: 'about',
        }
    )
})

app.get('/products', function(req,res){
    res.send([
        {
            id: '1',
            titile: '产品1'
        },
        {
            id: '2',
            titile: '产品2'
        },
        {
            id: '3',
            titile: '产品3'
        },
    ])
})

app.listen(3000, ()=> {
    console.log('app listening on port 3000!')
})