const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  const configjson = require('./config.json');
  const configenv = configjson[env];
  const configvar = Object.keys(configenv);
  configvar.forEach((key) => {
    process.env[key] = configenv[key];
  });
}
