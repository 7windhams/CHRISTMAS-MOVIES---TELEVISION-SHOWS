# 🗄️ Database Setup Guide for Christmas Movies Project

## Method 1: Automated Setup (Recommended)

### Prerequisites
1. **MySQL Server** must be installed and running
2. **Database credentials** configured

### Steps:
1. **Configure your database credentials** in `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=christmas_movies
   ```

2. **Run the setup script**:
   ```bash
   node setup-database.js
   ```

3. **Start your application**:
   ```bash
   npm start
   ```

## Method 2: Manual Setup

### Option A: Using MySQL Workbench (GUI)
1. Open **MySQL Workbench**
2. Connect to your MySQL server
3. Open the `database.sql` file (File > Open SQL Script)
4. Click **Execute** (lightning bolt icon)
5. Verify tables were created in the Navigator panel

### Option B: Using MySQL Command Line
1. Open **Command Prompt** or **Terminal**
2. Navigate to your project directory
3. Run these commands:
   ```bash
   mysql -u root -p
   # Enter your MySQL password when prompted
   
   # Then run these SQL commands:
   CREATE DATABASE christmas_movies;
   USE christmas_movies;
   source database.sql;
   ```

### Option C: Copy/Paste SQL Commands
1. Open **MySQL Workbench** or command line
2. Copy and paste the contents of `quick-setup.sql`
3. Execute the commands
4. Then copy and paste the INSERT statements from `database.sql`

## Method 3: Using phpMyAdmin (if available)
1. Open **phpMyAdmin** in your browser
2. Click **New** to create a new database
3. Name it `christmas_movies`
4. Click **Import** tab
5. Choose your `database.sql` file
6. Click **Go**

## Verification Steps

After running any setup method, verify your database:

### Check Tables Created:
```sql
USE christmas_movies;
SHOW TABLES;
```
*Should show 8 tables: program, producer, director, actor, streaming_platform, program_director, program_actor, program_streaming_platform*

### Check Data Populated:
```sql
SELECT COUNT(*) FROM program;    -- Should return 28
SELECT COUNT(*) FROM actor;      -- Should return 30
SELECT COUNT(*) FROM director;   -- Should return 13
SELECT COUNT(*) FROM producer;   -- Should return 13
```

### Test a Complex Query:
```sql
SELECT 
    p.title, 
    p.yr_released, 
    prod.name as producer,
    GROUP_CONCAT(d.name) as directors
FROM program p
LEFT JOIN producer prod ON p.producer_id = prod.producer_id
LEFT JOIN program_director pd ON p.program_id = pd.program_id
LEFT JOIN director d ON pd.director_id = d.director_id
GROUP BY p.program_id
LIMIT 5;
```

## Troubleshooting

### Common Issues:

#### "Access denied for user 'root'"
- Check your MySQL password in the `.env` file
- Make sure MySQL server is running
- Try connecting with MySQL Workbench first

#### "Table already exists"
- This is normal - the script uses `IF NOT EXISTS`
- Your database is already set up

#### "Unknown database 'christmas_movies'"
- Make sure the database creation command ran successfully
- Try creating the database manually: `CREATE DATABASE christmas_movies;`

#### "Foreign key constraint fails"
- Make sure parent tables (producer, director, actor) are created before program table
- The `database.sql` file has the correct order

### Getting Help:
1. **Check MySQL service**: Is MySQL running?
   - Windows: Services panel, look for "MySQL"
   - Mac: System Preferences > MySQL
   
2. **Test connection**: Can you connect with MySQL Workbench?

3. **Check credentials**: Are username/password correct?

4. **Permissions**: Does your user have CREATE database permissions?

## Next Steps After Database Setup

1. **Configure Environment**:
   Update `.env` with your database credentials

2. **Test Application**:
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

3. **Test API Endpoints**:
   - Import `postman-collection.json` into Postman
   - Test endpoints like `GET /api/programs`

4. **Test Web Forms**:
   - Try adding an actor: http://localhost:3000/add-actor
   - Try adding a program: http://localhost:3000/add-program

## Sample Data Included

Your database will be populated with:
- **28 Christmas Programs**: Movies, TV shows, and specials
- **30+ Actors**: From Macaulay Culkin to Will Ferrell
- **13 Directors**: Including Chris Columbus and Jon Favreau  
- **13 Producers**: Industry professionals
- **10 Streaming Platforms**: Netflix, Disney+, HBO Max, etc.
- **65+ Relationships**: Actors in programs, directors of programs, etc.

🎄 **Your Christmas Movies database is now ready for use!** 🎄