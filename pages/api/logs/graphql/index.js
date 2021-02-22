// Core
import { ApolloServer, gql } from 'apollo-server-micro';
import path from 'path';
const fs = require('fs');

// Instruments
import { getUniqueId } from '../../../../helpers/getUniqueId';

const PATH = path.resolve('logs', 'graphql');

const typeDefs = gql`
    type Query {
      logs(id: String, userId: String): [Log]
    }
    type Log {
      logId: String,
      created: String,
      userId: String,
      userAgent: String,
      payload: String
    }
    type Mutation {
      createLog(input: LogInput): Log
    }       
    input LogInput {
      userId: String,
      userAgent: String,
      payload: String
    }     
`;

const resolvers = {
  Query: {
    logs(parent, args, context) {
      const { id, userId } = args;
      let data = [];

      try {
        if (id) {
            const log = fs.readFileSync(path.resolve(PATH, id + '.log'), { encoding: 'utf-8' });
            const logData = JSON.parse(log);
            const { logId, created, userId, userAgent, payload } = logData;
            data.push({
              logId,
              created,
              userId,
              userAgent,
              payload: JSON.stringify(payload, null, 4)
            });
          } else {
          const logFiles = fs.readdirSync(PATH);
  
          // Merging all logs (or all logs with specified usedId)
          logFiles.forEach(fileName => {
            if (fileName.substring(fileName.length - 4) === '.log') {
              const log = fs.readFileSync(path.resolve(PATH, fileName), { encoding: 'utf-8' });
              const logData = JSON.parse(log);
              if (!userId || (userId && logData.userId === userId)) {
                const { logId, created, userId, userAgent, payload } = logData;
                data.push({
                  logId,
                  created,
                  userId,
                  userAgent,
                  payload: JSON.stringify(payload, null, 4)
                });
              };  
            };
          });
        };
      } catch (error) {
        console.log({ message: error.message });
      }       

      return data;
    },
  },
  Mutation: {
    createLog(parent, args, context) {
      const { input } = args;    
   
      const logId = getUniqueId();
      const created = (new Date).toISOString();  

      const log = {
        logId,
        created,
        ...input,
      };     

      try {
        const logPath = path.resolve(PATH, logId + '.log');
    
        // creating logs directory, if not exist
        if (!fs.existsSync(PATH)) {
          fs.mkdirSync(PATH, { recursive: true });
        };
  
        fs.writeFile(logPath, JSON.stringify(log, null, 4), 'utf-8', (err) => {
          if (err) return console.log(err);
        });

      } catch (error) {
        console.log({ message: error.message });
      }    
      
      return log;
    }
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/logs/graphql' })