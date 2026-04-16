import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});

app.post("/ia", async (req,res)=>{
 const r = await client.chat.completions.create({
  model:"gpt-4o-mini",
  messages:[
   {role:"system",content:"Eres experto en redes LAN."},
   {role:"user",content:req.body.message}
  ]
 });

 res.json({reply:r.choices[0].message.content});
});

app.listen(3000,()=>console.log("IA activa"));
