# 🎄 Christmas Movies & TV Shows Database API

## Project Overview
A comprehensive database application built with Node.js, Express.js, and MySQL that manages Christmas movies and television shows. This project features a RESTful API, web interface with EJS templates, and a complete DAO pattern implementation for database operations. The application includes forms for adding actors and programs (bonus feature), making it a full-stack solution for managing holiday entertainment content.

## Final Project Requirements Met ✅

### Database Structure (Required)
- **5 Main Tables**: Program, Producer, Director, Actor, Streaming_platform ✅
- **4 Pivot Tables**: program_director, program_actor, program_streaming_platform, and relationships ✅
- **25+ Programs**: Database includes 28+ Christmas movies and TV shows ✅

### Program Table Fields (Required)
- Program_id ✅
- Title ✅
- Yr_released ✅
- Runtime ✅
- Producer_id ✅
- Format (live-action, stop-motion, animation, mixed-media) ✅
- Program_rating (G, PG-13, TV-13, etc) ✅
- Rating (IMDb/personal rating 1-10) ✅
- Img_url ✅
- Description ✅

### Technology Stack (Required)
- **Express** ✅
- **Axios** ✅
- **EJS** ✅ 
- **Helmet** ✅
- **CORS** ✅
- **MySQL2** ✅

### DAO Methods (Required)
All DAOs include the required methods in `daoCommon.js`:
- findAll ✅
- findById ✅ 
- countAll ✅
- Search ✅
- Sort ✅
- Create ✅
- Update ✅

### Individual DAO Unique Methods (Required - 2+ per DAO)
- **ProgramDao**: findByRating(), findByStreamingPlatform(), findByFormat(), findByType() ✅
- **ActorDao**: findByNationality(), findWithPrograms(), findByBirthYear() ✅
- **DirectorDao**: findByNationality(), findWithPrograms() ✅
- **ProducerDao**: findByNationality(), findWithPrograms() ✅
- **StreamingPlatformDao**: findByCostRange(), findWithPrograms(), findFreePlatforms() ✅

### Web Interface (Required)
- **EJS Templates**: Homepage, programs list, actors list, forms ✅
- **Data Display**: Appropriate data shown on each page ✅
- **404 Error Page**: Custom 404 handling ✅
- **Add Actor Form**: Functional form with validation ✅

### Bonus Features (Optional) ✅
- **Add Program Form**: Complete form with checkboxes for directors, actors, and platforms ✅
- **Input Validation**: Using validator.js for form validation ✅
- **Success Messages**: User feedback for form submissions ✅

## Technologies Used

### Core Framework & Dependencies
- **Node.js** - JavaScript runtime environment
- **Express.js (v5.1.0)** - Web application framework
- **MySQL2 (v3.15.3)** - MySQL database driver with Promise support
- **EJS (v3.1.10)** - Embedded JavaScript templating engine
- **Helmet (v8.1.0)** - Security middleware
- **CORS (v2.8.5)** - Cross-Origin Resource Sharing
- **Axios (v1.13.2)** - HTTP client for API requests

### Additional Features
- **Validator.js (v13.15.23)** - String validation and sanitization
- **Express-rate-limit (v8.2.1)** - Rate limiting middleware
- **Nodemon (v3.1.11)** - Development auto-restart utility

## Project Structure
```
CHRISTMAS-MOVIES---TELEVISION-SHOWS/
├── app.js                    # Main application server
├── app-mock.js              # Mock data version for testing
├── demo-app.js              # Demo application
├── final-app.js             # Production-ready version
├── fresh-app.js             # Clean implementation
├── simple-app.js            # Simplified version
├── package.json             # Dependencies and scripts
├── database.sql             # Complete database schema with sample data
├── postman-collection.json  # Postman test collection
├── env-example.txt          # Environment variables template
├── dao/
│   ├── daoCommon.js         # Base DAO class with required methods
│   ├── programDao.js        # Program-specific DAO methods
│   ├── actorDao.js          # Actor-specific DAO methods
│   ├── directorDao.js       # Director-specific DAO methods
│   ├── producerDao.js       # Producer-specific DAO methods
│   ├── streamingPlatformDao.js # Streaming platform DAO methods
│   ├── mockDao.js           # Mock data DAOs for testing
│   └── index.js             # DAO module exports
├── views/
│   ├── index.ejs            # Homepage with statistics and API docs
│   ├── programs.ejs         # Programs listing page
│   ├── actors.ejs           # Actors listing page
│   ├── add-actor.ejs        # Add actor form
│   ├── add-program.ejs      # Add program form (BONUS)
│   ├── error.ejs            # Error page template
│   └── 404.ejs              # 404 not found page
├── public/
│   └── styles.css           # Custom CSS styles
└── node_modules/            # Installed dependencies
```

