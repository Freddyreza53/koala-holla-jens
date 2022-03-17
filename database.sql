CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (10) NOT NULL,
	"age" INT NOT NULL,
	"ready_to_transfer" BOOLEAN,
	"notes" VARCHAR (250) NOT NULL
);

INSERT INTO "koalas" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
VALUES  
	('Scotty', 'Male', 4, true, 'Born in Guatemala'),
    ('Jean', 'Female', 5, true, 'Allergic to lots of lava'), 
    ('Ororo', 'Female', 7, false, 'Loves listening to Paula (Abdul)'), 
    ('Logan', 'Male', 15, false, 'Loves the sauna'), 
    ('Charlie', 'Male', 9, true, 'Favorite band is Nirvana'), 
    ('Betsy', 'Female', 4, true, 'Has a pet iguana'); 