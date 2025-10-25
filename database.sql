-- This is where the SQL statements go

CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "image" VARCHAR,
    "genre" VARCHAR NOT NULL
    
)