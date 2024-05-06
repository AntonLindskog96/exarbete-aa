import { NextApiRequest, NextApiResponse } from 'next';
import { burgers } from './data'; 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json(burgers);
  } else {
    res.status(405).end(); 
  }
}
