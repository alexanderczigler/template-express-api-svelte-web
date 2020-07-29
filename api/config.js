const conf = require('@iteam/config')({
  file: `${process.cwd()}/config.json`,
  defaults: {
    node_env: 'local',
    system: {
      port: 3000,
      web: 'http://localhost:5000',
    },
  },
})

module.exports = {
  node_env: conf.get('node_env').toUpperCase(),
  system: conf.get('system'),
}
