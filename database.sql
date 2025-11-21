-- Christmas Movies & TV Shows Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS christmas_movies;
USE christmas_movies;

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT,
    director VARCHAR(255),
    genre VARCHAR(100),
    rating VARCHAR(10),
    duration INT, -- in minutes
    description TEXT,
    poster_url VARCHAR(500),
    imdb_rating DECIMAL(3,1),
    streaming_platform VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TV Shows table
CREATE TABLE IF NOT EXISTS tvshows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_year INT,
    end_year INT,
    seasons INT,
    episodes INT,
    network VARCHAR(100),
    genre VARCHAR(100),
    rating VARCHAR(10),
    description TEXT,
    poster_url VARCHAR(500),
    imdb_rating DECIMAL(3,1),
    streaming_platform VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data for movies
INSERT INTO movies (title, year, director, genre, rating, duration, description, imdb_rating, streaming_platform) VALUES
('Home Alone', 1990, 'Chris Columbus', 'Comedy/Family', 'PG', 103, 'An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.', 7.7, 'Disney+'),
('Elf', 2003, 'Jon Favreau', 'Comedy/Family', 'PG', 97, 'After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.', 7.1, 'HBO Max'),
('The Polar Express', 2004, 'Robert Zemeckis', 'Animation/Family', 'G', 100, 'On Christmas Eve, a young boy embarks on a magical adventure to the North Pole on the Polar Express.', 6.6, 'HBO Max'),
('A Christmas Story', 1983, 'Bob Clark', 'Comedy/Family', 'PG', 93, 'In the 1940s, a young boy named Ralphie attempts to convince his parents that a Red Ryder BB gun really is the perfect Christmas gift.', 7.9, 'HBO Max'),
('Love Actually', 2003, 'Richard Curtis', 'Romance/Comedy', 'R', 135, 'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London.', 7.6, 'Netflix');

-- Sample data for TV shows
INSERT INTO tvshows (title, start_year, end_year, seasons, episodes, network, genre, rating, description, imdb_rating, streaming_platform) VALUES
('The Christmas Chronicles', 2018, 2020, 1, 2, 'Netflix', 'Family/Adventure', 'PG', 'Adventures of siblings Kate and Teddy Pierce who team up with Santa Claus for an unforgettable Christmas Eve adventure.', 7.0, 'Netflix'),
('A Charlie Brown Christmas', 1965, 1965, 1, 1, 'CBS', 'Animation/Family', 'G', 'Charlie Brown is depressed about the commercialization of Christmas until he finds the true meaning of the holiday.', 8.3, 'Apple TV+'),
('The Office Christmas Episodes', 2005, 2013, 9, 10, 'NBC', 'Comedy', 'TV-14', 'Collection of Christmas-themed episodes from the beloved workplace comedy series.', 8.8, 'Peacock'),
('Rudolph the Red-Nosed Reindeer', 1964, 1964, 1, 1, 'NBC', 'Animation/Family', 'G', 'A young reindeer Rudolph lives at the North Pole. His father is one of Santas reindeer and it is expected that Rudolph will eventually be one too.', 8.0, 'Freeform'),
('The Christmas Chronicles: Part Two', 2020, 2020, 1, 1, 'Netflix', 'Family/Adventure', 'PG', 'Kate Pierce, now a cynical teen, is unexpectedly reunited with Santa Claus when a mysterious troublemaker threatens to cancel Christmas forever.', 6.0, 'Netflix');