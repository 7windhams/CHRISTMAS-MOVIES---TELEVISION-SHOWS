// dao/index.js - DAO module exports
const { MockProgramDao, MockActorDao, MockDirectorDao, MockProducerDao, MockStreamingPlatformDao } = require('./mockDao');

// Using Mock DAOs until MySQL is installed
module.exports = {
  ProgramDao: MockProgramDao,
  ActorDao: MockActorDao,
  DirectorDao: MockDirectorDao,
  ProducerDao: MockProducerDao,
  StreamingPlatformDao: MockStreamingPlatformDao
};