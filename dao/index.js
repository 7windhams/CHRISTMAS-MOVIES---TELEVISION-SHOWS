// dao/index.js - DAO module exports
const ProgramDao = require('./programDao');
const ActorDao = require('./actorDao');
const DirectorDao = require('./directorDao');
const ProducerDao = require('./producerDao');
const StreamingPlatformDao = require('./streamingPlatformDao');

// Export real DAO classes for database connection
module.exports = {
  ProgramDao,
  ActorDao,
  DirectorDao,
  ProducerDao,
  StreamingPlatformDao
};