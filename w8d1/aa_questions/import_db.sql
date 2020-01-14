
PRAGMA foreign_keys = ON; 

DROP TABLE question_likes;
DROP TABLE replies;
DROP TABLE question_follows;
DROP TABLE questions;
DROP TABLE users; 

CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL
);

CREATE TABLE questions(
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    body VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL,

    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE question_follows(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE replies(
    id INTEGER PRIMARY KEY,
    body VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    parent_id INTEGER,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (parent_id) REFERENCES replies(id)
);

CREATE TABLE question_likes(
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

INSERT INTO 
users(fname, lname) 
VALUES 
('Sushil', 'Thapa'), 
('Philippe', 'Fonzin');  


INSERT INTO
questions(title, body, author_id)
VALUES
('sql', 'define joins?', 
(SELECT id FROM users WHERE fname = 'Sushil' AND lname = 'Thapa') ),
('postgres', 'why is it so robust?', 
(SELECT id FROM users WHERE fname = 'Philippe' AND lname = 'Fonzin'));


INSERT INTO
question_follows(user_id, question_id)
VALUES
((SELECT id FROM users WHERE fname = 'Sushil' AND lname = 'Thapa'),
(SELECT DISTINCT id FROM questions WHERE author_id = 
(SELECT id FROM users where fname = 'Sushil' AND lname = 'Thapa')));


INSERT INTO 
replies(body, user_id, question_id, parent_id) 
VALUES
('joins are used to concat multiple tables', 
(SELECT id FROM users WHERE fname = 'Sushil' AND lname = 'Thapa'), 
(SELECT id FROM questions WHERE body = 'define joins?'), NULL),

('joins helps to visualize tables together',
(SELECT id FROM users WHERE fname = 'Philippe' AND lname = 'Fonzin'),
(SELECT id FROM questions WHERE body = 'define joins?'),
(SELECT id from replies WHERE body = 'joins are used to concat multiple tables')
);

INSERT INTO 
question_likes
(user_id, question_id)
VALUES
((SELECT id FROM users WHERE fname = 'Sushil' AND lname = 'Thapa'),
(SELECT id FROM questions WHERE author_id = 
(SELECT id FROM users WHERE fname = 'Sushil' AND lname= 'Thapa'))),

((SELECT id FROM users WHERE fname = 'Philippe' AND lname = 'Fonzin'),
(SELECT id FROM questions WHERE author_id = 
(SELECT id FROM users WHERE fname = 'Philippe' AND lname= 'Fonzin')));