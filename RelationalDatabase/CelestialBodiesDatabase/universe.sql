--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
ALTER DATABASE universe OWNER TO freecodecamp;
\ connect universe
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;
--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
  name character varying(30) NOT NULL,
  solarmass_bn integer NOT NULL,
  age_bn numeric(5, 2) NOT NULL,
  dist_ly numeric(10, 2) NOT NULL,
  galaxy_id integer NOT NULL
);
ALTER TABLE public.galaxy OWNER TO freecodecamp;
--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;
--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;
--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
  name character varying(30),
  mass text NOT NULL,
  age_bn integer NOT NULL,
  has_life boolean NOT NULL,
  moon_id integer NOT NULL,
  planet_id integer NOT NULL,
  gravity numeric(10, 2)
);
ALTER TABLE public.moon OWNER TO freecodecamp;
--
-- Name: moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.moon_id_seq OWNER TO freecodecamp;
--
-- Name: moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_id_seq OWNED BY public.moon.moon_id;
--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
  name character varying(30) NOT NULL,
  earthmass numeric(10, 3) NOT NULL,
  age_bn numeric(10, 3) NOT NULL,
  has_life boolean NOT NULL,
  planet_id integer NOT NULL,
  star_id integer NOT NULL,
  test integer
);
ALTER TABLE public.planet OWNER TO freecodecamp;
--
-- Name: planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.planet_id_seq OWNER TO freecodecamp;
--
-- Name: planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_id_seq OWNED BY public.planet.planet_id;
--
-- Name: satellite; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.satellite (
  name character varying(30) NOT NULL,
  satellite_id integer NOT NULL,
  launch_date date NOT NULL,
  orbital_height_km numeric(10, 2),
  orbital_velocity_kph numeric(10, 2),
  planet_id integer NOT NULL
);
ALTER TABLE public.satellite OWNER TO freecodecamp;
--
-- Name: satellite_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.satellite_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.satellite_id_seq OWNER TO freecodecamp;
--
-- Name: satellite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.satellite_id_seq OWNED BY public.satellite.satellite_id;
--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
  name character varying(30),
  solarmass_bn integer NOT NULL,
  age_bn numeric(6, 3) NOT NULL,
  main_sequence text NOT NULL,
  dist_ly numeric(10, 2) NOT NULL,
  star_id integer NOT NULL,
  galaxy_id integer NOT NULL
);
ALTER TABLE public.star OWNER TO freecodecamp;
--
-- Name: star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.star_id_seq OWNER TO freecodecamp;
--
-- Name: star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_id_seq OWNED BY public.star.star_id;
--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
ALTER COLUMN galaxy_id
SET DEFAULT nextval('public.galaxy_id_seq'::regclass);
--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
ALTER COLUMN moon_id
SET DEFAULT nextval('public.moon_id_seq'::regclass);
--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
ALTER COLUMN planet_id
SET DEFAULT nextval('public.planet_id_seq'::regclass);
--
-- Name: satellite satellite_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.satellite
ALTER COLUMN satellite_id
SET DEFAULT nextval('public.satellite_id_seq'::regclass);
--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
ALTER COLUMN star_id
SET DEFAULT nextval('public.star_id_seq'::regclass);
--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy
VALUES ('Milkyway', 890, 13.60, 27000.00, 1);
INSERT INTO public.galaxy
VALUES ('Andromeda', 10, 10.00, 2500000.00, 2);
INSERT INTO public.galaxy
VALUES ('Triangulum', 50, 11.00, 3000000.00, 3);
INSERT INTO public.galaxy
VALUES ('Messier 81', 70, 12.50, 11800000.00, 4);
INSERT INTO public.galaxy
VALUES ('Messier 87', 6500, 13.20, 53500000.00, 5);
INSERT INTO public.galaxy
VALUES ('Whirlpool', 160, 0.40, 23000000.00, 6);
--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon
VALUES ('Moon', '3.00', 5, false, 1, 1, NULL);
INSERT INTO public.moon
VALUES ('Phobos', '1.00', 5, false, 2, 5, 0.01);
INSERT INTO public.moon
VALUES ('Deimos', '1.00', 5, false, 3, 5, 0.00);
INSERT INTO public.moon
VALUES ('Io', '1.00', 5, false, 4, 6, 1.80);
INSERT INTO public.moon
VALUES ('Europa', '1.00', 5, false, 5, 6, 1.31);
INSERT INTO public.moon
VALUES ('Ganymede', '1.00', 5, false, 6, 6, 1.43);
INSERT INTO public.moon
VALUES ('Callisto', '1.00', 5, false, 7, 6, 1.24);
INSERT INTO public.moon
VALUES ('Titan', '1.00', 5, false, 8, 7, 1.35);
INSERT INTO public.moon
VALUES ('Enceladus', '1.00', 5, false, 9, 7, 0.11);
INSERT INTO public.moon
VALUES ('Triton', '1.00', 5, false, 10, 9, 2.14);
INSERT INTO public.moon
VALUES ('Mimas', '3.75x10^19kg', 5, false, 11, 7, 0.06);
INSERT INTO public.moon
VALUES ('Rhea', '2.31x10^21kg', 5, false, 12, 7, 0.26);
INSERT INTO public.moon
VALUES ('Iapetus', '1.81x10^21kg', 5, false, 13, 7, 0.22);
INSERT INTO public.moon
VALUES ('Miranda', '6.42x10^19', 5, false, 14, 8, 0.08);
INSERT INTO public.moon
VALUES ('Ariel', '1.35x10^21', 5, false, 15, 8, 0.27);
INSERT INTO public.moon
VALUES ('Umbriel', '1.27x10^21kg', 5, false, 16, 8, 0.24);
INSERT INTO public.moon
VALUES ('Titania', '3.42x10^21kg', 5, false, 17, 8, 0.38);
INSERT INTO public.moon
VALUES ('Oberon', '2.88x10^21kg', 5, false, 18, 8, 0.35);
INSERT INTO public.moon
VALUES ('Tethys', '6.18x10^20kg', 5, false, 19, 7, 0.15);
INSERT INTO public.moon
VALUES ('Dione', '1.1x10^21kg', 5, false, 20, 7, 0.23);
--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet
VALUES ('Earth', 1.000, 5.000, true, 1, 1, NULL);
INSERT INTO public.planet
VALUES (
    'Proxima Centauri B',
    1.170,
    4.000,
    false,
    2,
    6,
    NULL
  );