## Database Schema

### Main Tables

#### Program Table (28+ entries required)
```sql
CREATE TABLE program (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    yr_released INT NOT NULL,
    runtime INT, -- in minutes
    producer_id INT,
    format ENUM('live-action', 'stop-motion', 'animation', 'mixed-media') NOT NULL,
    program_rating VARCHAR(10) NOT NULL, -- G, PG, PG-13, R, TV-Y, etc.
    rating DECIMAL(3,1), -- IMDb/personal rating out of 10
    img_url VARCHAR(500),
    description TEXT,
    type ENUM('movie', 'tv_show', 'special') DEFAULT 'movie',
    seasons INT DEFAULT NULL,
    episodes INT DEFAULT NULL,
    FOREIGN KEY (producer_id) REFERENCES producer(producer_id)
);
```

#### Supporting Tables
```sql
-- Producer, Director, Actor tables with:
-- id, name, birth_date, nationality, biography, created_at

-- Streaming Platform table with:
-- platform_id, name, website_url, subscription_cost, country, created_at
```

### Pivot Tables (Many-to-Many Relationships)
- **program_director**: Links programs with directors, includes role info
- **program_actor**: Links programs with actors, includes character_name and role_type
- **program_streaming_platform**: Links programs with platforms, includes availability dates

## API Endpoints

### Programs
- `GET /api/programs` - All programs with relationships
- `GET /api/programs/:id` - Specific program with full details
- `GET /api/programs/rating/:rating` - Programs by rating (G, PG, R, etc.)
- `GET /api/programs/platform/:platform` - Programs by streaming platform
- `GET /api/programs/format/:format` - Programs by format (animation, live-action)
- `GET /api/programs/years/:start/:end` - Programs by year range
- `GET /api/movies` - Movies only
- `GET /api/tvshows` - TV shows only

### People
- `GET /api/actors` - All actors
- `GET /api/actors/:id` - Specific actor
- `POST /api/actors` - Create new actor
- `GET /api/directors` - All directors
- `GET /api/producers` - All producers

### Platforms
- `GET /api/streaming-platforms` - All streaming platforms

### Search
- `GET /api/search?q=term&type=programs` - Search programs
- `GET /api/search?q=term&type=actors` - Search actors

## Web Interface Pages

### Public Pages
- `/` - Homepage with statistics and featured programs
- `/programs` - All programs listing with details
- `/actors` - All actors listing with biography
- `/add-actor` - Form to add new actors (with validation)
- `/add-program` - Form to add new programs (BONUS - with checkboxes)

### Error Handling
- `404.ejs` - Custom 404 page for missing resources
- `error.ejs` - General error page for system errors

## Form Features

### Add Actor Form ✅
- **Input Validation**: Name required, date validation, character limits
- **Error Messages**: Clear feedback for validation errors
- **Success Redirect**: Confirmation when actor added successfully
- **Form Data Persistence**: Keeps user input on validation errors

### Add Program Form (BONUS) ✅
- **Complex Form**: Title, year, runtime, format, rating fields
- **Dynamic Fields**: TV show fields appear when type is "tv_show"
- **Checkbox Selections**: 
  - Multiple directors can be selected
  - Multiple actors can be selected
  - Multiple streaming platforms can be selected
- **Database Transactions**: Uses transactions for complex inserts
- **Full Validation**: All required fields validated

## Sample Data Included (25+ Required)

