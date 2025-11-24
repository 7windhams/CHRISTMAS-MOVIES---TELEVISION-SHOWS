/* ========================================
   CHRISTMAS MOVIES DATABASE - MANUAL SETUP
   Copy and paste each section separately
   ======================================== */

/* STEP 1: CREATE DATABASE */
CREATE DATABASE IF NOT EXISTS christmas_movies;
USE christmas_movies;

/* STEP 2: CREATE MAIN TABLES */

/* Producer Table */
CREATE TABLE IF NOT EXISTS producer (
    producer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Director Table */
CREATE TABLE IF NOT EXISTS director (
    director_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Actor Table */
CREATE TABLE IF NOT EXISTS actor (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Streaming Platform Table */
CREATE TABLE IF NOT EXISTS streaming_platform (
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    website_url VARCHAR(255),
    subscription_cost DECIMAL(5,2),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Program Table (Main table) */
CREATE TABLE IF NOT EXISTS program (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    yr_released INT NOT NULL,
    runtime INT,
    producer_id INT,
    format ENUM('live-action', 'stop-motion', 'animation', 'mixed-media') NOT NULL,
    program_rating VARCHAR(10) NOT NULL,
    rating DECIMAL(3,1),
    img_url VARCHAR(500),
    description TEXT,
    type ENUM('movie', 'tv_show', 'special') DEFAULT 'movie',
    seasons INT DEFAULT NULL,
    episodes INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES producer(producer_id)
);

/* STEP 3: CREATE PIVOT TABLES (Relationships) */

/* Program-Director Relationship */
CREATE TABLE IF NOT EXISTS program_director (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    director_id INT NOT NULL,
    role VARCHAR(100) DEFAULT 'Director',
    FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
    FOREIGN KEY (director_id) REFERENCES director(director_id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_director (program_id, director_id)
);

/* Program-Actor Relationship */
CREATE TABLE IF NOT EXISTS program_actor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    actor_id INT NOT NULL,
    character_name VARCHAR(255),
    role_type ENUM('lead', 'supporting', 'guest', 'cameo') DEFAULT 'supporting',
    FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actor(actor_id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_actor_character (program_id, actor_id, character_name)
);

/* Program-Streaming Platform Relationship */
CREATE TABLE IF NOT EXISTS program_streaming_platform (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    platform_id INT NOT NULL,
    available_from DATE,
    available_until DATE NULL,
    is_currently_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES streaming_platform(platform_id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_platform (program_id, platform_id)
);

/* STEP 4: VERIFY TABLES CREATED */
SHOW TABLES;