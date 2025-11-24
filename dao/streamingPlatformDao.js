// streamingPlatformDao.js - Streaming Platform Data Access Object
const DaoCommon = require('./daoCommon');

class StreamingPlatformDao extends DaoCommon {
  constructor() {
    super('streaming_platform', 'platform_id');
  }

  // Unique method 1: Find platforms by subscription cost range
  async findByCostRange(minCost, maxCost) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM streaming_platform 
         WHERE subscription_cost BETWEEN ? AND ? 
         ORDER BY subscription_cost ASC`,
        [minCost, maxCost]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByCostRange:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Unique method 2: Find platforms with their available programs
  async findWithPrograms(platformId = null) {
    const connection = await this.getConnection();
    try {
      let query = `
        SELECT 
          sp.*,
          COUNT(psp.program_id) as program_count,
          GROUP_CONCAT(
            CONCAT(p.title, ' (', p.yr_released, ')')
            ORDER BY p.title
            SEPARATOR '; '
          ) as available_programs
        FROM streaming_platform sp
        LEFT JOIN program_streaming_platform psp ON sp.platform_id = psp.platform_id
        LEFT JOIN program p ON psp.program_id = p.program_id
        WHERE psp.is_currently_available = TRUE OR psp.is_currently_available IS NULL
      `;
      
      let params = [];
      if (platformId) {
        query += ` AND sp.platform_id = ?`;
        params.push(platformId);
      }
      
      query += ` GROUP BY sp.platform_id ORDER BY sp.name`;
      
      const [rows] = await connection.execute(query, params);
      return platformId ? (rows.length > 0 ? rows[0] : null) : rows;
    } catch (error) {
      console.error('Error in findWithPrograms:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Find free platforms
  async findFreePlatforms() {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM streaming_platform WHERE subscription_cost = 0 ORDER BY name`
      );
      return rows;
    } catch (error) {
      console.error('Error in findFreePlatforms:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = StreamingPlatformDao;