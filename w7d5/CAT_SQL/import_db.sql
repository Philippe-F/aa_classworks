DROP TABLE cattoys;
DROP TABLE cats;
DROP TABLE toys;
CREATE TABLE cats(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  color VARCHAR(20),
  breed VARCHAR(20)
);

CREATE TABLE toys(
  id  SERIAL PRIMARY KEY,
  price INT,
  color VARCHAR(20),
  name VARCHAR(20)
);

CREATE TABLE cattoys(
  id  SERIAL PRIMARY KEY,
  cat_id INT REFERENCES cats(id), 
  toy_id INT REFERENCES toys(id) 
);