INSERT INTO public.planet
VALUES ('Mercury', 0.055, 4.600, false, 3, 1, NULL);
INSERT INTO public.planet
VALUES ('Venus', 0.815, 4.600, false, 4, 1, NULL);
INSERT INTO public.planet
VALUES ('Mars', 0.107, 4.600, false, 5, 1, NULL);
INSERT INTO public.planet
VALUES ('Jupiter', 317.800, 4.600, false, 6, 1, NULL);
INSERT INTO public.planet
VALUES ('Saturn', 95.200, 4.600, false, 7, 1, NULL);
INSERT INTO public.planet
VALUES ('Uranus', 14.500, 4.600, false, 8, 1, NULL);
INSERT INTO public.planet
VALUES ('Neptune', 17.100, 4.600, false, 9, 1, NULL);
INSERT INTO public.planet
VALUES ('55 Cancri e', 8.000, 4.500, false, 10, 7, NULL);
INSERT INTO public.planet
VALUES ('Vulcan', 0.010, 0.000, false, 12, 1, NULL);
INSERT INTO public.planet
VALUES ('Azeroth', 1.000, 1.000, true, 13, 1, NULL);
--
-- Data for Name: satellite; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.satellite
VALUES (
    'Hubble Space Telescope',
    3,
    '1990-04-24',
    547.00,
    28000.00,
    1
  );
INSERT INTO public.satellite
VALUES (
    'International Space Station',
    1,
    '1998-11-20',
    420.00,
    28000.00,
    1
  );
INSERT INTO public.satellite
VALUES (
    'Chinesee Space Station',
    2,
    '2021-04-29',
    450.00,
    28000.00,
    1
  );
--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star
VALUES ('Sol', 1, 5.000, 'G-type', 1.00, 1, 1);
INSERT INTO public.star
VALUES (
    'Alpha Centauri A',
    1,
    6.000,
    'G-type',
    4.37,
    2,
    1
  );
INSERT INTO public.star
VALUES (
    'Betelgeuse',
    15,
    0.000,
    'Red supergiant',
    642.50,
    4,
    1
  );
INSERT INTO public.star
VALUES ('Vega', 2, 0.000, 'A-type', 25.00, 5, 1);
INSERT INTO public.star
VALUES ('Sirius', 2, 0.250, 'A-type', 8.60, 3, 1);
INSERT INTO public.star
VALUES (
    'Alpha Centauri B',
    1,
    6.000,
    'K-type',
    4.37,
    6,
    1
  );
INSERT INTO public.star
VALUES ('55 Cancri', 1, 4.500, 'G-type', 41.00, 7, 1);
INSERT INTO public.star
VALUES ('WASP-121b', 1, 0.000, 'G-type', 858.00, 8, 1);
--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 6, true);
--
-- Name: moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_id_seq', 20, true);
--
-- Name: planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_id_seq', 13, true);
--
-- Name: satellite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.satellite_id_seq', 3, true);
--
-- Name: star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_id_seq', 8, true);
--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
ADD CONSTRAINT galaxy_name_key UNIQUE (name);
--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);
--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
ADD CONSTRAINT moon_name_key UNIQUE (name);
--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);
--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
ADD CONSTRAINT planet_name_key UNIQUE (name);
--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);
--
-- Name: satellite satellite_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.satellite
ADD CONSTRAINT satellite_name_key UNIQUE (name);
--
-- Name: satellite satellite_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.satellite
ADD CONSTRAINT satellite_pkey PRIMARY KEY (satellite_id);
--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
ADD CONSTRAINT star_name_key UNIQUE (name);
--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);
--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);
--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);
--
-- Name: satellite satellite_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.satellite
ADD CONSTRAINT satellite_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);
--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);
--
-- PostgreSQL database dump complete
--
