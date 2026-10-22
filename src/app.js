import express from "express";
import cors from "cors";
const app = express();
app.get("/",
    (req,res)=>{
       ( res.send("Welcome to basecampy");
    }
)
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16Kb"}))
app.use(express.static("public"))
app.use(cors({
    origin:process.env.CORS_ORIGIN.split(","),//"http:localhost:5173",
    credentials:true,
    methds:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeader:["content-Type","Authorisation"]
}),
);
export default app;