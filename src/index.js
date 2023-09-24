const express = require("express")
const path = require("path")
const app = express()
const fileUpload = require("express-fileupload")
const AdminCollection = require("./admindb")
const bookCollection = require("./bookdb")
const LogInCollection = require("./signupdb")
const cartCollection = require("./cartdb")
const paymentCollection = require("./paymentdb")
let multer = require('multer')
var bodyParser = require('body-parser')
// var mongodb = require("mongodb")
const cors = require('cors');
//const ejsLint = require('ejs-lint');
let session = require('express-session');
let flash = require('connect-flash')


const { default: mongoose, model } = require("mongoose")

const port = process.env.PORT || 3000
let storage = multer.diskStorage({
    destination: '../public/image',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
let upload = multer({
     storage: storage })
 
// app.get('/add-products', (req, res) => {
//     bookCollection.find({})
//     .then((data, err)=>{
//         if(err){
//             console.log(err);
//         }
//         res.render('/add-products',{items: data})
//     })
// });
 

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// session middleweare
app.use(session({
    secret: 'nodejs',
    resave:true,
    saveUninitialized:true
 }))
app.use(flash())
//globaly variable set for operation (like sucess , error) message
app.use((req, res, next)=>{
    res.locals.sucess = req.flash('sucess'),
    res.locals.err = req.flash('err')
    next()
   })


app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
//console.log(publicPath);

app.set('view engine', 'ejs')
app.set('fileUpload')
app.set('bodyParser')


app.set('views', tempelatePath)
//app.set('views', tempelatePath2)
app.use(express.static(publicPath))


mongoose.connect('mongodb://0.0.0.0:27017/LoginFormPractice')
.then(() =>{
    console.log('mongoose connected');
})
.catch((e) =>{
    console.log('failed');
})
// app.get('/home', (req, res) => {
//     res.render('home')
// })


app.get('/admin-page',async (req, res) => {
    const bookcheck = await  bookCollection.find({})
    const person = await  LogInCollection.find({})
    res.render('adminpage',{z:person,x:bookcheck})
})

app.get('/admin-login', (req, res) => {
    res.render('admin-login')
})
app.get('/acc-details/:id',async (req, res) => {
    // const check = await cartCollection.find({ email: req.params.id})
    //console.log(check)
    const checking = await LogInCollection.findOne({ email: req.params.id })
    const bookcheck = await  paymentCollection.find({email:req.params.id})
    res.render('acc-details',{z:checking,x:bookcheck})
})
app.get('/sign', (req, res) => {
    res.render('sign')
})


app.get('/', (req, res) => {
    bookCollection.find({})
    .then((x)=>{
        res.render('home',{x})
    })
    
})
app.get('/blogs/:id', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    res.render('blogs',{z:checking})
})
app.get('/genres/:id', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    res.render('genres',{z:checking})
})
app.get('/reviews1', async(req, res) => {
    res.render('reviews1')
})

app.get('/genres1', async(req, res) => {
    res.render('genres1')
})
app.get('/add-products', (req, res) => {
    res.render('add-products')
})

app.get('/reviews/:id', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    res.render('reviews',{z:checking})
})
app.get('/:id/payment/:di', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    const bookcheck = await  cartCollection.findOne({id:req.params.di})
    // console.log(bookcheck.count)
    res.render('payment', {bookcheck:bookcheck,checking:checking} )
})
app.get('/cart/:id',async (req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    const bookcheck = await  cartCollection.find({email:req.params.id})
    // console.log(bookcheck.id)
    res.render('cart', {bookcheck:bookcheck,checking:checking} )
})
app.get('/logout-confirm', (req, res) => {
    bookCollection.find({})
    .then((x)=>{
        res.render('logout-confirm',{x})
        console.log(x)
    })

})
app.get('/blogs1', (req, res) => {
    res.render('blogs1')
})
app.get('/home2/:di/addtocart/:id', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    const bookcheck = await  bookCollection.findOne({id:req.params.di})
    //console.log(bookcheck.id)
    res.render('addtocart',{z:checking,x:bookcheck})
})
app.get('/home2/:id', async(req, res) => {
    const checking = await LogInCollection.findOne({ email: req.params.id })
    const bookcheck = await  bookCollection.find({})
    res.render('home2',{z:checking,x:bookcheck})
})
app.get('/home', (req, res) => {
    bookCollection.find({})
    .then((x)=>{
        res.render('home',{x})
    })
})
app.get('/books', (req, res) => {
    res.render('books')
})

