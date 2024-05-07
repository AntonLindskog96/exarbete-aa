import { NextApiRequest, NextApiResponse } from 'next';
import { burgers, beers } from './data'; 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (req.query.type === 'beers') {
      res.status(200).json(beers);
    } else if (req.query.type === 'burgers') {
      res.status(200).json(burgers);
    } else {
      const allProducts = { burgers, beers };
      res.status(200).json(allProducts);
    }
  } else {
    res.status(405).end(); 
  }
}
