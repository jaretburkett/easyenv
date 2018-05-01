const path = require('path');
// const EasyEnv = require('easyenv');

// using relative path for this example
const EasyEnv = require('./');

const defaults = {
    ENV_CONTENT:'This is coming from defaultValues option',
    ENV_FROM_DEFAULT:'This is coming only defaultValues option'
};

const options = {
    envPath:path.resolve(__dirname, './my.env'),
    defaultEnvPath:path.resolve(__dirname, './default.env'),
    defaultValues:defaults
};

const env = new EasyEnv(options);

let outputHeader = [
    '',
    'EasyEnv - Created by Jaret Burkett <jaretburkett@gmail.com>',
    'https://github.com/jaretburkett/easyenv',
    '',
];
console.log(outputHeader.join('\n'));

console.log('env.parsed: \n',JSON.stringify(env.parsed, null, 4));


