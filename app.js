require("dotenv").config()
const express= require("express")
const cors= require("cors")
// const logger=require("morgan")
const bodyParser = require("body-parser")
const mongoose=require("mongoose")
const passport=require("passport")
const Session=require("express-session")
const path=require("path")
const fs=require("fs")
const multer=require("multer")
const bcrypt= require("bcryptjs")
const passportConfig=require("./passportConfig.js")
const cookieParser = require("cookie-parser")
const Vendor=require("./vendor")
const User=require("./User")
const Transaction=require("./transactions")
const { useInRouterContext } = require("react-router-dom")
const { UserExistsError } = require("passport-local-mongoose/lib/errors.js")
const { log } = require("console")
const transactions = require("./transactions")
const Orders=require("./orders")
const passportLocal=require("passport-local").Strategy







app=express()

app.use(express.static(path.join(__dirname,"build")))
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})

// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true
// }))
// app.use(logger("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(Session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
   
}))

// to setuo userDetails database
const UserDetailsSchema= new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    carts:[Object],
    clicks:{score:Number,numberOfRatings:Number},
    orders:Number,
 
 
     
     })
     const UserDetails= new mongoose.model("UserDetail", UserDetailsSchema)

// to set up VendorDetails database
const VendorDetailsSchema= new mongoose.Schema({
   username:String,
   firstname:String,
   lastname:String,
   listings:[Object],
   sellerScore:{score:Number,numberOfRatings:Number},
   numberOfSales:Number,


    
    })
    const VendorDetails= new mongoose.model("VendorDetail", VendorDetailsSchema)


// to set up listing database
const listingSchema= new mongoose.Schema({
_id: String,
listingTitle: String,
listingDescription:String,
listingPicture:[Object],
vendor: String,
price:Number,
category:String,
carters: [Object],
reviews:[Object],
views:[Object],
listingStatus:{
    type: String,
    default:"available"
}

})

const Listing= new mongoose.model("listing", listingSchema)

// to set up comments database
const ReviewSchema= new mongoose.Schema({
    _id: String,
    commentText: String,
    commentPicture:[Object],
    commenterUsername: String,
    commentTime:String,
    likes: [Object]
    })
    
    const Review= new mongoose.model("review", ReviewSchema)


// set up passport and cookie parser
app.use(cookieParser("helloworld"))
app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig.js")(passport)

// set up database

mongoose.connect("mongodb+srv://davidilerioluwa:ilerioluwa@cluster0.iheez.mongodb.net/shoppingDB", {useNewUrlParser:true})



// set up multer
const storage= multer.diskStorage({
destination: "./images"  ,
filename: (req,file,cb)=>{cb(null,file.originalname)}
})
const upload=multer({storage: storage})










app.get("/",(req,res)=>{
    if(req.isAuthenticated==true){
        res.send("authenticated")
    }else{
        res.send("not authenticated")
        console.log("not");
    }
})





app.get("/api",(req,res)=>{
    console.log("if");
    if(!req.isAuthenticated() || req.user.accountType=="vendor"){
        res.send(false)
    }else if(req.user.accountType=="user"){
        res.send({message: "hello from server",
        isAuthenticated:req.isAuthenticated(),
        username:req.user.username,
        })
    }
    
 })
 app.get("/vendorApi",(req,res)=>{
    if(req.user.accountType=="vendor"){
        // console.log(req.user.accountType=="vendor")
        res.send({message: "hello from server",
        isAuthenticated:req.isAuthenticated(),
        username:req.user.username,
        })
    }else{
        res.send({
            isAuthenticated:false
        })
    }
    
 })

app.post("/create",upload.single("file"),(req,res,next)=>{
 const   firstName= req.body.firstname
 const   lastName= req.body.lastname
const    dob=req.body.dob
 const  username= req.body.username
const  password= req.body.password

Vendor.findOne({username:username},async (err,doc)=>{
    if(err) throw err
    if(doc) res.send("already exists")
    if(!doc){
        const hashedPassword= await bcrypt.hash(password,10)
        const newUser=new Vendor({
            username:username,
            password:hashedPassword
        })

        await newUser.save();
        console.log(hashedPassword)
        
         const   userInfo=  {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:username
        }
        
               Vendor.update({username:username},{userInfo:userInfo},(err)=>{
                if(err){console.log(err)}
                else{createDetails(username,req.body.firstname,req.body.lastname)}
                })

    
    } 
})

    function createDetails(username,firstname,lastname,){
        const VendorDetail= new VendorDetails({
            username:username,
            firstname:firstname,
            lastname:lastname,
            sellerScore:{score:0,numberOfRatings:0},
            numberOfSales:0
        })
        VendorDetail.save()
        console.log(" created")
    }

})

