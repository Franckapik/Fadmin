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

//input file working ?
//simplifier le lien vers le media ? Comment uploader vers le server ?
//trouver l'origine du pb avec l'ajout de media/categorie et les modals box et la supression (peut-etre les retirer simplement?))
//generation de folder ? choix de la miniature si plusieurs photos uploadées.
//s'occuper du style pour repondre a la demande urgente
//pb de tailles au niveau du lecteur video facebook (windows)
//option : ajouter la bar de lecture et le temps ailleurs pour le style

-essai d'overview vidéo mais baisse de performance au chargement constaté. Je vais essayé une autre technologie pour cela.

A faire :
-finir la section du blog
-ajout de la biographie sous le nom de profile avec deux langues disponibles
-logo avec police d'écriture adaptée
-espace de commentaires à terminer également
-finir espace sur le coté pour le lien vers le blog /contacts
-ajuster le style de la partie administration
-preview video : retirer le debut de la video ?
//style overlay testé mais peu convainquant
//comment regler la position ? (rag and drop?)
//facebook link pour qui ? Pas présent sur le home !?
