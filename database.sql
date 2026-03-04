-- Seed data for backlogger
-- Run this in pgAdmin4 or psql after creating the tables from `database.sql`.

-- Create base Tables
DROP TABLE IF EXISTS "games";

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "games" (
	"id" serial NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"image" varchar(255),
	"genre" varchar(255),
	"status" varchar(50),
	"notes" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "users_games" (
	"id" serial NOT NULL UNIQUE,
	"user_key" bigint NOT NULL,
	"game_key" bigint NOT NULL,
	PRIMARY KEY ("id")
);


-- Optional: clear existing data (uncomment if you want a clean slate)
 TRUNCATE TABLE "users_games" RESTART IDENTITY CASCADE;
 TRUNCATE TABLE "games" RESTART IDENTITY CASCADE;
 TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;

-- Insert users (6 rows)
INSERT INTO "users" ("username", "email") VALUES
  ('alice', 'alice@example.com'),
  ('bob', 'bob@example.com'),
  ('carol', 'carol@example.com'),
  ('dave', 'dave@example.com'),
  ('eve', 'eve@example.com'),
  ('frank', 'frank@example.com');

-- Insert games (10 rows)
INSERT INTO "games" ("title", "description", "image", "genre", "status", "notes") VALUES
  ('Starlight Odyssey', 'A space exploration RPG with ship-building mechanics.', 'starlight.jpg', 'RPG', 'in-progress', 'The game is currently in active development.'),
  ('Pixel Rally', 'Top-down arcade racing with pixel graphics and tight controls.', 'pixel_rally.png', 'Racing', 'backlogged', 'The game is currently in active development.'),
  ('Mystic Manor', 'A puzzle-adventure set in a haunted mansion.', 'mystic_manor.jpg', 'Adventure', 'backlogged', 'The game is currently in active development.'),
  ('Cyberstrike 2077', 'Fast-paced cyberpunk FPS with neon visuals.', 'cyberstrike.jpg', 'Shooter', 'in-progress', 'The game is currently in active development.'),
  ('Farmstead', 'Relaxing farming sim with seasons and crafting.', 'farmstead.png', 'Simulation', 'backlogged', 'The game is currently in active development.'),
  ('Dungeon Delvers', 'Co-op dungeon crawler with procedurally generated levels.', 'dungeon_delvers.jpg', 'Dungeon', 'in-progress', 'The game is currently in active development.'),
  ('Skybound Saga', 'Platformer with gliding mechanics and colorful worlds.', 'skybound.png', 'Platformer', 'in-progress', 'The game is currently in active development.'),
  ('Chef’s Quest', 'Time-management cooking game with thousands of recipes.', 'chefs_quest.jpg', 'Casual', 'in-progress', 'The game is currently in active development.'),
  ('NeoChess', 'A futuristic chess variant with special pieces and powers.', 'neochess.png', 'Strategy', 'complete', 'The game is currently in active development.'),
  ('Hidden Trails', 'A hidden object game with story-driven scenes.', 'hidden_trails.jpg', 'Puzzle', 'complete', 'The game is currently in active development');

-- Insert user-game relationships (12 rows)
-- These reference user IDs and game IDs as they will be assigned (1..6 for users, 1..10 for games)
INSERT INTO "users_games" ("user_key", "game_key") VALUES
  (1, 1), -- alice -> Starlight Odyssey
  (1, 3), -- alice -> Mystic Manor
  (2, 2), -- bob -> Pixel Rally
  (2, 6), -- bob -> Dungeon Delvers
  (3, 4), -- carol -> Cyberstrike 2077
  (3, 9), -- carol -> NeoChess
  (4, 5), -- dave -> Farmstead
  (4, 7), -- dave -> Skybound Saga
  (5, 8), -- eve -> Chef's Quest
  (5, 10), -- eve -> Hidden Trails
  (6, 1), -- frank -> Starlight Odyssey
  (6, 6); -- frank -> Dungeon Delvers

-- End of seed file

