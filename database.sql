-- Christmas Movies & TV Shows Database Schema
-- Updated to meet final project requirements

-- Create database
CREATE DATABASE IF NOT EXISTS christmas_movies;
USE christmas_movies;

-- Producer table (must be created first for foreign key reference)
CREATE TABLE IF NOT EXISTS producer (
    producer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Director table
CREATE TABLE IF NOT EXISTS director (
    director_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Actor table
CREATE TABLE IF NOT EXISTS actor (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Streaming Platform table
CREATE TABLE IF NOT EXISTS streaming_platform (
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    website_url VARCHAR(255),
    subscription_cost DECIMAL(5,2),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Program table (main table with foreign key to producer)
CREATE TABLE IF NOT EXISTS program (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    yr_released INT NOT NULL,
    runtime INT, -- in minutes
    producer_id INT,
    format ENUM('live-action', 'stop-motion', 'animation', 'mixed-media') NOT NULL,
    program_rating VARCHAR(10) NOT NULL, -- G, PG, PG-13, R, TV-Y, TV-G, TV-PG, TV-14, TV-MA
    rating DECIMAL(3,1), -- IMDb/personal rating out of 10
    img_url VARCHAR(500),
    description TEXT,
    type ENUM('movie', 'tv_show', 'special') DEFAULT 'movie',
    seasons INT DEFAULT NULL, -- For TV shows
    episodes INT DEFAULT NULL, -- For TV shows
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES producer(producer_id)
);

-- Pivot Tables for Many-to-Many Relationships

-- Program-Director relationship (many-to-many)
CREATE TABLE IF NOT EXISTS program_director (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    director_id INT NOT NULL,
    role VARCHAR(100) DEFAULT 'Director', -- Director, Co-Director, etc.
    FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
    FOREIGN KEY (director_id) REFERENCES director(director_id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_director (program_id, director_id)
);

-- Program-Actor relationship (many-to-many)
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

-- Program-Streaming Platform relationship (many-to-many)
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

-- Insert sample data (25+ programs required)

-- Insert Streaming Platforms
INSERT INTO streaming_platform (name, website_url, subscription_cost, country) VALUES
('Netflix', 'https://netflix.com', 15.49, 'United States'),
('Disney+', 'https://disneyplus.com', 7.99, 'United States'),
('HBO Max', 'https://hbomax.com', 14.99, 'United States'),
('Apple TV+', 'https://tv.apple.com', 6.99, 'United States'),
('Peacock', 'https://peacocktv.com', 5.99, 'United States'),
('Freeform', 'https://freeform.go.com', 0.00, 'United States'),
('Amazon Prime Video', 'https://primevideo.com', 8.99, 'United States'),
('Hulu', 'https://hulu.com', 7.99, 'United States'),
('Paramount+', 'https://paramountplus.com', 5.99, 'United States'),
('Hallmark Channel', 'https://hallmarkchannel.com', 0.00, 'United States');

-- Insert Producers
INSERT INTO producer (name, birth_date, nationality, biography) VALUES
('John Hughes', '1950-02-18', 'American', 'American filmmaker and producer known for teen films and comedies'),
('Todd Lieberman', '1973-02-20', 'American', 'American film producer known for family and adventure films'),
('Steve Starkey', '1955-08-13', 'American', 'American film producer, frequent collaborator with Robert Zemeckis'),
('René Dupont', '1946-12-03', 'Canadian', 'Canadian producer known for Christmas-themed productions'),
('Duncan Kenworthy', '1949-04-08', 'British', 'British film and television producer'),
('Chris Meledandri', '1959-05-15', 'American', 'American film producer, founder of Illumination Entertainment'),
('Jerry Bruckheimer', '1943-09-21', 'American', 'American film and television producer'),
('Kevin Feige', '1973-06-02', 'American', 'American film producer, president of Marvel Studios'),
('Kathleen Kennedy', '1953-06-05', 'American', 'American film producer, president of Lucasfilm'),
('Scott Rudin', '1958-07-14', 'American', 'American film producer'),
('Brad Krevoy', '1956-08-18', 'American', 'American film producer specializing in family films'),
('Harvey Weinstein', '1952-03-19', 'American', 'American former film producer'),
('David Heyman', '1961-07-26', 'British', 'British film producer known for Harry Potter series');

-- Insert Directors
INSERT INTO director (name, birth_date, nationality, biography) VALUES
('Chris Columbus', '1958-09-10', 'American', 'American filmmaker known for directing Harry Potter films and Home Alone'),
('Jon Favreau', '1966-10-19', 'American', 'American actor, director, producer known for Iron Man and Elf'),
('Robert Zemeckis', '1952-05-14', 'American', 'American filmmaker known for Back to the Future and Forrest Gump'),
('Bob Clark', '1939-08-05', 'American', 'American director known for A Christmas Story and Black Christmas'),
('Richard Curtis', '1956-11-08', 'British', 'British screenwriter and director known for romantic comedies'),
('John Lasseter', '1957-01-12', 'American', 'American animator and film director, co-founder of Pixar'),
('Tim Burton', '1958-08-25', 'American', 'American filmmaker known for gothic fantasy films'),
('Ron Howard', '1954-03-01', 'American', 'American director and former actor'),
('Nancy Meyers', '1949-12-08', 'American', 'American filmmaker known for romantic comedies'),
('Garry Marshall', '1934-11-13', 'American', 'American filmmaker and actor'),
('Frank Capra', '1897-05-18', 'American', 'Italian-American film director known for Its a Wonderful Life'),
('Michael Curtiz', '1886-12-24', 'Hungarian', 'Hungarian-American film director'),
('George Seaton', '1911-04-17', 'American', 'American screenwriter, playwright, and film director');

-- Insert Actors (25+ actors)
INSERT INTO actor (name, birth_date, nationality, biography) VALUES
('Macaulay Culkin', '1980-08-26', 'American', 'American actor known for playing Kevin McCallister in Home Alone'),
('Joe Pesci', '1943-02-09', 'American', 'American actor known for Goodfellas and Home Alone'),
('Daniel Stern', '1957-08-28', 'American', 'American actor known for Home Alone and City Slickers'),
('Will Ferrell', '1967-07-16', 'American', 'American comedian and actor known for SNL and Elf'),
('Zooey Deschanel', '1980-01-17', 'American', 'American actress and musician known for New Girl and Elf'),
('James Caan', '1940-03-26', 'American', 'American actor known for The Godfather and Elf'),
('Tom Hanks', '1956-07-09', 'American', 'American actor known for Forrest Gump and The Polar Express'),
('Peter Billingsley', '1971-04-16', 'American', 'American actor and director known for A Christmas Story'),
('Hugh Grant', '1960-09-09', 'British', 'British actor known for romantic comedies including Love Actually'),
('Emma Thompson', '1959-04-15', 'British', 'British actress known for Harry Potter and Love Actually'),
('Keira Knightley', '1985-03-26', 'British', 'British actress known for Pirates of the Caribbean and Love Actually'),
('Jimmy Stewart', '1908-05-20', 'American', 'American actor known for Its a Wonderful Life'),
('Donna Reed', '1921-01-27', 'American', 'American actress known for Its a Wonderful Life'),
('Bing Crosby', '1903-05-03', 'American', 'American singer and actor known for White Christmas'),
('Danny Kaye', '1911-01-18', 'American', 'American actor, comedian, and singer'),
('Rosemary Clooney', '1928-05-23', 'American', 'American singer and actress'),
('Arnold Schwarzenegger', '1947-07-30', 'Austrian', 'Austrian-American actor and former politician'),
('Sinbad', '1956-11-10', 'American', 'American comedian and actor'),
('Phil Hartman', '1948-09-24', 'Canadian', 'Canadian-American actor and comedian'),
('Jake Gyllenhaal', '1980-12-19', 'American', 'American actor known for dramatic roles'),
('Anne Hathaway', '1982-11-12', 'American', 'American actress known for various films'),
('Billy Bob Thornton', '1955-08-04', 'American', 'American actor, filmmaker, and musician'),
('Tim Allen', '1953-06-13', 'American', 'American comedian and actor known for Home Improvement'),
('Chevy Chase', '1943-10-08', 'American', 'American comedian and actor'),
('Beverly DAngelo', '1951-11-15', 'American', 'American actress and singer'),
('Michael Keaton', '1951-09-05', 'American', 'American actor known for Batman'),
('Diane Keaton', '1946-01-05', 'American', 'American actress known for various films'),
('Jack Black', '1969-08-28', 'American', 'American actor and musician'),
('Kate Winslet', '1975-10-05', 'British', 'British actress known for Titanic'),
('Jim Carrey', '1962-01-17', 'Canadian', 'Canadian-American actor and comedian');

-- Insert Programs (25+ programs as required)
INSERT INTO program (title, yr_released, runtime, producer_id, format, program_rating, rating, img_url, description, type, seasons, episodes) VALUES
('Home Alone', 1990, 103, 1, 'live-action', 'PG', 7.7, 'https://example.com/home_alone.jpg', 'An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.', 'movie', NULL, NULL),
('Elf', 2003, 97, 2, 'live-action', 'PG', 7.1, 'https://example.com/elf.jpg', 'After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.', 'movie', NULL, NULL),
('The Polar Express', 2004, 100, 3, 'animation', 'G', 6.6, 'https://example.com/polar_express.jpg', 'On Christmas Eve, a young boy embarks on a magical adventure to the North Pole on the Polar Express.', 'movie', NULL, NULL),
('A Christmas Story', 1983, 93, 4, 'live-action', 'PG', 7.9, 'https://example.com/christmas_story.jpg', 'In the 1940s, a young boy named Ralphie attempts to convince his parents that a Red Ryder BB gun really is the perfect Christmas gift.', 'movie', NULL, NULL),
('Love Actually', 2003, 135, 5, 'live-action', 'R', 7.6, 'https://example.com/love_actually.jpg', 'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London.', 'movie', NULL, NULL),
('Its a Wonderful Life', 1946, 130, 7, 'live-action', 'PG', 8.6, 'https://example.com/wonderful_life.jpg', 'An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.', 'movie', NULL, NULL),
('White Christmas', 1954, 120, 8, 'live-action', 'PG', 7.4, 'https://example.com/white_christmas.jpg', 'A successful song-and-dance team become romantically involved with a sister act and team up to save the failing Vermont inn of their former commanding general.', 'movie', NULL, NULL),
('Jingle All the Way', 1996, 89, 9, 'live-action', 'PG', 5.7, 'https://example.com/jingle_all_the_way.jpg', 'A father vows to get his son a Turbo Man action figure for Christmas. However, every store is sold out of them, and he must travel all over town and compete with everybody else in order to find one.', 'movie', NULL, NULL),
('National Lampoons Christmas Vacation', 1989, 97, 10, 'live-action', 'PG-13', 7.6, 'https://example.com/christmas_vacation.jpg', 'The Griswold familys plans for a big family Christmas predictably turn into a big disaster.', 'movie', NULL, NULL),
('The Santa Clause', 1994, 97, 11, 'live-action', 'PG', 6.5, 'https://example.com/santa_clause.jpg', 'When a man inadvertently makes Santa fall off of his roof on Christmas Eve, he finds himself magically recruited to take his place.', 'movie', NULL, NULL),
('A Charlie Brown Christmas', 1965, 25, 12, 'animation', 'G', 8.3, 'https://example.com/charlie_brown.jpg', 'Charlie Brown is depressed about the commercialization of Christmas until he finds the true meaning of the holiday.', 'special', 1, 1),
('Rudolph the Red-Nosed Reindeer', 1964, 52, 13, 'stop-motion', 'G', 8.0, 'https://example.com/rudolph.jpg', 'A young reindeer Rudolph lives at the North Pole. His father is one of Santas reindeer and it is expected that Rudolph will eventually be one too.', 'special', 1, 1),
('How the Grinch Stole Christmas', 2000, 104, 1, 'live-action', 'PG', 6.2, 'https://example.com/grinch.jpg', 'On the outskirts of Whoville lives a green, revenge-seeking Grinch who plans to ruin Christmas for all of the citizens of the town.', 'movie', NULL, NULL),
('The Holiday', 2006, 136, 2, 'live-action', 'PG-13', 6.9, 'https://example.com/holiday.jpg', 'Two women troubled with guy-problems swap homes in each others countries, where they each meet a local guy and fall in love.', 'movie', NULL, NULL),
('Four Weddings and a Funeral', 1994, 117, 3, 'live-action', 'R', 7.1, 'https://example.com/four_weddings.jpg', 'Over the course of five social occasions, a committed bachelor must consider the notion that he may have discovered love.', 'movie', NULL, NULL),
('Miracle on 34th Street', 1947, 96, 4, 'live-action', 'G', 7.9, 'https://example.com/miracle_34th.jpg', 'When a nice old man who claims to be Santa Claus is institutionalized as insane, a young lawyer decides to defend him by arguing in court that he is the real thing.', 'movie', NULL, NULL),
('The Nightmare Before Christmas', 1993, 76, 5, 'stop-motion', 'PG', 7.9, 'https://example.com/nightmare_christmas.jpg', 'Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.', 'movie', NULL, NULL),
('Die Hard', 1988, 132, 6, 'live-action', 'R', 8.2, 'https://example.com/die_hard.jpg', 'A New York City police officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.', 'movie', NULL, NULL),
('Scrooged', 1988, 101, 7, 'live-action', 'PG-13', 6.9, 'https://example.com/scrooged.jpg', 'A selfish, cynical television executive is haunted by three spirits bearing lessons on Christmas Eve.', 'movie', NULL, NULL),
('Bad Santa', 2003, 92, 8, 'live-action', 'R', 7.1, 'https://example.com/bad_santa.jpg', 'A miserable conman and his partner pose as Santa and his Little Helper to rob department stores on Christmas Eve. But they run into problems when the conman befriends a troubled kid.', 'movie', NULL, NULL),
('Klaus', 2019, 96, 9, 'animation', 'PG', 8.2, 'https://example.com/klaus.jpg', 'A simple act of kindness always sparks another, even in a frozen, faraway place. When Smeerenbourg postman Jesper meets toymaker Klaus, their unlikely friendship transforms an old feud in a sleepy town.', 'movie', NULL, NULL),
('Arthur Christmas', 2011, 97, 10, 'animation', 'PG', 7.1, 'https://example.com/arthur_christmas.jpg', 'Santas clumsy son Arthur gets put on a mission with St. Nicks father to give out a present they missed.', 'movie', NULL, NULL),
('The Muppet Christmas Carol', 1992, 85, 11, 'live-action', 'G', 7.7, 'https://example.com/muppet_carol.jpg', 'The Muppet characters tell their version of the classic tale of an old and bitter miser being visited by spirits who show him his past, present, and future.', 'movie', NULL, NULL),
('A Christmas Carol', 2009, 96, 12, 'animation', 'PG', 6.8, 'https://example.com/christmas_carol_2009.jpg', 'An animated retelling of Charles Dickens classic novel about a Victorian-era miser taken on a journey of self-redemption, courtesy of several mysterious Christmas apparitions.', 'movie', NULL, NULL),
('Frosty the Snowman', 1969, 25, 13, 'animation', 'G', 7.3, 'https://example.com/frosty.jpg', 'A living snowman and a little girl struggle to elude a greedy magician who is after the snowmans magic hat.', 'special', 1, 1),
('The Christmas Chronicles', 2018, 104, 1, 'live-action', 'PG', 7.0, 'https://example.com/christmas_chronicles.jpg', 'The story of sister and brother, Kate and Teddy Pierce, whose Christmas Eve plan to catch Santa Claus on camera turns into an unexpected journey that most kids could only dream about.', 'movie', NULL, NULL),
('Deck the Halls', 2006, 93, 2, 'live-action', 'PG', 5.0, 'https://example.com/deck_halls.jpg', 'Two neighbors have it out after one of them decorates his house for the holidays so brightly that it can be seen from space.', 'movie', NULL, NULL),
('Last Christmas', 2019, 103, 3, 'live-action', 'PG-13', 6.5, 'https://example.com/last_christmas.jpg', 'Kate harumphs around London, a bundle of bad decisions accompanied by the jangle of bells on her shoes, another irritating consequence from her job as an elf in a year-round Christmas shop.', 'movie', NULL, NULL);

-- Link Programs with Directors (some programs may have multiple directors)
INSERT INTO program_director (program_id, director_id, role) VALUES
(1, 1, 'Director'), -- Home Alone - Chris Columbus
(2, 2, 'Director'), -- Elf - Jon Favreau  
(3, 3, 'Director'), -- The Polar Express - Robert Zemeckis
(4, 4, 'Director'), -- A Christmas Story - Bob Clark
(5, 5, 'Director'), -- Love Actually - Richard Curtis
(6, 11, 'Director'), -- Its a Wonderful Life - Frank Capra
(7, 12, 'Director'), -- White Christmas - Michael Curtiz
(8, 8, 'Director'), -- Jingle All the Way - Ron Howard
(9, 10, 'Director'), -- Christmas Vacation - Garry Marshall
(10, 6, 'Director'), -- The Santa Clause - John Lasseter
(11, 6, 'Director'), -- A Charlie Brown Christmas - John Lasseter
(12, 6, 'Director'), -- Rudolph - John Lasseter
(13, 8, 'Director'), -- Grinch - Ron Howard
(14, 9, 'Director'), -- The Holiday - Nancy Meyers
(15, 5, 'Director'), -- Four Weddings - Richard Curtis
(16, 13, 'Director'), -- Miracle on 34th Street - George Seaton
(17, 7, 'Director'), -- Nightmare Before Christmas - Tim Burton
(18, 6, 'Director'), -- Die Hard - John Lasseter
(19, 4, 'Director'), -- Scrooged - Bob Clark
(20, 7, 'Director'), -- Bad Santa - Tim Burton
(21, 6, 'Director'), -- Klaus - John Lasseter
(22, 6, 'Director'), -- Arthur Christmas - John Lasseter
(23, 7, 'Director'), -- Muppet Christmas Carol - Tim Burton
(24, 3, 'Director'), -- A Christmas Carol 2009 - Robert Zemeckis
(25, 6, 'Director'), -- Frosty - John Lasseter
(26, 1, 'Director'), -- Christmas Chronicles - Chris Columbus
(27, 8, 'Director'), -- Deck the Halls - Ron Howard
(28, 9, 'Director'); -- Last Christmas - Nancy Meyers

-- Link Programs with Actors (main cast members)
INSERT INTO program_actor (program_id, actor_id, character_name, role_type) VALUES
-- Home Alone
(1, 1, 'Kevin McCallister', 'lead'),
(1, 2, 'Harry Lime', 'supporting'),
(1, 3, 'Marv Murchins', 'supporting'),
-- Elf  
(2, 4, 'Buddy', 'lead'),
(2, 5, 'Jovie', 'supporting'),
(2, 6, 'Walter Hobbs', 'supporting'),
-- Polar Express
(3, 7, 'Conductor/Multiple Roles', 'lead'),
-- Christmas Story
(4, 8, 'Ralphie Parker', 'lead'),
-- Love Actually
(5, 9, 'Prime Minister', 'lead'),
(5, 10, 'Karen', 'supporting'),
(5, 11, 'Juliet', 'supporting'),
-- Its a Wonderful Life
(6, 12, 'George Bailey', 'lead'),
(6, 13, 'Mary Hatch Bailey', 'supporting'),
-- White Christmas
(7, 14, 'Bing Crosby Character', 'lead'),
(7, 15, 'Danny Kaye Character', 'supporting'),
(7, 16, 'Rosemary Clooney Character', 'supporting'),
-- Jingle All the Way
(8, 17, 'Howard Langston', 'lead'),
(8, 18, 'Myron Larabee', 'supporting'),
(8, 19, 'Phil Hartman Character', 'supporting'),
-- Santa Clause
(10, 23, 'Scott Calvin/Santa', 'lead'),
-- Grinch
(13, 28, 'The Grinch', 'lead'),
-- Holiday
(14, 29, 'Kate Winslet Character', 'lead'),
(14, 21, 'Anne Hathaway Character', 'supporting'),
-- Die Hard
(18, 26, 'John McClane', 'lead'),
-- Bad Santa
(20, 22, 'Willie T. Stokes', 'lead'),
-- Last Christmas
(28, 21, 'Kate', 'lead');

-- Link Programs with Streaming Platforms
INSERT INTO program_streaming_platform (program_id, platform_id, available_from, is_currently_available) VALUES
(1, 2, '2019-11-12', TRUE), -- Home Alone on Disney+
(2, 3, '2020-05-27', TRUE), -- Elf on HBO Max  
(3, 3, '2020-05-27', TRUE), -- Polar Express on HBO Max
(4, 3, '2020-05-27', TRUE), -- Christmas Story on HBO Max
(5, 1, '2021-01-01', TRUE), -- Love Actually on Netflix
(6, 4, '2019-11-01', TRUE), -- Its a Wonderful Life on Apple TV+
(7, 5, '2020-12-01', TRUE), -- White Christmas on Peacock
(8, 1, '2020-12-01', TRUE), -- Jingle All the Way on Netflix
(9, 3, '2020-11-01', TRUE), -- Christmas Vacation on HBO Max
(10, 2, '2019-11-12', TRUE), -- Santa Clause on Disney+
(11, 4, '2019-11-01', TRUE), -- Charlie Brown on Apple TV+
(12, 6, '2018-12-01', TRUE), -- Rudolph on Freeform
(13, 1, '2020-12-01', TRUE), -- Grinch on Netflix
(14, 7, '2021-01-01', TRUE), -- Holiday on Amazon Prime
(15, 8, '2020-01-01', TRUE), -- Four Weddings on Hulu
(16, 2, '2019-11-12', TRUE), -- Miracle 34th on Disney+
(17, 2, '2019-11-12', TRUE), -- Nightmare Christmas on Disney+
(18, 3, '2020-01-01', TRUE), -- Die Hard on HBO Max
(19, 9, '2020-12-01', TRUE), -- Scrooged on Paramount+
(20, 1, '2020-12-01', TRUE), -- Bad Santa on Netflix
(21, 1, '2019-11-15', TRUE), -- Klaus on Netflix
(22, 1, '2020-12-01', TRUE), -- Arthur Christmas on Netflix
(23, 2, '2019-11-12', TRUE), -- Muppet Carol on Disney+
(24, 2, '2019-11-12', TRUE), -- Christmas Carol 2009 on Disney+
(25, 6, '2018-12-01', TRUE), -- Frosty on Freeform
(26, 1, '2018-11-22', TRUE), -- Christmas Chronicles on Netflix
(27, 3, '2020-12-01', TRUE), -- Deck the Halls on HBO Max
(28, 7, '2019-11-08', TRUE); -- Last Christmas on Amazon Prime