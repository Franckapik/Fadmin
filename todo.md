//lecture db ok
//ecriture db ok
//bootstrap ok en utilisant les classnames seulement. (contrairement a reactstrap) => se referer a la doc css : https://getbootstrap.com/docs/3.3/css/

structure db à faire selon le plan donné par mail

//Author : Leeloo & Eyal
//Category : Overviews, Events, people, fashion, architecture, food, bio, comment
//Page (type) : Blog (Post), Gallery, Biography, Contact, Video, ...
//Media : Title, Message, Photo, link, facebook, ...

Author : Name, Category ID, Job, Biography, Draft
Category : Name, Page Id, Description, Draft
Page : Name, templates_id,
Media : Title, Category ID, Message, Photo, Link, share, draft...
//Path

//Font :
header--artist h2 {
font-family: 'futura-light', sans-serif;
font-weight: 400;
letter-spacing: 0.075em;
text-transform: uppercase;
text-align: center;
column-span: all;

//api/authors/[id] => authors by id
//api/authors/ => all authors

Etant donné le temps impartit, se focaliser dabord sur l'affichage puis ensuite sur les performances après premiere livraison

les questions ?
-faire un map lors d'un dossier d'images sur le caroussel ?
-en fonction du type du media, plutot gallerie ou video youtube

aparemment peu utile d'utiliser lapi interne ds getServer. Autant importer la function.
useSWR semble possible dans getServer mais cela a peut de sens.

Questions : Qu'en est-il du coté du site ? Retirer captions ?
retirer les captions fleches si pas de gallery

//ajouter/modifier/supprimer données depuis l'admin (icones)
//input file working ?
//simplifier le lien vers le media ? Comment uploader vers le server ?
//trouver l'origine du pb avec l'ajout de media/categorie et les modals box et la supression (peut-etre les retirer simplement?))
//modifier la hauteur initiale du carousel home
// la longueur des vignettes inégales avec un tableau de width inégales a trouver
