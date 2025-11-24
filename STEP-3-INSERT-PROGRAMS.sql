/* ========================================
   STEP 3: INSERT PROGRAMS (MOVIES & TV SHOWS)
   Run this AFTER inserting people and platforms
   ======================================== */

/* INSERT PROGRAMS (25+ required for project) */
INSERT INTO program (title, yr_released, runtime, producer_id, format, program_rating, rating, img_url, description, type, seasons, episodes) VALUES

/* Christmas Movies - Part 1 */
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

/* Christmas TV Specials */
('A Charlie Brown Christmas', 1965, 25, 12, 'animation', 'G', 8.3, 'https://example.com/charlie_brown.jpg', 'Charlie Brown is depressed about the commercialization of Christmas until he finds the true meaning of the holiday.', 'special', 1, 1),

('Rudolph the Red-Nosed Reindeer', 1964, 52, 13, 'stop-motion', 'G', 8.0, 'https://example.com/rudolph.jpg', 'A young reindeer Rudolph lives at the North Pole. His father is one of Santas reindeer and it is expected that Rudolph will eventually be one too.', 'special', 1, 1),

/* More Christmas Movies */
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

/* Recent Christmas Movies */
('The Christmas Chronicles', 2018, 104, 1, 'live-action', 'PG', 7.0, 'https://example.com/christmas_chronicles.jpg', 'The story of sister and brother, Kate and Teddy Pierce, whose Christmas Eve plan to catch Santa Claus on camera turns into an unexpected journey that most kids could only dream about.', 'movie', NULL, NULL),

('Deck the Halls', 2006, 93, 2, 'live-action', 'PG', 5.0, 'https://example.com/deck_halls.jpg', 'Two neighbors have it out after one of them decorates his house for the holidays so brightly that it can be seen from space.', 'movie', NULL, NULL),

('Last Christmas', 2019, 103, 3, 'live-action', 'PG-13', 6.5, 'https://example.com/last_christmas.jpg', 'Kate harumphs around London, a bundle of bad decisions accompanied by the jangle of bells on her shoes, another irritating consequence from her job as an elf in a year-round Christmas shop.', 'movie', NULL, NULL);

/* VERIFY PROGRAMS INSERTED */
SELECT COUNT(*) AS total_programs FROM program;
SELECT COUNT(*) AS movies FROM program WHERE type = 'movie';
SELECT COUNT(*) AS tv_specials FROM program WHERE type = 'special';
SELECT title, yr_released, format, program_rating FROM program ORDER BY yr_released;