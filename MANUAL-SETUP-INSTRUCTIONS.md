# 🎄 Manual Database Setup Instructions

## Step-by-Step Database Creation

I've broken down the database setup into 4 easy steps. Copy and paste each SQL file into MySQL Workbench or your MySQL client **in order**:

### **Step 1: Create Tables** 📋
**File:** `STEP-1-CREATE-TABLES.sql`
- Creates the database `christmas_movies`
- Creates all 8 required tables
- Sets up foreign key relationships
- **Result:** 8 empty tables ready for data

### **Step 2: Insert People & Platforms** 👥
**File:** `STEP-2-INSERT-PEOPLE-PLATFORMS.sql`
- Inserts 10 streaming platforms
- Inserts 13 producers
- Inserts 13 directors  
- Inserts 30 actors
- **Result:** All supporting data populated

### **Step 3: Insert Programs** 🎬
**File:** `STEP-3-INSERT-PROGRAMS.sql`
- Inserts 28 Christmas programs (movies, TV shows, specials)
- Meets the 25+ requirement for your project
- **Result:** Complete program database

### **Step 4: Create Relationships** 🔗
**File:** `STEP-4-CREATE-RELATIONSHIPS.sql`
- Links programs with directors
- Links programs with actors (with character names)
- Links programs with streaming platforms
- **Result:** Fully connected database with all relationships

---

## How to Execute Each Step

### **Option A: MySQL Workbench (Recommended)**
1. Open **MySQL Workbench**
2. Connect to your MySQL server
3. For each step:
   - Open the SQL file (File → Open SQL Script)
   - Select all text (Ctrl+A)
   - Click Execute (⚡ lightning bolt icon)
   - Check for any error messages
   - Proceed to next step

### **Option B: MySQL Command Line**
```bash
mysql -u root -p
# Enter your password when prompted

# Then run each file:
source STEP-1-CREATE-TABLES.sql;
source STEP-2-INSERT-PEOPLE-PLATFORMS.sql;
source STEP-3-INSERT-PROGRAMS.sql;
source STEP-4-CREATE-RELATIONSHIPS.sql;
```

### **Option C: Copy and Paste**
1. Open your MySQL client
2. Copy the contents of each file
3. Paste into the query window
4. Execute
5. Repeat for all 4 files

---

## Verification Commands

After completing all steps, run these to verify your database:

```sql
-- Check all tables exist
SHOW TABLES;

-- Check data counts
SELECT 'Programs' as table_name, COUNT(*) as count FROM program
UNION ALL
SELECT 'Actors', COUNT(*) FROM actor
UNION ALL  
SELECT 'Directors', COUNT(*) FROM director
UNION ALL
SELECT 'Producers', COUNT(*) FROM producer
UNION ALL
SELECT 'Platforms', COUNT(*) FROM streaming_platform;

-- Test complex query
SELECT 
    p.title,
    p.yr_released,
    GROUP_CONCAT(DISTINCT d.name) AS directors,
    GROUP_CONCAT(DISTINCT a.name) AS actors
FROM program p
LEFT JOIN program_director pd ON p.program_id = pd.program_id
LEFT JOIN director d ON pd.director_id = d.director_id
LEFT JOIN program_actor pa ON p.program_id = pa.program_id
LEFT JOIN actor a ON pa.actor_id = a.actor_id
GROUP BY p.program_id
LIMIT 5;
```

**Expected Results:**
- **8 tables** should exist
- **28 programs** in database
- **30 actors**, **13 directors**, **13 producers**
- **10 streaming platforms**
- **Complex queries** should return data with relationships

---

## Troubleshooting

### **"Table already exists" errors**
- This is normal if you're re-running scripts
- All scripts use `IF NOT EXISTS` clauses
- You can continue safely

### **"Foreign key constraint fails"**
- Make sure you run the steps **in order**
- Tables must exist before relationships can be created

### **"Unknown database" errors**
- Make sure Step 1 completed successfully
- Try running: `USE christmas_movies;`

### **"Access denied" errors**
- Check your MySQL username/password
- Make sure MySQL server is running
- Try connecting with MySQL Workbench first

---

## After Database Setup

1. **Update your `.env` file:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=christmas_movies
   ```

2. **Test your application:**
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

3. **Verify API endpoints:**
   - Import `postman-collection.json` into Postman
   - Test endpoints like `GET /api/programs`

4. **Try the web forms:**
   - Add Actor: http://localhost:3000/add-actor
   - Add Program: http://localhost:3000/add-program

---

## ✅ Success Checklist

- [ ] Step 1: Tables created (8 tables)
- [ ] Step 2: People & platforms inserted
- [ ] Step 3: Programs inserted (28 programs)
- [ ] Step 4: Relationships created
- [ ] Verification queries return expected data
- [ ] `.env` file configured with database credentials
- [ ] Application starts without errors
- [ ] Web interface loads at http://localhost:3000
- [ ] API endpoints work in Postman

🎉 **Your Christmas Movies database is ready!**