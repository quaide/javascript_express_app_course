//returning empty object - xyz
//require needs input for object not to be empty - module.exports
// const xyz = require('./people');

// console.log(xyz);

const {people, ages} = require('./people');

console.log(people, ages);

//OS built into Node
const os = require('os');

console.log(os.platform(), os.homedir());