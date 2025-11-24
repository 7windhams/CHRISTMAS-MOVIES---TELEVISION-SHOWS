/* ========================================
   STEP 2: INSERT SAMPLE DATA
   Run this AFTER creating all tables
   ======================================== */

/* INSERT STREAMING PLATFORMS */
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

/* INSERT PRODUCERS */
INSERT INTO producer (name, birth_date, nationality, biography) VALUES
('John Hughes', '1950-02-18', 'American', 'American filmmaker and producer known for teen films and comedies'),
('Todd Lieberman', '1973-02-20', 'American', 'American film producer known for family and adventure films'),
('Steve Starkey', '1955-08-13', 'American', 'American film producer, frequent collaborator with Robert Zemeckis'),
('Duncan Kenworthy', '1949-04-08', 'British', 'British film and television producer'),
('Chris Meledandri', '1959-05-15', 'American', 'American film producer, founder of Illumination Entertainment'),
('Jerry Bruckheimer', '1943-09-21', 'American', 'American film and television producer'),
('Kevin Feige', '1973-06-02', 'American', 'American film producer, president of Marvel Studios'),
('Kathleen Kennedy', '1953-06-05', 'American', 'American film producer, president of Lucasfilm'),
('Scott Rudin', '1958-07-14', 'American', 'American film producer'),
('Brad Krevoy', '1956-08-18', 'American', 'American film producer specializing in family films'),
('Harvey Weinstein', '1952-03-19', 'American', 'American former film producer'),
('David Heyman', '1961-07-26', 'British', 'British film producer known for Harry Potter series'),
('Frank Capra', '1897-05-18', 'American', 'Italian-American film director and producer');

/* INSERT DIRECTORS */
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

/* INSERT ACTORS (First 15) */
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
('Danny Kaye', '1911-01-18', 'American', 'American actor, comedian, and singer');

/* INSERT MORE ACTORS (Second 15) */
INSERT INTO actor (name, birth_date, nationality, biography) VALUES
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

/* VERIFY DATA INSERTED */
SELECT COUNT(*) AS producer_count FROM producer;
SELECT COUNT(*) AS director_count FROM director;
SELECT COUNT(*) AS actor_count FROM actor;
SELECT COUNT(*) AS platform_count FROM streaming_platform;