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
DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
ALTER DATABASE number_guess OWNER TO freecodecamp;
\ connect number_guess
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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
  game_id integer NOT NULL,
  user_id integer NOT NULL,
  guesses_taken integer DEFAULT 0 NOT NULL
);
ALTER TABLE public.games OWNER TO freecodecamp;
--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;
--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;
--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
  user_id integer NOT NULL,
  name character varying(22) NOT NULL
);
ALTER TABLE public.users OWNER TO freecodecamp;
--
-- Name: players_player_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.players_player_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.players_player_id_seq OWNER TO freecodecamp;
--
-- Name: players_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.players_player_id_seq OWNED BY public.users.user_id;
--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
ALTER COLUMN game_id
SET DEFAULT nextval('public.games_game_id_seq'::regclass);
--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
ALTER COLUMN user_id
SET DEFAULT nextval('public.players_player_id_seq'::regclass);
--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games
VALUES (1, 16, 968);
INSERT INTO public.games
VALUES (2, 16, 386);
INSERT INTO public.games
VALUES (3, 17, 536);
INSERT INTO public.games
VALUES (4, 17, 922);
INSERT INTO public.games
VALUES (5, 16, 489);
INSERT INTO public.games
VALUES (6, 16, 446);
INSERT INTO public.games
VALUES (7, 16, 439);
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users
VALUES (1, 'test');
INSERT INTO public.users
VALUES (2, 'pakker');
INSERT INTO public.users
VALUES (3, '1');
INSERT INTO public.users
VALUES (4, 'pakk');
INSERT INTO public.users
VALUES (5, '123');
INSERT INTO public.users
VALUES (6, 'pakke');
INSERT INTO public.users
VALUES (7, 'user_1705626407321');
INSERT INTO public.users
VALUES (8, 'user_1705626407320');
INSERT INTO public.users
VALUES (9, 'user_1705626411524');
INSERT INTO public.users
VALUES (10, 'user_1705626411523');
INSERT INTO public.users
VALUES (11, 'user_1705626419132');
INSERT INTO public.users
VALUES (12, 'user_1705626419131');
INSERT INTO public.users
VALUES (13, 'user_1705626470276');
INSERT INTO public.users
VALUES (14, 'user_1705626470275');
INSERT INTO public.users
VALUES (15, 'ass');
INSERT INTO public.users
VALUES (16, 'user_1705645086849');
INSERT INTO public.users
VALUES (17, 'user_1705645086848');
INSERT INTO public.users
VALUES (18, 'jfdkla');
INSERT INTO public.users
VALUES (19, 'jfkdlse');
INSERT INTO public.users
VALUES (20, '1234');
--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 7, true);
--
-- Name: players_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.players_player_id_seq', 20, true);
--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);
--
-- Name: users players_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
ADD CONSTRAINT players_pkey PRIMARY KEY (user_id);
--
-- Name: games games_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
ADD CONSTRAINT games_player_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
--
-- PostgreSQL database dump complete
--