### Programs (28+ entries)
Movies: Home Alone, Elf, The Polar Express, A Christmas Story, Love Actually, Its a Wonderful Life, White Christmas, Jingle All the Way, Christmas Vacation, The Santa Clause, Grinch, The Holiday, Miracle on 34th Street, Nightmare Before Christmas, Die Hard, Scrooged, Bad Santa, Klaus, Arthur Christmas, Muppet Christmas Carol, Christmas Chronicles, Deck the Halls, Last Christmas, and more.

TV Shows/Specials: A Charlie Brown Christmas, Rudolph the Red-Nosed Reindeer, Frosty the Snowman.

### People Data
- **13+ Producers**: John Hughes, Todd Lieberman, Steve Starkey, and more
- **13+ Directors**: Chris Columbus, Jon Favreau, Robert Zemeckis, Bob Clark, Richard Curtis, and more  
- **30+ Actors**: Macaulay Culkin, Will Ferrell, Tom Hanks, Hugh Grant, Emma Thompson, and more

### Streaming Platforms
Netflix, Disney+, HBO Max, Apple TV+, Peacock, Freeform, Amazon Prime Video, Hulu, Paramount+, Hallmark Channel

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MySQL Server (v5.7+ or v8.0+)
- Git

### Installation
1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd CHRISTMAS-MOVIES---TELEVISION-SHOWS
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```sql
   -- Create database
   CREATE DATABASE christmas_movies;
   
   -- Import schema and data
   mysql -u root -p christmas_movies < database.sql
   ```

4. **Environment Configuration**
   ```bash
   # Copy example file
   cp env-example.txt .env
   
   # Edit .env with your database credentials
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=christmas_movies
   PORT=3000
   ```

5. **Start Application**
   ```bash
   # Development mode (auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access Application**
   - Web Interface: http://localhost:3000
   - API Base: http://localhost:3000/api

## Testing with Postman

Import `postman-collection.json` into Postman for comprehensive API testing. The collection includes:
- All CRUD operations
- Search functionality
- Error handling tests
- Parameter validation tests

### Sample API Responses

#### GET /api/programs/1
```json
{
  "program_id": 1,
  "title": "Home Alone",
  "yr_released": 1990,
  "runtime": 103,
  "format": "live-action",
  "program_rating": "PG",
  "rating": 7.7,
  "description": "An eight-year-old troublemaker must protect his house...",
  "producer_name": "John Hughes",
  "directors": "Chris Columbus (Director)",
  "actors": "Macaulay Culkin as Kevin McCallister, Joe Pesci as Harry Lime",
  "streaming_platforms": "Disney+"
}
```

## Development Features

### Code Quality
- **DAO Pattern**: Clean separation of data access logic
- **Error Handling**: Comprehensive error catching and logging
- **Input Validation**: Server-side validation using validator.js
- **Security**: Helmet.js for security headers, CORS configuration
- **Modularity**: Clear file organization and module exports

### Development Tools
- **Nodemon**: Auto-restart during development
- **Multiple App Versions**: Different versions for testing and development
- **Mock Data Support**: Mock DAOs for testing without database
- **Environment Configs**: Flexible configuration management

## Project Highlights

### Technical Requirements Met
- ✅ Complete database schema with 25+ programs
- ✅ All required DAO methods implemented
- ✅ 2+ unique methods per DAO
- ✅ EJS templating with data display
- ✅ 404 error page handling
- ✅ Actor add form with validation
- ✅ All required npm packages installed

### Bonus Features Completed
- ✅ Program add form with complex checkbox selections
- ✅ Input validation and error handling
- ✅ Success messaging system
- ✅ Postman collection for API testing
- ✅ Multiple application versions
- ✅ Comprehensive documentation

### Professional Features
- Database transactions for complex operations
- Responsive design with Christmas theming
- Rate limiting and security middleware
- Environment-based configuration
- Git version control with proper ignore rules

---

**Developer:** Susan Windham  
**Course:** Final Project - Database & API Development  
**Framework:** Node.js/Express.js with MySQL  
**Status:** Complete ✅ - All requirements met + bonus features  
**Grade Target:** A - Exceeds expectations with bonus implementation