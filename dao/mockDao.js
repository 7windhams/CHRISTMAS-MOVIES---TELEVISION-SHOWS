// mockDao.js - Mock data for testing without database
// I'm using this instead of MySQL for now since I don't have it set up yet

const mockPrograms = [
  {
    program_id: 1,
    title: "A Christmas Story",
    yr_released: 1983,
    format: "Movie",
    program_rating: "PG",
    rating: "8.0",
    description: "A young boy's Christmas wish list includes a Red Ryder BB gun.",
    producer_name: "René Dupont",
    directors: "Bob Clark",
    actors: "Peter Billingsley, Melinda Dillon",
    streaming_platforms: "HBO Max, Netflix"
  },
  {
    program_id: 2,
    title: "Home Alone",
    yr_released: 1990,
    format: "Movie", 
    program_rating: "PG",
    rating: "7.7",
    description: "An eight-year-old boy defends his home from burglars after being accidentally left behind.",
    producer_name: "John Hughes",
    directors: "Chris Columbus",
    actors: "Macaulay Culkin, Joe Pesci",
    streaming_platforms: "Disney+, Amazon Prime"
  },
  {
    program_id: 3,
    title: "Elf",
    yr_released: 2003,
    format: "Movie",
    program_rating: "PG", 
    rating: "7.1",
    description: "A man raised as an elf at the North Pole travels to New York to find his father.",
    producer_name: "Todd Komarnicki",
    directors: "Jon Favreau",
    actors: "Will Ferrell, James Caan",
    streaming_platforms: "HBO Max, Hulu"
  },
  // Added more movies for my project
  {
    program_id: 4,
    title: "It's a Wonderful Life",
    yr_released: 1946,
    format: "Movie",
    program_rating: "PG",
    rating: "8.6",
    description: "An angel shows a suicidal man what life would be like if he had never existed.",
    producer_name: "Frank Capra",
    directors: "Frank Capra",
    actors: "James Stewart, Donna Reed",
    streaming_platforms: "Amazon Prime, Paramount+"
  },
  {
    program_id: 5,
    title: "The Polar Express",
    yr_released: 2004,
    format: "Movie",
    program_rating: "G",
    rating: "6.6",
    description: "A young boy takes a magical train ride to the North Pole on Christmas Eve.",
    producer_name: "Steve Starkey",
    directors: "Robert Zemeckis",
    actors: "Tom Hanks, Daryl Sabara",
    streaming_platforms: "HBO Max, Amazon Prime"
  },
  {
    program_id: 6,
    title: "The Office Christmas Episodes",
    yr_released: 2005,
    format: "TV Show",
    program_rating: "TV-14",
    rating: "9.0",
    description: "Classic Christmas episodes from the beloved workplace comedy.",
    producer_name: "Greg Daniels",
    directors: "Various",
    actors: "Steve Carell, John Krasinski, Jenna Fischer",
    streaming_platforms: "Peacock, Netflix"
  }
];

const mockActors = [
  {
    actor_id: 1,
    first_name: "Will",
    last_name: "Ferrell", 
    birth_date: "1967-07-16",
    nationality: "American"
  },
  {
    actor_id: 2,
    first_name: "Macaulay",
    last_name: "Culkin",
    birth_date: "1980-08-26", 
    nationality: "American"
  },
  {
    actor_id: 3,
    first_name: "James",
    last_name: "Stewart",
    birth_date: "1908-05-20",
    nationality: "American"
  }
];

class MockProgramDao {
  async findAll() {
    return mockPrograms;
  }

  async findById(id) {
    return mockPrograms.find(p => p.program_id === parseInt(id));
  }

  async countAll() {
    return mockPrograms.length;
  }

