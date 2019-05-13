const express = require("express")

const app = express()

// 引入mongoose 他是链接操作数据库的驱动
const mongoose = require('mongoose')
// 链接数据库,第一个参数是要链接的数据库地址,它的好处就是即使没有这个express_test数据库他会帮你创建，有的话直接链接很方便，第二个参数必须填写，新版本要求。
mongoose.connect('mongodb://localhost:27017/express_test',{
    useNewUrlParser: true
})

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