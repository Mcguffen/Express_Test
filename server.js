const express = require("express")

const app = express()

// 引入cors来解决跨域问题,他相当于一个中间件。
app.use(require('cors')())

// 静态文件托管 所有public 文件下的文件都可以被访问
app.use('/static', express.static('public'))

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