  async search(column, searchTerm) {
    return mockPrograms.filter(p => {
      if (column === 'title' && p.title) {
        return p.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (column === 'genre' && p.genre) {
        return p.genre.toLowerCase().includes(searchTerm.toLowerCase());
      }
      // Fallback: search in title if it exists
      return p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  async sort(column, direction = 'ASC') {
    const sorted = [...mockPrograms].sort((a, b) => {
      if (direction === 'DESC') {
        return b[column] > a[column] ? 1 : -1;
      }
      return a[column] > b[column] ? 1 : -1;
    });
    return sorted;
  }

  async create(data) {
    const newId = Math.max(...mockPrograms.map(p => p.program_id)) + 1;
    const newProgram = { program_id: newId, ...data };
    mockPrograms.push(newProgram);
    return { insertId: newId, affectedRows: 1 };
  }

  async update(id, data) {
    const index = mockPrograms.findIndex(p => p.program_id === parseInt(id));
    if (index !== -1) {
      mockPrograms[index] = { ...mockPrograms[index], ...data };
      return { affectedRows: 1, changedRows: 1 };
    }
    return { affectedRows: 0, changedRows: 0 };
  }
}

class MockActorDao {
  async findAll() {
    return mockActors;
  }

  async findById(id) {
    return mockActors.find(a => a.actor_id === parseInt(id));
  }

  async countAll() {
    return mockActors.length;
  }

  async search(column, searchTerm) {
    return mockActors.filter(a => 
      a.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async sort(column, direction = 'ASC') {
    const sorted = [...mockActors].sort((a, b) => {
      if (direction === 'DESC') {
        return b[column] > a[column] ? 1 : -1;
      }
      return a[column] > b[column] ? 1 : -1;
    });
    return sorted;
  }

  async create(data) {
    const newId = Math.max(...mockActors.map(a => a.actor_id)) + 1;
    const newActor = { actor_id: newId, ...data };
    mockActors.push(newActor);
    return { insertId: newId, affectedRows: 1 };
  }

  async update(id, data) {
    const index = mockActors.findIndex(a => a.actor_id === parseInt(id));
    if (index !== -1) {
      mockActors[index] = { ...mockActors[index], ...data };
      return { affectedRows: 1, changedRows: 1 };
    }
    return { affectedRows: 0, changedRows: 0 };
  }
}

// Mock Director DAO
class MockDirectorDao {
  async findAll() {
    return [
      { director_id: 1, name: "Bob Clark", birth_year: 1941 },
      { director_id: 2, name: "Chris Columbus", birth_year: 1958 },
      { director_id: 3, name: "Jon Favreau", birth_year: 1966 }
    ];
  }

  async findById(id) {
    const directors = await this.findAll();
    return directors.find(d => d.director_id === parseInt(id));
  }

  async countAll() {
    const directors = await this.findAll();
    return directors.length;
  }

  async search(column, searchTerm) {
    const directors = await this.findAll();
    return directors.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async sort(column, direction = 'ASC') {
    const directors = await this.findAll();
    return directors.sort((a, b) => {
      if (direction === 'DESC') {
        return b[column] > a[column] ? 1 : -1;
      }
      return a[column] > b[column] ? 1 : -1;
    });
  }

  async create(data) {
    return { insertId: 999, affectedRows: 1 };
  }

  async update(id, data) {
    return { affectedRows: 1, changedRows: 1 };
  }
}

// Mock Producer DAO
class MockProducerDao {
  async findAll() {
    return [
      { producer_id: 1, name: "René Dupont", birth_year: 1950 },
      { producer_id: 2, name: "John Hughes", birth_year: 1950 },
      { producer_id: 3, name: "Todd Komarnicki", birth_year: 1964 }
    ];
  }

  async findById(id) {
    const producers = await this.findAll();
    return producers.find(p => p.producer_id === parseInt(id));
  }

  async countAll() {
    const producers = await this.findAll();
    return producers.length;
  }

  async search(column, searchTerm) {
    const producers = await this.findAll();
    return producers.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async sort(column, direction = 'ASC') {
    const producers = await this.findAll();
    return producers.sort((a, b) => {
      if (direction === 'DESC') {
        return b[column] > a[column] ? 1 : -1;
      }
      return a[column] > b[column] ? 1 : -1;
    });
  }

  async create(data) {
    return { insertId: 999, affectedRows: 1 };
  }

  async update(id, data) {
    return { affectedRows: 1, changedRows: 1 };
  }
}

// Mock Streaming Platform DAO
class MockStreamingPlatformDao {
  async findAll() {
    return [
      { platform_id: 1, name: "Netflix", launch_year: 2007 },
      { platform_id: 2, name: "HBO Max", launch_year: 2020 },
      { platform_id: 3, name: "Disney+", launch_year: 2019 },
      { platform_id: 4, name: "Amazon Prime", launch_year: 2006 },
      { platform_id: 5, name: "Hulu", launch_year: 2007 }
    ];
  }

  async findById(id) {
    const platforms = await this.findAll();
    return platforms.find(p => p.platform_id === parseInt(id));
  }

  async countAll() {
    const platforms = await this.findAll();
    return platforms.length;
  }

  async search(column, searchTerm) {
    const platforms = await this.findAll();
    return platforms.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async sort(column, direction = 'ASC') {
    const platforms = await this.findAll();
    return platforms.sort((a, b) => {
      if (direction === 'DESC') {
        return b[column] > a[column] ? 1 : -1;
      }
      return a[column] > b[column] ? 1 : -1;
    });
  }

  async create(data) {
    return { insertId: 999, affectedRows: 1 };
  }

  async update(id, data) {
    return { affectedRows: 1, changedRows: 1 };
  }
}

module.exports = {
  MockProgramDao,
  MockActorDao,
  MockDirectorDao,
  MockProducerDao,
  MockStreamingPlatformDao,
  mockPrograms,
  mockActors
};