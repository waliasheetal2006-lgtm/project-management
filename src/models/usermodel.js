import mongoose,{schema}from mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtokens";
const userSchema=new schema({
    avatar:{
        type:{
            url:string,
            localpath:string,
        }, 
        default: {
            url:' ',
            localpath:"",
        },
    },
    username:{
        type:string,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:string,
        lowercase:true,
        unique:true,
        trim:true,
        required:true,
    },
    password:{
        type:string,
        required:[true,"pasword is required"],
    },
    refreshtokens:{
        type:string,
    },
forgotpasswordtoken:{
    type:string,
    },
    forgotPasswordExpiry:{
        type:Date,
    },
    emailVerificationToken:{
        type:string,
    },
    emailVerificationExpiry:{
        type:Date,
    },  
})
userSchema.pre("save",async function(next){
    if(!this.ismodified("password")) return next();
    this.password=awaitbcrypt.hash(this.password, 10);
    next();
});
userSchema.method.isPasswordcorrect=async function(password){
    return  await bcrypt.compare(password,this.password);
    }
    userSchema.method.GetAccessToken=function(){
        jwt.sign(
            {
            _id:this.id,
            email:this.email,
        },
       process.env.ACCESS_TOKEN_SECRET,
       {expiresIn:process.env.ACCESS_TOKEN_LIFE,}
        )
    }
    userSchema.method.GetRefreshToken=function(){
        return jwt.sign(
            {
                _id:this.id,
                email:this.email,
                username:this.username,
        },
        process.env.REFRESH-TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_LIFE}
    )
    }
userSchems.method.GenerateRandomToken=function(){
    const unhashedToken=cypto.randomBytes(20).totring("hex");
    const hashedToken=crypto
    .createHash("sha256")
    .update(unhasedToken)
    .digest("hex")
    const ExpiryDate=Date.now()+10*60*1000;
    return {unhasedToken,hashedToken,ExpiryDate};
}

    

export const User=mongoose.model("User",userSchema);