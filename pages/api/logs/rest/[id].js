// Core
import path from 'path';
const fs = require('fs');

export default async (req, res) => {
  const PATH = path.resolve('logs', 'rest');
  
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;

    if (id) {
      try {
        const log = fs.readFileSync(path.resolve(PATH, id + '.log'), { encoding: 'utf-8' });
        const data = JSON.parse(log);
        res.status(200).json(data);
      } catch (error) {
        res.status(404).json({ message: `Log id=${id} is not found` });
      } 
    }
  } // GET
}

