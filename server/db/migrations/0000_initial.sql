CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role varchar(40) NOT NULL DEFAULT 'admin',
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  category varchar(120) NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  results text NOT NULL,
  architecture text NOT NULL,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  image_url text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  category varchar(120) NOT NULL,
  read_time varchar(40) NOT NULL,
  cover_image_url text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamp,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id serial PRIMARY KEY,
  category varchar(120) NOT NULL,
  name varchar(120) NOT NULL,
  level integer NOT NULL DEFAULT 70,
  highlighted boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS experiences (
  id serial PRIMARY KEY,
  company varchar(180) NOT NULL,
  role varchar(180) NOT NULL,
  location varchar(180),
  start_date varchar(40) NOT NULL,
  end_date varchar(40),
  description text NOT NULL,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id serial PRIMARY KEY,
  name varchar(160) NOT NULL,
  email varchar(255) NOT NULL,
  company varchar(180),
  subject varchar(220) NOT NULL,
  message text NOT NULL,
  status varchar(40) NOT NULL DEFAULT 'new',
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id serial PRIMARY KEY,
  key varchar(120) NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id serial PRIMARY KEY,
  event_name varchar(120) NOT NULL,
  route varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
