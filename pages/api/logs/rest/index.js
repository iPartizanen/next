// Core
import path from 'path';
const fs = require('fs');

// Instruments
const { parseCookies } = require('nookies');
import { getUniqueId } from '../../../../helpers/getUniqueId';

export default async (req, res) => {
  const PATH = path.resolve('logs', 'rest');

  if (req.method === 'POST') {
    try {
      const logId = getUniqueId();
      const logPath = path.resolve(PATH, logId + '.log');
 
      const created = (new Date).toISOString();
      const userAgent = req.headers['user-agent'];
      const { userId } = parseCookies({ req });

      const data = { 
        logId,
        created,
        userId,
        userAgent,
        payload: req.body 
      }; 
  
      // creating logs directory, if not exist
      if (!fs.existsSync(PATH)) {
        fs.mkdirSync(PATH, { recursive: true });
      };

      fs.writeFile(logPath, JSON.stringify(data, null, 4), 'utf-8', (err) => {
        if (err) return console.log(err);
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }  
  } else if (req.method === 'GET') {
    const {
      query: { userId }
    } = req;

    try {
      let data = [];
      const logFiles = fs.readdirSync(PATH);

      // Merging all logs (or all logs with specified usedId)
      logFiles.forEach(fileName => {
        if (fileName.substring(fileName.length - 4) === '.log') {
          const log = fs.readFileSync(path.resolve(PATH, fileName), { encoding: 'utf-8' });
          const logData = JSON.parse(log);
          if (!userId || (userId && logData.userId === userId)) {
            data.push(logData);
          };  
        };
      });

      if (userId && data.length === 0) {
        res.status(404).json({ message: `Logs for userId=${userId} are not found` });   
      } else {
        res.status(200).json(data);               
      }  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }       
  }
}

