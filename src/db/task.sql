CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);


INSERT INTO users (first_name, last_name, username, email, password, role) VALUES
('Petar', 'Jovic', 'pjovic', 'p.jovic@example.com', '123', 'basic'),
('Milica', 'Jovanovic', 'mjova', 'm.jova@example.com', '123', 'admin'),
('Jovana', 'Petrovic', 'jpet', 'j.pet@example.com', '123', 'basic');


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tasks (body, user_id) VALUES
('First task for Petar', 4) ,
('Second task for Petar', 5),
('First task for Jovana', 6);
