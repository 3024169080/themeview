// console.log('--------- ',process.env)
const _env = require('./env.' + process.env.env_config)
module.exports = _env
