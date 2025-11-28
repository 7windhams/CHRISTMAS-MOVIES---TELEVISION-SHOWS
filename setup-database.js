#!/usr/bin/env node

/**
 * Database Setup Script
 * This script will create the Christmas Movies database and populate it with data
 * Run with: node setup-database.js
 */

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Sdw$1956',
  // Don't specify database initially - we need to create it
};

async function setupDatabase() {
  console.log('🎄 Setting up Christmas Movies Database...\n');
  
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    console.log('📡 Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server\n');
    
    // Create database if it doesn't exist
    console.log('🗄️  Creating database...');
    await connection.execute('CREATE DATABASE IF NOT EXISTS christmas_movies');
    console.log('✅ Database "christmas_movies" created/verified\n');
    
    // Switch to the new database
    await connection.execute('USE christmas_movies');
    console.log('🔄 Switched to christmas_movies database\n');
    
    // Read and execute the SQL file
    console.log('📋 Reading database.sql file...');
    const sqlFilePath = path.join(__dirname, 'database.sql');
    const sqlContent = await fs.readFile(sqlFilePath, 'utf8');
    
    // Clean and split SQL into individual statements
    const cleanedSql = sqlContent
      .replace(/--.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    const statements = cleanedSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📊 Found ${statements.length} SQL statements to execute\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.toLowerCase().includes('create table')) {
        const tableName = statement.match(/create table (?:if not exists )?(\w+)/i)?.[1];
        console.log(`📋 Creating table: ${tableName}`);
      } else if (statement.toLowerCase().includes('insert into')) {
        const tableName = statement.match(/insert into (\w+)/i)?.[1];
        process.stdout.write(`📝 Inserting data into ${tableName}... `);
      }
      
      try {
        await connection.execute(statement);
        if (statement.toLowerCase().includes('insert into')) {
          console.log('✅');
        } else if (statement.toLowerCase().includes('create table')) {
          console.log('✅ Table created');
        }
      } catch (error) {
        console.log(`❌ Error executing statement: ${error.message}`);
        // Continue with other statements
      }
    }
    
    // Verify the setup
    console.log('\n🔍 Verifying database setup...');
    
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables in database`);
    
    const [programCount] = await connection.execute('SELECT COUNT(*) as count FROM program');
    console.log(`✅ Found ${programCount[0].count} programs in database`);
    
    const [actorCount] = await connection.execute('SELECT COUNT(*) as count FROM actor');
    console.log(`✅ Found ${actorCount[0].count} actors in database`);
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Create a .env file with your database credentials:');
    console.log('   DB_HOST=localhost');
    console.log('   DB_USER=root');
    console.log('   DB_PASSWORD=your_password');
    console.log('   DB_NAME=christmas_movies');
    console.log('');
    console.log('2. Start your application:');
    console.log('   npm start');
    console.log('');
    console.log('3. Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Manual Setup Instructions:');
    console.log('1. Install MySQL Server if not already installed');
    console.log('2. Start MySQL service');
    console.log('3. Open MySQL Workbench or command line client');
    console.log('4. Create database: CREATE DATABASE christmas_movies;');
    console.log('5. Import the database.sql file into the database');
    console.log('6. Configure your .env file with database credentials');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase().catch(console.error);