const express = require("express")

const app = express()

// 引入mongoose 他是链接操作数据库的驱动
const mongoose = require('mongoose')
// 链接数据库,第一个参数是要链接的数据库地址,它的好处就是即使没有这个express_test数据库他会帮你创建，有的话直接链接很方便，第二个参数必须填写，新版本要求。
mongoose.connect('mongodb://localhost:27017/express_test',{
    useNewUrlParser: true
})
// 定义数据模型 第一个参数是模型名字一般我们大写，第二个参数是数据的表结构，他的参数是哥对象来定义数据的属性。
const Product = mongoose.model('Product', new mongoose.Schema({
    titile: String,

}))
// 测试插入三条条数据来测试
// Product.insertMany([
//     {
//         titile: '产品1',
//     },
//     {
//         titile: '产品2',
//     },
//     {
//         titile: '产品3',
//     },
// ])

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

app.get('/products', async function(req,res){
    // 代替之前写死的数据 每次的从数据库查询数据都是异步操作所以使用await 那么这个函数必须加上async他俩是成对出现使用的。
    // 所以skip和limit结合起来是可以用来作分页的。
    const data = await Product.find().where({
        titile: '产品2'
    })
    res.send(data)
})

app.listen(3000, ()=> {
    console.log('app listening on port 3000!')
})