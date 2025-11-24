// programDao.js - Program Data Access Object
const DaoCommon = require('./daoCommon');

class ProgramDao extends DaoCommon {
  constructor() {
    super('program', 'program_id');
  }

  // Unique method 1: Find programs by rating
  async findByRating(rating) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT 
          p.*,
          prod.name as producer_name,
          GROUP_CONCAT(DISTINCT CONCAT(d.name, ' (', pd.role, ')') SEPARATOR ', ') as directors,
          GROUP_CONCAT(DISTINCT CONCAT(a.name, ' as ', pa.character_name) SEPARATOR ', ') as actors,
          GROUP_CONCAT(DISTINCT sp.name SEPARATOR ', ') as streaming_platforms
        FROM program p
        LEFT JOIN producer prod ON p.producer_id = prod.producer_id
        LEFT JOIN program_director pd ON p.program_id = pd.program_id
        LEFT JOIN director d ON pd.director_id = d.director_id
        LEFT JOIN program_actor pa ON p.program_id = pa.program_id
        LEFT JOIN actor a ON pa.actor_id = a.actor_id
        LEFT JOIN program_streaming_platform psp ON p.program_id = psp.program_id
        LEFT JOIN streaming_platform sp ON psp.platform_id = sp.platform_id
        WHERE p.program_rating = ?
        GROUP BY p.program_id
        ORDER BY p.title`,
        [rating]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByRating:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Unique method 2: Find programs by streaming platform
  async findByStreamingPlatform(platformName) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT 
          p.*,
          prod.name as producer_name,
          GROUP_CONCAT(DISTINCT CONCAT(d.name, ' (', pd.role, ')') SEPARATOR ', ') as directors,
          GROUP_CONCAT(DISTINCT CONCAT(a.name, ' as ', pa.character_name) SEPARATOR ', ') as actors,
          sp.name as streaming_platform,
          psp.available_from,
          psp.is_currently_available
        FROM program p
        LEFT JOIN producer prod ON p.producer_id = prod.producer_id
        LEFT JOIN program_director pd ON p.program_id = pd.program_id
        LEFT JOIN director d ON pd.director_id = d.director_id
        LEFT JOIN program_actor pa ON p.program_id = pa.program_id
        LEFT JOIN actor a ON pa.actor_id = a.actor_id
        INNER JOIN program_streaming_platform psp ON p.program_id = psp.program_id
        INNER JOIN streaming_platform sp ON psp.platform_id = sp.platform_id
        WHERE sp.name LIKE ? AND psp.is_currently_available = TRUE
        GROUP BY p.program_id
        ORDER BY p.title`,
        [`%${platformName}%`]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByStreamingPlatform:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Override findAll to include relationships
  async findAll() {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT 
          p.*,
          prod.name as producer_name,
          GROUP_CONCAT(DISTINCT CONCAT(d.name, ' (', pd.role, ')') SEPARATOR ', ') as directors,
          GROUP_CONCAT(DISTINCT CONCAT(a.name, ' as ', pa.character_name) SEPARATOR ', ') as actors,
          GROUP_CONCAT(DISTINCT sp.name SEPARATOR ', ') as streaming_platforms
        FROM program p
        LEFT JOIN producer prod ON p.producer_id = prod.producer_id
        LEFT JOIN program_director pd ON p.program_id = pd.program_id
        LEFT JOIN director d ON pd.director_id = d.director_id
        LEFT JOIN program_actor pa ON p.program_id = pa.program_id
        LEFT JOIN actor a ON pa.actor_id = a.actor_id
        LEFT JOIN program_streaming_platform psp ON p.program_id = psp.program_id
        LEFT JOIN streaming_platform sp ON psp.platform_id = sp.platform_id
        GROUP BY p.program_id
        ORDER BY p.title`
      );
      return rows;
    } catch (error) {
      console.error('Error in findAll for programs:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Override findById to include relationships
  async findById(id) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT 
          p.*,
          prod.name as producer_name,
          prod.producer_id,
          GROUP_CONCAT(DISTINCT CONCAT(d.name, ' (', pd.role, ')') SEPARATOR ', ') as directors,
          GROUP_CONCAT(DISTINCT CONCAT(a.name, ' as ', pa.character_name) SEPARATOR ', ') as actors,
          GROUP_CONCAT(DISTINCT sp.name SEPARATOR ', ') as streaming_platforms
        FROM program p
        LEFT JOIN producer prod ON p.producer_id = prod.producer_id
        LEFT JOIN program_director pd ON p.program_id = pd.program_id
        LEFT JOIN director d ON pd.director_id = d.director_id
        LEFT JOIN program_actor pa ON p.program_id = pa.program_id
        LEFT JOIN actor a ON pa.actor_id = a.actor_id
        LEFT JOIN program_streaming_platform psp ON p.program_id = psp.program_id
        LEFT JOIN streaming_platform sp ON psp.platform_id = sp.platform_id
        WHERE p.program_id = ?
        GROUP BY p.program_id`,
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error in findById for program:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Get programs by format (live-action, animation, etc.)
  async findByFormat(format) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM program WHERE format = ? ORDER BY title`,
        [format]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByFormat:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Get programs by type (movie, tv_show, special)
  async findByType(type) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM program WHERE type = ? ORDER BY title`,
        [type]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByType:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Get programs by year range
  async findByYearRange(startYear, endYear) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM program WHERE yr_released BETWEEN ? AND ? ORDER BY yr_released DESC`,
        [startYear, endYear]
      );
      return rows;
    } catch (error) {
      console.error('Error in findByYearRange:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

module.exports = ProgramDao;