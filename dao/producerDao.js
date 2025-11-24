// producerDao.js - Producer Data Access Object
const DaoCommon = require('./daoCommon');

class ProducerDao extends DaoCommon {
  constructor() {
    super('producer', 'producer_id');
  }

  // Unique method 1: Find producers by nationality
  async findByNationality(nationality) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM producer WHERE nationality LIKE ? ORDER BY name`,
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

  // Unique method 2: Find producers with their programs
  async findWithPrograms(producerId = null) {
    const connection = await this.getConnection();
    try {
      let query = `
        SELECT 
          p.*,
          GROUP_CONCAT(
            CONCAT(pr.title, ' (', pr.yr_released, ')')
            SEPARATOR '; '
          ) as programs
        FROM producer p
        LEFT JOIN program pr ON p.producer_id = pr.producer_id
      `;
      
      let params = [];
      if (producerId) {
        query += ` WHERE p.producer_id = ?`;
        params.push(producerId);
      }
      
      query += ` GROUP BY p.producer_id ORDER BY p.name`;
      
      const [rows] = await connection.execute(query, params);
      return producerId ? (rows.length > 0 ? rows[0] : null) : rows;
    } catch (error) {
      console.error('Error in findWithPrograms:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = ProducerDao;