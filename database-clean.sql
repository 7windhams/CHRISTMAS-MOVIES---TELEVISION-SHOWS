CREATE DATABASE IF NOT EXISTS christmas_movies;
USE christmas_movies;

CREATE TABLE IF NOT EXISTS producer (
    producer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS director (
    director_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actor (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS streaming_platform (
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    website_url VARCHAR(255),
    subscription_cost DECIMAL(5,2),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS program_director (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    director_id INT NOT NULL,
    role VARCHAR(100) DEFAULT 'Director',
    FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
    FOREIGN KEY (director_id) REFERENCES director(director_id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_director (program_id, director_id)
);

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

INSERT INTO streaming_platform (name, website_url, subscription_cost, country) VALUES
('Netflix', 'https://netflix.com', 15.49, 'United States'),
('Disney+', 'https://disneyplus.com', 7.99, 'United States'),
('HBO Max', 'https://hbomax.com', 14.99, 'United States'),
('Apple TV+', 'https://tv.apple.com', 6.99, 'United States'),
('Peacock', 'https://peacocktv.com', 5.99, 'United States');

INSERT INTO producer (name, birth_date, nationality, biography) VALUES
('John Hughes', '1950-02-18', 'American', 'American filmmaker and producer known for teen films and comedies'),
('Todd Lieberman', '1973-02-20', 'American', 'American film producer known for family and adventure films'),
('Steve Starkey', '1955-08-13', 'American', 'American film producer, frequent collaborator with Robert Zemeckis'),
('Duncan Kenworthy', '1949-04-08', 'British', 'British film and television producer'),
('Chris Meledandri', '1959-05-15', 'American', 'American film producer, founder of Illumination Entertainment');

INSERT INTO director (name, birth_date, nationality, biography) VALUES
('Chris Columbus', '1958-09-10', 'American', 'American filmmaker known for directing Harry Potter films and Home Alone'),
('Jon Favreau', '1966-10-19', 'American', 'American actor, director, producer known for Iron Man and Elf'),
('Robert Zemeckis', '1952-05-14', 'American', 'American filmmaker known for Back to the Future and Forrest Gump'),
('Bob Clark', '1939-08-05', 'American', 'American director known for A Christmas Story and Black Christmas'),
('Richard Curtis', '1956-11-08', 'British', 'British screenwriter and director known for romantic comedies');

INSERT INTO actor (name, birth_date, nationality, biography) VALUES
('Macaulay Culkin', '1980-08-26', 'American', 'American actor known for playing Kevin McCallister in Home Alone'),
('Joe Pesci', '1943-02-09', 'American', 'American actor known for Goodfellas and Home Alone'),
('Daniel Stern', '1957-08-28', 'American', 'American actor known for Home Alone and City Slickers'),
('Will Ferrell', '1967-07-16', 'American', 'American comedian and actor known for SNL and Elf'),
('Zooey Deschanel', '1980-01-17', 'American', 'American actress and musician known for New Girl and Elf'),
('James Caan', '1940-03-26', 'American', 'American actor known for The Godfather and Elf'),
('Tom Hanks', '1956-07-09', 'American', 'American actor known for Forrest Gump and The Polar Express');

INSERT INTO program (title, yr_released, runtime, producer_id, format, program_rating, rating, img_url, description, type, seasons, episodes) VALUES
('Home Alone', 1990, 103, 1, 'live-action', 'PG', 7.7, 'https://example.com/home_alone.jpg', 'An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.', 'movie', NULL, NULL),
('Elf', 2003, 97, 2, 'live-action', 'PG', 7.1, 'https://example.com/elf.jpg', 'After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.', 'movie', NULL, NULL),
('The Polar Express', 2004, 100, 3, 'animation', 'G', 6.6, 'https://example.com/polar_express.jpg', 'On Christmas Eve, a young boy embarks on a magical adventure to the North Pole on the Polar Express.', 'movie', NULL, NULL),
('A Christmas Story', 1983, 93, 4, 'live-action', 'PG', 7.9, 'https://example.com/christmas_story.jpg', 'In the 1940s, a young boy named Ralphie attempts to convince his parents that a Red Ryder BB gun really is the perfect Christmas gift.', 'movie', NULL, NULL),
('Love Actually', 2003, 135, 5, 'live-action', 'R', 7.6, 'https://example.com/love_actually.jpg', 'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London.', 'movie', NULL, NULL);

INSERT INTO program_director (program_id, director_id, role) VALUES
(1, 1, 'Director'),
(2, 2, 'Director'),
(3, 3, 'Director'),
(4, 4, 'Director'),
(5, 5, 'Director');

INSERT INTO program_actor (program_id, actor_id, character_name, role_type) VALUES
(1, 1, 'Kevin McCallister', 'lead'),
(1, 2, 'Harry Lime', 'supporting'),
(1, 3, 'Marv Murchins', 'supporting'),
(2, 4, 'Buddy', 'lead'),
(2, 5, 'Jovie', 'supporting'),
(2, 6, 'Walter Hobbs', 'supporting'),
(3, 7, 'Conductor/Multiple Roles', 'lead');

INSERT INTO program_streaming_platform (program_id, platform_id, available_from, is_currently_available) VALUES
(1, 2, '2019-11-12', TRUE),
(2, 3, '2020-05-27', TRUE),
(3, 3, '2020-05-27', TRUE),
(4, 3, '2020-05-27', TRUE),
(5, 1, '2021-01-01', TRUE);