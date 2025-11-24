/* ========================================
   STEP 4: CREATE RELATIONSHIPS (PIVOT TABLE DATA)
   Run this AFTER all tables and data are inserted
   ======================================== */

/* LINK PROGRAMS WITH DIRECTORS */
INSERT INTO program_director (program_id, director_id, role) VALUES
(1, 1, 'Director'),   -- Home Alone - Chris Columbus
(2, 2, 'Director'),   -- Elf - Jon Favreau  
(3, 3, 'Director'),   -- The Polar Express - Robert Zemeckis
(4, 4, 'Director'),   -- A Christmas Story - Bob Clark
(5, 5, 'Director'),   -- Love Actually - Richard Curtis
(6, 11, 'Director'),  -- Its a Wonderful Life - Frank Capra
(7, 12, 'Director'),  -- White Christmas - Michael Curtiz
(8, 8, 'Director'),   -- Jingle All the Way - Ron Howard
(9, 10, 'Director'),  -- Christmas Vacation - Garry Marshall
(10, 6, 'Director'),  -- The Santa Clause - John Lasseter
(11, 6, 'Director'),  -- A Charlie Brown Christmas - John Lasseter
(12, 6, 'Director'),  -- Rudolph - John Lasseter
(13, 8, 'Director'),  -- Grinch - Ron Howard
(14, 9, 'Director'),  -- The Holiday - Nancy Meyers
(15, 5, 'Director'),  -- Four Weddings - Richard Curtis
(16, 13, 'Director'), -- Miracle on 34th Street - George Seaton
(17, 7, 'Director'),  -- Nightmare Before Christmas - Tim Burton
(18, 6, 'Director'),  -- Die Hard - John Lasseter
(19, 4, 'Director'),  -- Scrooged - Bob Clark
(20, 7, 'Director'),  -- Bad Santa - Tim Burton
(21, 6, 'Director'),  -- Klaus - John Lasseter
(22, 6, 'Director'),  -- Arthur Christmas - John Lasseter
(23, 7, 'Director'),  -- Muppet Christmas Carol - Tim Burton
(24, 3, 'Director'),  -- A Christmas Carol 2009 - Robert Zemeckis
(25, 6, 'Director'),  -- Frosty - John Lasseter
(26, 1, 'Director'),  -- Christmas Chronicles - Chris Columbus
(27, 8, 'Director'),  -- Deck the Halls - Ron Howard
(28, 9, 'Director');  -- Last Christmas - Nancy Meyers

/* LINK PROGRAMS WITH ACTORS (MAIN CAST) */
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
(13, 29, 'The Grinch', 'lead'),

-- Holiday
(14, 30, 'Kate Winslet Character', 'lead'),
(14, 21, 'Anne Hathaway Character', 'supporting'),

-- Die Hard
(18, 26, 'John McClane', 'lead'),

-- Bad Santa
(20, 22, 'Willie T. Stokes', 'lead'),

-- Last Christmas
(28, 21, 'Kate', 'lead');

/* LINK PROGRAMS WITH STREAMING PLATFORMS */
INSERT INTO program_streaming_platform (program_id, platform_id, available_from, is_currently_available) VALUES
(1, 2, '2019-11-12', TRUE),  -- Home Alone on Disney+
(2, 3, '2020-05-27', TRUE),  -- Elf on HBO Max  
(3, 3, '2020-05-27', TRUE),  -- Polar Express on HBO Max
(4, 3, '2020-05-27', TRUE),  -- Christmas Story on HBO Max
(5, 1, '2021-01-01', TRUE),  -- Love Actually on Netflix
(6, 4, '2019-11-01', TRUE),  -- Its a Wonderful Life on Apple TV+
(7, 5, '2020-12-01', TRUE),  -- White Christmas on Peacock
(8, 1, '2020-12-01', TRUE),  -- Jingle All the Way on Netflix
(9, 3, '2020-11-01', TRUE),  -- Christmas Vacation on HBO Max
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

/* VERIFY RELATIONSHIPS */
SELECT 
    'Program-Director Links' AS relationship_type,
    COUNT(*) AS count
FROM program_director

UNION ALL

SELECT 
    'Program-Actor Links' AS relationship_type,
    COUNT(*) AS count
FROM program_actor

UNION ALL

SELECT 
    'Program-Platform Links' AS relationship_type,
    COUNT(*) AS count
FROM program_streaming_platform;

/* TEST COMPLEX QUERY */
SELECT 
    p.title,
    p.yr_released,
    GROUP_CONCAT(DISTINCT d.name SEPARATOR ', ') AS directors,
    GROUP_CONCAT(DISTINCT CONCAT(a.name, ' as ', pa.character_name) SEPARATOR ', ') AS cast,
    GROUP_CONCAT(DISTINCT sp.name SEPARATOR ', ') AS platforms
FROM program p
LEFT JOIN program_director pd ON p.program_id = pd.program_id
LEFT JOIN director d ON pd.director_id = d.director_id
LEFT JOIN program_actor pa ON p.program_id = pa.program_id
LEFT JOIN actor a ON pa.actor_id = a.actor_id
LEFT JOIN program_streaming_platform psp ON p.program_id = psp.program_id
LEFT JOIN streaming_platform sp ON psp.platform_id = sp.platform_id
GROUP BY p.program_id
ORDER BY p.yr_released
LIMIT 5;