app.post("/login", function(req,res,next){
   
  
  const   username= req.body.username
  const  password= req.body.password
  
  const user =new Vendor({
    username:username,
    password:password
})
passport.authenticate("vendor",(err,user,info)=>{
    if(err) throw err
    if(!user) res.send(false)
    else{
        req.login(user,(err)=>{
            if(err) throw err
            res.send(req.isAuthenticated())
        })
    }
})(req,res,next)
}) 


app.post("/logout",(req,res)=>{
req.logout()
})

app.post("/checkVendorExists",(req,res)=>{
    console.log("requested");
    Vendor.find({username:req.body.username},(err,vendor)=>{
        if(err){
            console.log(err);
        }else{
            
            if(vendor.length==0){ res.send(false);}
            else{res.send(true)}
        }
    })
})

app.post("/createListing",upload.single("file"),(req,res,next)=>{

        const picture={
            data: fs.readFileSync(path.join(__dirname+"/images/"+req.file.originalname)),
            contentType:req.file.mimetype
        }
        const time= new Date()
        const id= time.getTime()+req.user.username
        const newListing= new Listing({
            _id: id,
            listingTitle: req.body.listingTitle,
            listingDescription: req.body.listingDescription,
            listingPicture:[ picture],
            vendor: req.user.username,
            price: req.body.price,
            category: req.body.category
        })
         newListing.save()
         incrementListings()
        function incrementListings(){
            const listing={
                _id:id
            }
            VendorDetails.update({username:req.user.username},{"$push":{listings:listing}},(err)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send("created")
                    console.log("listing created");
                }

            })
        }        

})

app.get("/getAllListings",(req,res)=>{
    const username= req.user.username
     
    VendorDetails.find({username:username},(err,vendor)=>{
        if(err){
            console.log(err);
        }else{
            res.send(vendor[0].listings);
        }
    })

})

app.post("/getUserListings",(req,res)=>{
    console.log(req.body)
    const filterOptions=req.body[1]
    const search=[]
    req.body[0]?search.push({listingTitle:{$regex:req.body[0],$options:"i"}}):console.log("no search query")
    filterOptions.startingPrice?search.push({price:{$gte:filterOptions.startingPrice}}):console.log("");
    filterOptions.endingPrice?search.push({price:{$lte:filterOptions.endingPrice}}):console.log("");
    filterOptions.category?search.push({category:filterOptions.category}):console.log("");
    console.log(search);
    Listing.find(search.length==0?{}:{$and:search},(err,listings)=>{
        if(err){console.log(err);
        }else{
            res.send(listings)
        }
    }).sort({carters:-1})
})



app.post("/getListing",(req,res)=>{
    console.log(req.body);
   Listing.findOne({_id: req.body.id},(err,listing)=>{
    if(err){
        console.log(err);
    }else{
        res.send(listing)
    }
   })

   app.post("/vendorSearchListings",(req,res)=>{
    const filterOptions=req.body[1]
    const search=[{vendor:req.user.username}]
    req.body[0]?search.push({listingTitle:{$regex:req.body[0],$options:"i"}}):console.log("no search query")
    filterOptions.startingPrice?search.push({price:{$gte:filterOptions.startingPrice}}):console.log("");
    filterOptions.endingPrice?search.push({price:{$lte:filterOptions.endingPrice}}):console.log("");
    filterOptions.category?search.push({category:filterOptions.category}):console.log("");
   
    Listing.find({$and:search},(err,listing)=>{
        if(err){
            console.log(err);
        }else{
            res.send({search:listing})
            console.log(listing);
        }
})
   })
    
})

