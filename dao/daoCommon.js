// daoCommon.js - Base DAO class with common methods
const mysql = require('mysql2/promise');

class DaoCommon {
  constructor(tableName, primaryKey = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Sdw$1956',
      database: process.env.DB_NAME || 'christmas_movies'
    };
  }

  async getConnection() {
    try {
      return await mysql.createConnection(this.dbConfig);
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  // Required method: Find all records
  async findAll() {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(`SELECT * FROM ${this.tableName} ORDER BY ${this.primaryKey}`);
      return rows;
    } catch (error) {
      console.error(`Error in findAll for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Find record by ID
  async findById(id) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error(`Error in findById for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Count all records
  async countAll() {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${this.tableName}`);
      return rows[0].count;
    } catch (error) {
      console.error(`Error in countAll for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Search records
  async search(column, searchTerm) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${column} LIKE ? ORDER BY ${this.primaryKey}`,
        [`%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      console.error(`Error in search for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Sort records
  async sort(column, direction = 'ASC') {
    const connection = await this.getConnection();
    try {
      const sortDirection = direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      const [rows] = await connection.execute(
        `SELECT * FROM ${this.tableName} ORDER BY ${column} ${sortDirection}`
      );
      return rows;
    } catch (error) {
      console.error(`Error in sort for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Create new record
  async create(data) {
    const connection = await this.getConnection();
    try {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);

      const [result] = await connection.execute(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
        values
      );
      
      return {
        insertId: result.insertId,
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error(`Error in create for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Required method: Update record
  async update(id, data) {
    const connection = await this.getConnection();
    try {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];

      const [result] = await connection.execute(
        `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`,
        values
      );
      
      return {
        affectedRows: result.affectedRows,
        changedRows: result.changedRows
      };
    } catch (error) {
      console.error(`Error in update for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Additional helper method: Delete record
  async delete(id) {
    const connection = await this.getConnection();
    try {
      const [result] = await connection.execute(
        `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
        [id]
      );
      
      return {
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error(`Error in delete for ${this.tableName}:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Helper method for custom queries
  async executeQuery(query, params = []) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      console.error(`Error executing custom query:`, error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = DaoCommon;