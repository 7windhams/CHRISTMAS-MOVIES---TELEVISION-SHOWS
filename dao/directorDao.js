// directorDao.js - Director Data Access Object
const DaoCommon = require('./daoCommon');

class DirectorDao extends DaoCommon {
  constructor() {
    super('director', 'director_id');
  }

  // Unique method 1: Find directors by nationality
  async findByNationality(nationality) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM director WHERE nationality LIKE ? ORDER BY name`,
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

  // Unique method 2: Find directors with their programs
  async findWithPrograms(directorId = null) {
    const connection = await this.getConnection();
    try {
      let query = `
        SELECT 
          d.*,
          GROUP_CONCAT(
            CONCAT(p.title, ' (', p.yr_released, ') - ', pd.role)
            SEPARATOR '; '
          ) as programs
        FROM director d
        LEFT JOIN program_director pd ON d.director_id = pd.director_id
        LEFT JOIN program p ON pd.program_id = p.program_id
      `;
      
      let params = [];
      if (directorId) {
        query += ` WHERE d.director_id = ?`;
        params.push(directorId);
      }
      
      query += ` GROUP BY d.director_id ORDER BY d.name`;
      
      const [rows] = await connection.execute(query, params);
      return directorId ? (rows.length > 0 ? rows[0] : null) : rows;
    } catch (error) {
      console.error('Error in findWithPrograms:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = DirectorDao;