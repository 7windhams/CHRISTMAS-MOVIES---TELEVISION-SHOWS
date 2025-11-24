// actorDao.js - Actor Data Access Object
const DaoCommon = require('./daoCommon');

class ActorDao extends DaoCommon {
  constructor() {
    super('actor', 'actor_id');
  }

  // Unique method 1: Find actors by nationality
  async findByNationality(nationality) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM actor WHERE nationality LIKE ? ORDER BY name`,
        [`%${nationality}%`]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByNationality:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Unique method 2: Find actors with their programs
  async findWithPrograms(actorId = null) {
    const connection = await this.getConnection();
    try {
      let query = `
        SELECT 
          a.*,
          GROUP_CONCAT(
            CONCAT(p.title, ' (', pa.character_name, ' - ', pa.role_type, ')')
            SEPARATOR '; '
          ) as programs
        FROM actor a
        LEFT JOIN program_actor pa ON a.actor_id = pa.actor_id
        LEFT JOIN program p ON pa.program_id = p.program_id
      `;
      
      let params = [];
      if (actorId) {
        query += ` WHERE a.actor_id = ?`;
        params.push(actorId);
      }
      
      query += ` GROUP BY a.actor_id ORDER BY a.name`;
      
      const [rows] = await connection.execute(query, params);
      return actorId ? (rows.length > 0 ? rows[0] : null) : rows;
    } catch (error) {
      console.error('Error in findWithPrograms:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Find actors by birth year
  async findByBirthYear(year) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM actor WHERE YEAR(birth_date) = ? ORDER BY name`,
        [year]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByBirthYear:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Search actors by multiple criteria
  async searchAdvanced(name = '', nationality = '', birthYear = null) {
    const connection = await this.getConnection();
    try {
      let query = `SELECT * FROM actor WHERE 1=1`;
      const params = [];

      if (name) {
        query += ` AND name LIKE ?`;
        params.push(`%${name}%`);
      }

      if (nationality) {
        query += ` AND nationality LIKE ?`;
        params.push(`%${nationality}%`);
      }

      if (birthYear) {
        query += ` AND YEAR(birth_date) = ?`;
        params.push(birthYear);
      }

      query += ` ORDER BY name`;

      const [rows] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error in searchAdvanced:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = ActorDao;