const express = require("express")

const app = express()

// 使用express.json()方法
app.use(express.json())

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

// 产品列表页
app.get('/products', async function(req,res){
    // 代替之前写死的数据 每次的从数据库查询数据都是异步操作所以使用await 那么这个函数必须加上async他俩是成对出现使用的。
    // 所以skip和limit结合起来是可以用来作分页的。
    // sort方法用来排序的_id = -1 是按照逆序排的 当然1就是正序排列
    const data = await Product.find().sort({_id: -1})
    res.send(data)
})

// 产品详情页
// 我们的'/products/:' 中的 “ ：” 表示的任意字符,我们在后边加id是为了捕获这个这个任意字符而取的名字你可以使用任何变量代替id来捕获这个任意字符。
app.get('/products/:id', async function(req,res){
    // 代替之前写死的数据 每次的从数据库查询数据都是异步操作所以使用await 那么这个函数必须加上async他俩是成对出现使用的。
    // 所以skip和limit结合起来是可以用来作分页的。
    // sort方法用来排序的_id = -1 是按照逆序排的 当然1就是正序排列
    // findById这个方法的参数 就是从前端url地址捕获的任意字符（用id变量储存），又因为他是从客户端发来的参数所以用req.parms.id req.parms就是从客户端（浏览器）发来的所有参数，又因为我们用id来存这个字符所以。。。
    // 而且返回的是个对象 不是数组
    const data = await Product.findById(req.params.id)
    res.send(data)
})

// 提交数据 新增产品
app.post('/products', async function(req, res){
    // 接收客服端发来的数据，还需要对这个数据进行解析，我们用exoress,json()方法对json数据解析。
    const data = req.body
    //接收到了客户端发来的数据，我们就存到我们的数据库中
    const product = await Product.create(data)
    
    res.send(product)
})

 // 删除数据 删除产品(单个)
app.delete('/products/:id', async function(req,res){
    // 先找到要删除的产品
    const product = await Product.findById(res.params.id)
    // 然后执行删除操作
    product.remove()
    // 我们删除的数据 返回给客户端空的数据没有意义 所以我们返回状态 删除成功的状态
    res.send({
        success: true
    })

})
app.listen(3000, () => {
    console.log('app listening on port 3000!')
})