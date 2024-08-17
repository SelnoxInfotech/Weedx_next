import { NextApiRequest, NextApiResponse } from 'next';  
  
export default async function handler(req, res) {  
  const token = req.cookies['Address'];  
  // console.log(token)
  return res.status(200).json({ token });  
}