const bcrypt= require("bcryptjs")
const Vendor= require("./vendor")
const User=require("./User")
const localStrategy=require("passport-local").Strategy

module.exports=(passport)=>{
    
    passport.use("vendor",
        new localStrategy((username,password,done)=>{
            Vendor.findOne({username:username},(err,vendor)=>{
                if (err) throw err
                if (!vendor) return done(null,false)
                bcrypt.compare(password,vendor.password,(err,result)=>{
                
                    if(err) throw err
                    if (result===true){
                        return done(null,vendor)
                    }else {
                        return done(null,false)
                    }
                })
            })
        })
    )
    passport.use("user",
    new localStrategy((username,password,done)=>{
        User.findOne({username:username},(err,vendor)=>{
            if (err) throw err
            if (!vendor) return done(null,false)
            bcrypt.compare(password,vendor.password,(err,result)=>{
               console.log(result)
                if(err) throw err
                if (result===true){
                    return done(null,vendor)
                }else {
                    return done(null,false)
                }
            })
        })
    })
)
var x=""
passport.serializeUser((vendor,cb)=>{
    
    cb(null,vendor.id)
})
passport.deserializeUser((id,cb)=>{
    
    User.findOne({_id:id},(err,user)=>{
        
        // console.log(id);
        if(user){
            cb(err,user)
        }else{
            Vendor.findOne({_id:id},(err,vendor)=>{
                    cb(err,vendor)
            })

        }
    })
    
})
};