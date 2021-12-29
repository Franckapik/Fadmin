--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Debian 13.5-1.pgdg100+1)
-- Dumped by pg_dump version 13.5 (Debian 13.5-1.pgdg100+1)

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
-- Name: Account; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "accessToken" text,
    "accessTokenExpires" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "providerId" text NOT NULL,
    "providerType" text NOT NULL,
    "refreshToken" text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO fanchovh;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "accessToken" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO fanchovh;

--
-- Name: User; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO fanchovh;

--
-- Name: VerificationRequest; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public."VerificationRequest" (
    id text NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationRequest" OWNER TO fanchovh;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO fanchovh;

--
-- Name: author; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.author (
    author_id smallint NOT NULL,
    author_name character varying(20) NOT NULL,
    author_art character varying(20),
    author_biography_fr text,
    author_draft boolean NOT NULL,
    author_email character varying(70),
    author_fb character varying(100),
    author_insta character varying(100),
    author_biography_en text
);


ALTER TABLE public.author OWNER TO fanchovh;

--
-- Name: author_author_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.author_author_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.author_author_id_seq OWNER TO fanchovh;

--
-- Name: author_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.author_author_id_seq OWNED BY public.author.author_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(50) NOT NULL,
    category_description text,
    category_draft boolean NOT NULL,
    category_author smallint
);


ALTER TABLE public.category OWNER TO fanchovh;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO fanchovh;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.comment (
    comment_id integer NOT NULL,
    comment_msg character varying(1000),
    comment_create date,
    comment_author character varying(100),
    comment_draft boolean,
    comment_author_id integer
);


ALTER TABLE public.comment OWNER TO fanchovh;

--
-- Name: media; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.media (
    media_id integer NOT NULL,
    media_title character varying(80),
    media_photo character varying(100),
    media_video character varying(100),
    media_content text,
    media_link character varying(100),
    media_share character varying(100),
    media_created timestamp without time zone,
    media_number smallint,
    media_category_id integer,
    media_folder character varying(30),
    media_subtitle character varying(50) NOT NULL,
    media_author_id smallint,
    media_home boolean NOT NULL,
    media_draft boolean NOT NULL,
    media_large boolean NOT NULL,
    media_position smallint,
    media_preview boolean
);


ALTER TABLE public.media OWNER TO fanchovh;

--
-- Name: media_media_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.media_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_media_id_seq OWNER TO fanchovh;

--
-- Name: media_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.media_media_id_seq OWNED BY public.media.media_id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.post (
    post_id integer DEFAULT nextval('public.media_media_id_seq'::regclass) NOT NULL,
    post_title character varying(200) NOT NULL,
    post_draft boolean,
    post_author_id integer,
    post_content json,
    post_html text,
    post_create date,
    post_update date,
    post_image character varying(400)
);


ALTER TABLE public.post OWNER TO fanchovh;

