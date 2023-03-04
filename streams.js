const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});

const writeStream = fs.createWriteStream('./docs/blog4.txt');

//data event, everytime we receive a buffer of data from this tream
// readStream.on('data', (chunk) => {
//     console.log('----NEW CHUNK----');
//     console.log(chunk)
//     writeStream.write('\nNEW CHUNK\n')
//     writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream);