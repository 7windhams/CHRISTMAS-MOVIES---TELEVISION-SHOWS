#!/usr/bin/env node

/**
 * Simple Database Setup Script
 * This script will execute the step-by-step SQL files to set up the database
 */

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Sdw$1956',
  database: 'christmas_movies' // Connect directly to the database
};

async function executeSqlFile(connection, filename) {
  console.log(`📋 Executing ${filename}...`);
  
  try {
    const sqlContent = await fs.readFile(path.join(__dirname, filename), 'utf8');
    
    // Split into individual statements and clean them
    const statements = sqlContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/--.*$/gm, '') // Remove single-line comments
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.toLowerCase().startsWith('use '));
    
    for (const statement of statements) {
      if (statement.trim()) {
        // Use query instead of execute for DDL statements
        await connection.query(statement);
      }
    }
    
    console.log(`✅ ${filename} executed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Error executing ${filename}:`, error.message);
    return false;
  }
}

async function setupDatabase() {
  console.log('🎄 Setting up Christmas Movies Database (Simple)...\n');
  
  let connection;
  
  try {
    // Connect to the database
    console.log('📡 Connecting to christmas_movies database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully\n');
    
    // Execute SQL files in order
    const sqlFiles = [
      'STEP-1-CREATE-TABLES.sql',
      'STEP-2-INSERT-PEOPLE-PLATFORMS.sql', 
      'STEP-3-INSERT-PROGRAMS.sql',
      'STEP-4-CREATE-RELATIONSHIPS.sql'
    ];
    
    for (const sqlFile of sqlFiles) {
      const success = await executeSqlFile(connection, sqlFile);
      if (!success) {
        throw new Error(`Failed to execute ${sqlFile}`);
      }
    }
    
    // Verify the setup
    console.log('\n🔍 Verifying database setup...');
    
    const [programCount] = await connection.execute('SELECT COUNT(*) as count FROM program');
    console.log(`✅ Found ${programCount[0].count} programs in database`);
    
    const [actorCount] = await connection.execute('SELECT COUNT(*) as count FROM actor');
    console.log(`✅ Found ${actorCount[0].count} actors in database`);
    
    console.log('\n🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase().catch(console.error);