--
-- Name: author author_id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.author ALTER COLUMN author_id SET DEFAULT nextval('public.author_author_id_seq'::regclass);


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: media media_id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.media ALTER COLUMN media_id SET DEFAULT nextval('public.media_media_id_seq'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public."Account" (id, "userId", "providerAccountId", "accessToken", "accessTokenExpires", "createdAt", "providerId", "providerType", "refreshToken", "updatedAt") FROM stdin;
ckwnhc9480012o3i6hk6t0qbq	106801746628597982291	106801746628597982291	ya29.a0ARrdaM_q1tnaVEuxB9uW9Ov374sasX597SaAVUdfQfX1uzDTf3zOq4Kv4dhybAq2CeCtqxiHbPo_hltQttROW6wik8jHdHX7d0mtqBjMib86hgxBF4g08tQBmnI3pxTJKzbFzSHlhOSblNa5t3XSpy8U2UkB	\N	2021-12-01 12:02:43.88	google	oauth	\N	2021-12-01 12:02:43.881
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public."Session" (id, "sessionToken", "userId", expires, "accessToken", "createdAt", "updatedAt") FROM stdin;
ckwnhek4r0047o3i6fd3cpyve	104bd8fc128243341ab97cba40e943984fed7c782c71e247cdb4b85280ca535d	106801746628597982291	2022-01-22 22:11:34.762	0131d058d758b54a49db9859d48bd705e633ecc85de0d11a833eeba5b4b6f999	2021-12-01 12:04:31.467	2021-12-23 22:11:34.764
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public."User" (id, name, email, "emailVerified", image, "createdAt", "updatedAt") FROM stdin;
106801746628597982291	Fanch	fanchcavellec@gmail.com	\N	https://lh3.googleusercontent.com/a/AATXAJxyXI4F4vlOW0JTQ5sU3CtS1itJBnc23M07KcUM=s96-c	2021-12-01 12:02:43.876	2021-12-01 12:02:43.876
\.


--
-- Data for Name: VerificationRequest; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public."VerificationRequest" (id, identifier, token, expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
af499236-fbe5-476d-958c-be50622996bb	db9808c14b29b582a754b67339874ff81f7e063d23706ad02cf4f2c9dba7651a	2021-12-01 12:50:39.615552+01	20211201115039_auth	\N	\N	2021-12-01 12:50:39.511044+01	1
6c401279-2df3-4b03-86ab-40a671edd8a5	e3395b4647f6dd5d3fb7fd3df9e8b7aac4e85caff7a1f2c48fc7a928da256539	2021-12-01 13:02:02.770797+01	20211201120202_authv3	\N	\N	2021-12-01 13:02:02.72999+01	1
\.


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.author (author_id, author_name, author_art, author_biography_fr, author_draft, author_email, author_fb, author_insta, author_biography_en) FROM stdin;
2	Leeloo peuplier	Photo\n	Voici la biographie de Leeloo	t	leeloo.peuplier@gmail.com	https://www.facebook.com/VoyageLOo/	https://www.instagram.com/leeloopeuplier	\N
1	Eyal SH	Sound	Depuis 2014, je travaille en tant qu'ingénieur du son intermittent du spectacle dans le domaine de l'audiovisuel ainsi que dans la musique. <p>Je suis spécialisé en mixage, montage son et mastering. </p>\nConcernant les projets musicaux, au-delà de l'aspect technique, je porte une attention particulière à l'émotion, l'impact et l'ambiance de la musique sur laquelle je travaille. Je suis convaincu que chaque production nécessite une approche différente en fonction du type de musique, du style de mixage et de vos attentes. \nMon approche du son dans le domaine de la post-production est différente mais pas complètement opposée. La principale différence est que je dois m'assurer que le son reste toujours en accord avec l'image. Les services que je propose sont le montage son, le montage des dialogues, le sound design et le mixage. Je travaille sur toutes sortes de supports : TV, documentaire, entreprise... \nJe serais ravi de discuter de votre projet. Cliquez sur le bouton "Contact" ci-dessus pour me contacter.	t	shaltiel.eyal@gmail.com	https://www.facebook.com/ES.Sound1	https://www.instagram.com/eyal.mix	Since 2014, I have been working as a freelance sound engineer in the audiovisual field as well as in music. I am specialized in mixing, sound editing and mastering. \nFor musical projects, beyond the technical aspect, I pay particular attention to the emotion, the impact and the atmosphere of the music I work on. I am convinced that each production requires a different approach depending on the type of music, the style of mix and your expectations.\nMy approach for audio post production is different but not completely opposite. The main difference is that I have to make sure that the sound always matches the picture. The services I offer are sound editing, dialogue editing, sound design and mixing. I work for all kinds of video : TV, Documentary, Corporate, Web TV... \nI'd be glad to hear about your project. Click the 'Contact' button above to get in touch.
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.category (category_id, category_name, category_description, category_draft, category_author) FROM stdin;
2	Events	desc	t	2
3	People & Lifestyle	desc	t	2
4	Fine arts	desc	t	2
5	Architecture & interior	desc	t	2
6	Films	desc	t	1
7	Music	desc	t	1
1	Fashion & Beauty	desc	t	2
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.comment (comment_id, comment_msg, comment_create, comment_author, comment_draft, comment_author_id) FROM stdin;
1	Salut c'est cool !! Oui\n	2021-12-21	fanch2	f	1
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.media (media_id, media_title, media_photo, media_video, media_content, media_link, media_share, media_created, media_number, media_category_id, media_folder, media_subtitle, media_author_id, media_home, media_draft, media_large, media_position, media_preview) FROM stdin;
25	anemone	17.png	https://youtu.be/cDnDuYDFnTY	j-pop	https://youtu.be/cDnDuYDFnTY	\N	\N	\N	7	16	Mix & mastering	1	f	f	f	13	f
17	Bleach	08.png	https://youtu.be/qlUMlPxkcHo	Anime	https://youtu.be/qlUMlPxkcHo	\N	\N	\N	6	08	Mix	1	t	f	f	12	t
22	Shining Bright	13.png	https://www.youtube.com/watch?v=zmXeu6s_sYw	indie pop	https://www.youtube.com/watch?v=zmXeu6s_sYw	\N	\N	\N	7	13	Mix & mastering	1	t	f	f	7	f
1	\N	1-1.jpeg	\N	\N	\N	\N	\N	\N	1	01	Photography	2	t	f	f	1	\N
21	Flower	12.png	https://soundcloud.com/es-sound-1/folk-acousticdavid-francisco-flower-mix-mastering	folk/acoustic	https://soundcloud.com/es-sound-1/folk-acousticdavid-francisco-flower-mix-mastering\\	\N	\N	\N	7	12	Mix & mastering	1	t	f	f	11	f
11	Ltom	03.png	https://www.youtube.com/watch?v=625blUTYcZg	France 3 TV	https://www.youtube.com/watch?v=625blUTYcZg	\N	\N	\N	6	02	Mix	1	f	f	f	1	f
2	\N	2-1.JPG	\N	\N	\N	\N	\N	\N	2	02	Photography	2	f	f	f	2	\N
3	\N	3-1.jpeg	\N	\N	\N	\N	\N	\N	3	03	Photography	2	f	f	f	3	\N
4	\N	4-1.jpeg	\N	\N	\N	\N	\N	\N	4	04	Photography	2	f	f	f	4	\N
5	\N	5-1.JPG	\N	\N	\N	\N	\N	\N	3	05	Photography	2	t	f	f	5	\N
6	\N	6-1.jpeg	\N	\N	\N	\N	\N	\N	3	06	Photography	2	t	f	f	6	\N
7	\N	7-1.jpeg	\N	\N	\N	\N	\N	\N	3	07	Photography	2	f	f	f	7	\N
8	\N	8-1.jpeg	\N	\N	\N	\N	\N	\N	1	08	Photography	2	t	f	f	8	\N
9	\N	9-1.JPG	\N	\N	\N	\N	\N	\N	5	09	Photography	2	t	f	f	9	\N
12	Intel	03.png	https://vimeo.com/301609082	Commercial	https://vimeo.com/301609082	\N	\N	\N	6	03	Mix	1	f	f	f	2	f
13	Knock knock	04.png	https://youtu.be/PSY7w9iDCrQ	France 3 TV	https://youtu.be/PSY7w9iDCrQ	\N	\N	\N	6	04	Mix	1	t	f	t	3	t
14	Longines	05.png	https://vimeo.com/392705511	Commercial	https://vimeo.com/392705511	\N	\N	\N	6	05	Mix	1	f	f	t	4	t
15	Vlan	06.png	https://youtu.be/xftQ7uhU_h4	France 3 TV	https://youtu.be/xftQ7uhU_h4	\N	\N	\N	6	06	Mix & sound editing	1	f	f	f	5	f
16	Windows	07.png	https://www.facebook.com/WindowsFrance/videos/1039273472888400/	Commercial	https://fb.watch/991-NnOQeY/	\N	\N	\N	6	07	Mix	1	t	f	f	6	f
18	La nuit en plein jour	09.png	https://youtu.be/zufml_R2YIo	Fiction 9'33	https://youtu.be/zufml_R2YIo	\N	\N	\N	6	09	Mix & sound editing	1	f	f	t	8	t
19	The pledge	10.jpg	https://youtu.be/IWS2j3BQ-FE	Metal/VK	https://youtu.be/IWS2j3BQ-FE	\N	\N	\N	7	10	Mix & mastering	1	f	f	f	9	f
20	About your fears	11.png	https://youtu.be/fptoR7nGj2M	pop	https://youtu.be/fptoR7nGj2M	\N	\N	\N	7	11	Mix & mastering	1	f	f	t	10	f
24	lovelove	15.jpg	https://youtu.be/FxcfzPTMaiE	trip hop	https://youtu.be/FxcfzPTMaiE	\N	\N	\N	7	15	Mix & mastering	1	t	f	t	15	f
23	Love psalm	14.jpeg	https://youtu.be/2FPOAZ2hTZ0	instrumental rock	https://youtu.be/2FPOAZ2hTZ0	\N	\N	\N	7	14	Mix & mastering	1	t	f	f	14	t
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.post (post_id, post_title, post_draft, post_author_id, post_content, post_html, post_create, post_update, post_image) FROM stdin;
0	Ceci est un drole d'essai	t	2	{"ops":[{"insert":"nouveau\\n"}]}	<p>nouveau</p>	\N	\N	\N
1	Titre du blog	f	1	{"ops":[{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, "},{"attributes":{"bold":true},"insert":"non viverra"},{"insert":" mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 446 words, 3046 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"insert":"\\n\\n"}]}	<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, <strong>non viverra</strong> mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim.</p><p class="ql-align-justify">Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis.</p><p class="ql-align-justify">Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum.</p><p class="ql-align-justify">Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh.</p><p class="ql-align-justify"><br></p><p><strong>Generated 5 paragraphs, 446 words, 3046 bytes of&nbsp;</strong><a href="https://www.lipsum.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 0, 0);"><strong>Lorem Ipsum</strong></a></p><p><br></p>	2021-12-21	\N	femme.png
2	Titre du blog	f	1	{"ops":[{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, "},{"attributes":{"bold":true},"insert":"non viverra"},{"insert":" mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 446 words, 3046 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"insert":"\\n\\n"}]}	<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, <strong>non viverra</strong> mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim.</p><p class="ql-align-justify">Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis.</p><p class="ql-align-justify">Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum.</p><p class="ql-align-justify">Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh.</p><p class="ql-align-justify"><br></p><p><strong>Generated 5 paragraphs, 446 words, 3046 bytes of&nbsp;</strong><a href="https://www.lipsum.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 0, 0);"><strong>Lorem Ipsum</strong></a></p><p><br></p>	2021-12-21	\N	femme.png
3	Titre du blog	f	1	{"ops":[{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, "},{"attributes":{"bold":true},"insert":"non viverra"},{"insert":" mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 446 words, 3046 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"insert":"\\n\\n"}]}	<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, <strong>non viverra</strong> mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim.</p><p class="ql-align-justify">Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis.</p><p class="ql-align-justify">Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum.</p><p class="ql-align-justify">Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh.</p><p class="ql-align-justify"><br></p><p><strong>Generated 5 paragraphs, 446 words, 3046 bytes of&nbsp;</strong><a href="https://www.lipsum.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 0, 0);"><strong>Lorem Ipsum</strong></a></p><p><br></p>	2021-12-21	\N	femme.png
4	Titre du blog	f	1	{"ops":[{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, "},{"attributes":{"bold":true},"insert":"non viverra"},{"insert":" mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 446 words, 3046 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"insert":"\\n\\n"}]}	<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, <strong>non viverra</strong> mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim.</p><p class="ql-align-justify">Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis.</p><p class="ql-align-justify">Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum.</p><p class="ql-align-justify">Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh.</p><p class="ql-align-justify"><br></p><p><strong>Generated 5 paragraphs, 446 words, 3046 bytes of&nbsp;</strong><a href="https://www.lipsum.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 0, 0);"><strong>Lorem Ipsum</strong></a></p><p><br></p>	2021-12-21	\N	femme.png
5	Titre du blog	f	1	{"ops":[{"insert":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, "},{"attributes":{"bold":true},"insert":"non viverra"},{"insert":" mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum."},{"attributes":{"align":"justify"},"insert":"\\n"},{"insert":"Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh."},{"attributes":{"align":"justify"},"insert":"\\n\\n"},{"attributes":{"bold":true},"insert":"Generated 5 paragraphs, 446 words, 3046 bytes of "},{"attributes":{"bold":true,"color":"#000000","link":"https://www.lipsum.com/"},"insert":"Lorem Ipsum"},{"insert":"\\n\\n"}]}	<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque sapien vel tempus pellentesque. Maecenas ut ultrices massa. Nam tincidunt vestibulum turpis quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sollicitudin massa at urna ultrices, <strong>non viverra</strong> mi pellentesque. Curabitur fermentum in nisl id laoreet. Vestibulum lobortis commodo commodo. Donec consequat augue nec felis congue pretium. Nam porta feugiat risus, in feugiat nunc faucibus quis. Nam porttitor iaculis pretium. Vivamus eget ornare nisl. Proin pharetra at ex vitae placerat. Aenean pharetra pellentesque tristique. Vestibulum quis faucibus neque. Praesent tempus ornare lectus at efficitur. Suspendisse varius a est sagittis dignissim.</p><p class="ql-align-justify">Vivamus sit amet ipsum gravida, porta nisi ac, sagittis purus. Curabitur venenatis eu dolor id vestibulum. Aliquam placerat tempus semper. Nulla congue nisl turpis, ut rutrum lacus facilisis ut. Proin condimentum, felis eget vehicula hendrerit, nunc felis convallis urna, vitae gravida eros enim et magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec laoreet metus, a faucibus felis.</p><p class="ql-align-justify">Praesent porta, augue vitae consectetur feugiat, leo ligula dictum magna, et convallis ipsum felis vitae tortor. Etiam in mi id purus aliquam placerat quis ut velit. Cras scelerisque neque ullamcorper malesuada gravida. Aenean auctor, elit non lacinia sagittis, magna nisi lobortis erat, ut vestibulum enim magna et mauris. Duis a sem id magna dictum blandit. Integer ac nunc in dolor facilisis ultricies vitae tristique metus. Phasellus purus mi, rutrum in nisl dictum, porta congue risus. Aliquam massa urna, posuere non malesuada sed, lobortis sed dui. Vivamus sodales massa quis scelerisque maximus. Suspendisse hendrerit tortor placerat sodales vulputate. Vestibulum metus ante, sollicitudin a lacus eget, porttitor egestas justo. Sed porta nec libero non sollicitudin. In vitae viverra nisl. Donec sit amet ipsum at urna sodales fermentum.</p><p class="ql-align-justify">Aenean feugiat ac eros sit amet fermentum. Donec id auctor orci. Donec aliquet enim tempus nisl tempor fermentum. Integer auctor placerat ligula quis bibendum. Aliquam erat volutpat. Integer consequat dapibus sem et accumsan. In faucibus sapien a purus dignissim imperdiet. Integer scelerisque venenatis dui vel finibus. Aenean leo odio, dapibus ac sapien nec, aliquam porta nibh.</p><p class="ql-align-justify"><br></p><p><strong>Generated 5 paragraphs, 446 words, 3046 bytes of&nbsp;</strong><a href="https://www.lipsum.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 0, 0);"><strong>Lorem Ipsum</strong></a></p><p><br></p>	2021-12-21	\N	femme.png
\.


--
-- Name: author_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.author_author_id_seq', 13, true);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.category_category_id_seq', 12, true);


--
-- Name: media_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.media_media_id_seq', 12, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationRequest VerificationRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."VerificationRequest"
    ADD CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (author_id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: comment comment_id_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_id_pk PRIMARY KEY (comment_id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (media_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- Name: Account_providerId_providerAccountId_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON public."Account" USING btree ("providerId", "providerAccountId");


--
-- Name: Session_accessToken_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "Session_accessToken_key" ON public."Session" USING btree ("accessToken");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationRequest_identifier_token_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON public."VerificationRequest" USING btree (identifier, token);


--
-- Name: VerificationRequest_token_key; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX "VerificationRequest_token_key" ON public."VerificationRequest" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: media author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT author_id_fkey FOREIGN KEY (media_author_id) REFERENCES public.author(author_id);


--
-- Name: category category_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_author_fkey FOREIGN KEY (category_author) REFERENCES public.author(author_id);


--
-- Name: media category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT category_fkey FOREIGN KEY (media_category_id) REFERENCES public.category(category_id);


--
-- Name: comment comment_author_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_author_id_fk FOREIGN KEY (comment_author_id) REFERENCES public.author(author_id);


--
-- Name: post post_author_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_author_id_fk FOREIGN KEY (post_author_id) REFERENCES public.author(author_id) NOT VALID;


--
-- PostgreSQL database dump complete
--

