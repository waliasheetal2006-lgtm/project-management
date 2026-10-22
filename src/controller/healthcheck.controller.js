import { APIResponse } from "../utils/APIResponse.js";
const healthcheck=(req,res)=>{
    try{
        res.status(200).json(
            new APIResponse(200{
                message:"Server is running"
            }));
        }
        catch(error){}
    }