//admin product edit and delete- start
app.get('/edit1/:id', (req, res)=>{
    let readquery = req.params.id;
   
    bookCollection.findOne({id:readquery})
    .then((x)=>{
        console.log(x)
        res.render('add-products-update', {x})
    })
   
})

app.post('/edit1/:id', (req, res)=>{
    let readquery = req.params.id;
    bookCollection.updateOne({id:readquery}, {
        $set:{
            id:req.body.id,
            name:req.body.name,
            author:req.body.author,
            price:req.body.price
        }
    })
    .then((x)=>{
        req.flash('sucess', 'Your Data has updated')
        res.redirect('/admin-page')
    })
    .catch((y)=>{
        console.log(y)
    })
})

app.get('/edit2/:id', (req, res)=>{
    let readquery = req.params.id;
   
    LogInCollection.findOne({email:readquery})
    .then((x)=>{
        console.log(x)
        res.render('user-update', {x})
    })
   
})

app.post('/edit2/:id', (req, res)=>{
    let readquery = req.params.id;
    LogInCollection.updateOne({email:readquery}, {
        $set:{
           
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        }
    })
    .then((x)=>{
        req.flash('sucess', 'Your Data has updated')
        res.redirect('/admin-page')
    })
    .catch((y)=>{
        console.log(y)
    })
})

app.post('/delete2/:id', (req, res)=>{
    LogInCollection.deleteOne({email:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has deleted')
        res.redirect('/admin-page')
    })
    .catch((y)=>{
        console.log(y)
    })
})
app.post('/delete1/:id', (req, res)=>{
    bookCollection.deleteOne({id:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has deleted')
        res.redirect('/admin-page')
    })
    .catch((y)=>{
        console.log(y)
    })
})
//admin product edit and delete- end

app.post('/add-products' ,upload.single('single_input'),async (req, res) => {
    let data = {
        id : req.body.id,
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        image : req.file.filename
        
        
    }
//duplicate check for id
bookCollection.find({id:req.body.id})
.then(resp=>{
    if (resp.length!=0){
        res.send("ID already exists")
    }
    else{
        bookCollection.create(data)
        .then((x)=>{
        
            res.redirect('admin-page');
            
        })
        // return res.json({
        //     data:[],
        //     success:true,
        //     msg:"product added"
        // })

        
        
    }
})

.catch((y)=>{
            
    console.log(y);

}) 
    // bookCollection.create(data)
    // .then((x)=>{
        
    //     res.redirect('admin-page');
        
    // })
    // .catch((y)=>{
        
    //     console.log(y);

    // })
    
    
})
    
app.post('/home', async (req, res) => {

    const data = {

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ email: req.body.email })

   try{
    if (checking) {
        res.send("user details already exists")
    }
    else{
        
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }
    // res.status(201).render("home", {
    //     naming: req.body.email
        
    // })
    bookCollection.find({})
    .then((x)=>{
        res.render('signup-confirm',{x})

    })
})

app.post('/login', async (req, res) => {
    
    try {
        
        const check = await LogInCollection.findOne({ email: req.body.email },)
        //console.log(req.body.email)
        if (check.password === req.body.password) {
            // res.status(201).render("home", {naming:check})
            bookCollection.find({})
            .then((x)=>{
                res.redirect('/home2/'+ check.email)
            })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }
})

app.post('/admin-login', async (req, res) => {

    try {
        const check = await AdminCollection.findOne({ email: req.body.email })
        //console.log(req.body.email)
        if (check.password === req.body.password) {
            res.status(201).render("home", {naming:check})
           // { naming: `${req.body.password}+${req.body.email}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }
})

app.post('/:di/addtocart/:id', async (req, res) => {

    
        const data = {

            id: req.body.id,
            name: req.body.name,
            price :req.body.price,
            email :req.body.email,
            count: req.body.count,
            address: req.body.address
        }
    
        console.log(data)
       
       try{
       
            
        await cartCollection.insertMany([data])
        res.redirect('/cart/' +  req.params.di)

        }

       


    
    
    catch (e) {

        res.send("wrong details")
        

    }
})

app.post('/payment/:id' ,upload.single('single_input'),async (req, res) => {
    let data = {
        id : req.body.id,
        name: req.body.name,
        email: req.body.email,
        price: req.body.amount,
        phone: req.body.phone,
        count: req.body.count,
        total :req.body.totamount,
        image : req.file.filename,
        transid : req.body.transid
        
    }
    try{
       console.log(data)
            
        await paymentCollection.insertMany([data])
    res.redirect('/home2/' +  req.body.email)


    }

   




catch (e) {

    res.send("wrong details")
    

}
})

app.listen(port, () => {
    console.log('port connected');
})