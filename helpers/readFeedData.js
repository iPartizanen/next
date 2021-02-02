// Instruments
const fs = require('fs').promises;

export const readFeedData = async (fileName) => {
  const dateOfReceiving = Date.now();
  let data = [];

  await fs.readFile(fileName, 'utf-8')
    .then((file) => {
        data = JSON.parse(file);
    })
    .catch((error) => {
        console.error(error.message);
    });

  data.forEach((item) => item.dateOfReceiving = dateOfReceiving);

  return data;
};
