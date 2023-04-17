import axios from "axios";

interface registerEmailType{
    email:string,
    eventId:string
}

export const registerEmail = (data:registerEmailType) => axios.post("/api/email-register",data);
