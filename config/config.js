var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'jujustats'
    },
    port: 3000,
    db: 'sqlite://localhost/jujustats-development',
    storage: rootPath + '/data/jujustats-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'jujustats'
    },
    port: 3000,
    db: 'sqlite://localhost/jujustats-test',
    storage: rootPath + '/data/jujustats-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'jujustats'
    },
    port: 3000,
    db: 'sqlite://localhost/jujustats-production',
    storage: rootPath + 'data/jujustats-production'
  }
};

module.exports = config[env];