// users database
app.post("/createUser",upload.single("file"),(req,res,next)=>{
    const   firstName= req.body.firstname
    const   lastName= req.body.lastname
   const    dob=req.body.dob
    const  username= req.body.username
   const  password= req.body.password
   
   User.findOne({username:username},async (err,doc)=>{
       if(err) throw err
       if(doc) res.send("already exists")
       if(!doc){
           const hashedPassword= await bcrypt.hash(password,10)
           const newUser=new User({
               username:username,
               password:hashedPassword
           })
   
           await newUser.save();
           console.log(hashedPassword)
           
            const   userInfo=  {
               firstname:req.body.firstname,
               lastname:req.body.lastname,
               username:username
           }
           
                  User.updateOne({username:username},{userInfo:userInfo},(err)=>{
                   if(err){console.log(err)}
                   else{
                    createDetails(username,req.body.firstname,req.body.lastname)
                   
                }
                   })
   
       
       } 
   })
   
       function createDetails(username,firstname,lastname,){
           const UserDetail= new UserDetails({
               username:username,
               firstname:firstname,
               lastname:lastname,
           })
           UserDetail.save()
           console.log(" created")
           res.send(true)
           
       }
   
   })
   app.post("/checkUserExists",(req,res)=>{
        console.log("requested");
        User.find({username:req.body.username},(err,user)=>{
            if(err){
                console.log(err);
            }else{
                
                if(user.length==0){ res.send(false);}
                else{res.send(true)}
            }
        })
    })
    app.post("/usersLogin",(req,res)=>{
    const   username= req.body.username
    const  password= req.body.password
    
    const user =new User({
        username:username,
        password:password
    })
    passport.authenticate("user",(err,user,info)=>{
    
        if(err) throw err
        if(!user) res.send(false)
        else{
            req.login(user,(err)=>{
                if(err) throw err
                res.send(req.isAuthenticated())
                
            })
        }
    })(req,res)
    })


//    cart
app.get("/getCart",(req,res)=>{
    // console.log("x");
    // res.send("k"
    
    UserDetails.findOne({username:req.user.username},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            console.log(user.carts);
            res.send(user.carts)
        }
    })

})

app.post("/addToCart",(req,res)=>{
    // console.log(req.user.username);
    // console.log(req.body.listingId);
    const username= req.user.username
    const listingId=req.body.listingId
    UserDetails.updateOne({username:req.user.username},{"$push":{carts:{listingId:listingId}}},(err)=>{
        if(err){
            console.log(err);
        }else{
            addUserToListingCart()
        }
    })

    function addUserToListingCart(){
        Listing.updateOne({id:listingId},{"$push":{carters:{username:username}}},(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("item sucessfully added to cart");
            }
        })
    }
})

app.post("/getCartItemDetails",(req,res)=>{

    UserDetails.findOne({username:req.user.username},
        (err,details)=>{
            if(err){
                console.log(err)
            }else{
                
            const  carts=(details.carts)
            const  item=carts.find((x)=>{
              return  x.listingId==req.body.listingId
            })
            console.log(item)
            res.send(item)

            }
        }
    )
})
app.post("/updateCart",(req,res)=>{
  const  newDetails={
    "listingId" : req.body.id,
    "numberOfOrders" : req.body.numberOfOrders
    }
    
UserDetails.updateOne({username:req.user.username,carts:{$elemMatch:{listingId:req.body.id}}},
    {$set:{"carts.$":newDetails}},
    (err)=>{
        if(err){
            console.log(err);
        }else{
            res.send(newDetails.numberOfOrders)
            console.log("no error");
        }
    }
    )
})

app.post("/pay",(req,res)=>{
    const transaction=req.body
    transaction.username=req.user.username
    console.log(transaction);
    
    Transaction.find({reference:transaction.reference},(err,found)=>{
        console.log(found.length);
        if(found.length>0){
            console.log("reference already exists");
        }else{
            newTransaction.save()
        }
    })



    const newTransaction =new Transaction(transaction)

})

app.get("/getTransactions",(req,res)=>{
    const username= req.user.username
    console.log(username);
    transactions.find({username:username},(err,transactions)=>{
            if(err){
                console.log(err)
            }else{
                res.send(transactions)
                
            }
    })
})
app.post("/createOrder",(req,res)=>{
    console.log(req.body);
    var orders=req.body
    orders.forEach(order => {
        order.username=req.user.username
        const newOrder= new Orders(order)
        Orders.find({orderId:order.orderID},(err,found)=>{
            if(found.length>0){
                console.log("order already exists");
            }else{
                newOrder.save()
            }
           
        })
    });
    console.log(orders);
    
})

app.get("/getOrders",(req,res)=>{
    const username=req.user.username
    Orders.find({username:username},(err,orders)=>{
        if(err){
            console.log(err);
        }else{
            res.send(orders)
        }
    })
})






app.listen(process.env.port||3001,()=>console.log("server running"))




