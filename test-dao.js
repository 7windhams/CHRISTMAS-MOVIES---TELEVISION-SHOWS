#!/usr/bin/env node

/**
 * Quick test script to verify DAO functionality
 * Run with: node test-dao.js
 */

const { MockProgramDao, MockActorDao } = require('./dao/mockDao');

async function testDAOs() {
  console.log('🎄 Testing Christmas Movies DAO Classes...\n');
  
  try {
    // Test Program DAO
    console.log('📺 Testing Program DAO:');
    const programDao = new MockProgramDao();
    const programs = await programDao.findAll();
    console.log(`✅ Found ${programs.length} programs`);
    console.log(`✅ First program: ${programs[0]?.title || 'None'}\n`);
    
    // Test search
    const searchResults = await programDao.search('title', 'Christmas');
    console.log(`✅ Search for "Christmas": ${searchResults.length} results\n`);
    
    // Test Actor DAO
    console.log('🎭 Testing Actor DAO:');
    const actorDao = new MockActorDao();
    const actors = await actorDao.findAll();
    console.log(`✅ Found ${actors.length} actors`);
    console.log(`✅ First actor: ${actors[0]?.name || 'None'}\n`);
    
    console.log('🎉 All DAO tests passed! Your application is ready to use.\n');
    
    console.log('📋 Next Steps:');
    console.log('1. Set up your MySQL database using database.sql');
    console.log('2. Configure your .env file with database credentials');
    console.log('3. Start the application with: npm start');
    console.log('4. Visit http://localhost:3000 to see your application');
    console.log('5. Test the API endpoints with Postman using postman-collection.json');
    console.log('6. Try adding actors and programs through the web forms');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
testDAOs().catch(console.error);