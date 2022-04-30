import { FacebookShareButton } from "next-share";
import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  try {
    const addAuthor = await prisma.author.create({
      data: {
        author_name: "Franckenstein",
        author_art: "Be Alive",
        author_draft: false,
        author_email: "franckenstein@monster.com",
        author_biography_en:
          "Frankenstein is about a hideous monster created from dead body parts. The tale is often considered the first science fiction novel, and has had considerable impact on western culture. It has been adapted to stage plays and movies many times.",
        author_biography_fr:
          "Frankenstein ou Le Prométhée moderne est un roman d'épouvante de Mary Shelley. C'est l'un des grands classiques de l'épouvante, avec Dracula de Bram Stocker : il a été très souvent adapté, notamment au cinéma.",
        author_fb: "facebook.com/franckenstein",
        author_insta: "instagram.com/franckenstein/",
      },
    });
    const addCategory = await prisma.category.create({
      data: {
        category_name: "My Favorites animals",
        category_description: "I love sharing all my favorite animals",
        category_draft: false,
        category_author: 1,
      },
    });

    const addMedia = await prisma.media.create({
      data: {
        media_title: "The Shorse",
        media_content: "So cool",
        media_link:
          "https://i.dailymail.co.uk/i/pix/2013/10/07/article-2448571-1893439900000578-431_634x460.jpg",
        media_share: "facebook.com/shorse",
        media_created: "29-04-2022",
        media_category_id: 1,
        media_subtitle: "What does the Shorse eat ?",
        media_author_id: 1,
        media_draft: false,
        media_large: true,
        media_path:
          "https://i.dailymail.co.uk/i/pix/2013/10/07/article-2448571-1893439900000578-431_634x460.jpg",
        media_preview: false,
        media_album: false,
      },
    });

    const addPost = await prisma.post.create({
      data: {
        post_title: "This is Mitty, my cute cat",
        post_draft: false,
        post_author_id: 1,
        post_content: "I love his tiny tongue !!",
        post_html: "<div>I love his tiny tongue !!</div>",
        post_create: "29-04-2022",
        post_update: "29-04-2022",
        post_image: "/cat.jpg",
      },
    });

    const addComment = await prisma.comment.create({
      data: {
        comment_msg:
          "Franckenstein is a good friend! We love to work together as monsters! ",
        comment_create: "29-04-2022",
        comment_author: "Dracula",
        comment_draft: false,
        comment_author_id: 1,
      },
    });

    const addHome = await prisma.home.create({
      data: {
        home_video_url: "",
        home_mail: "franckenstein@monster.com",
        home_id: 1,
        home_insta: "instagram.com/franckenstein",
        home_fb: "facebook.com/franckenstein",
        home_name: "The Blog of Franckenstein",
        home_logo:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Frankenstein%27s_monster_%28Boris_Karloff%29.jpg",
        home_media_position: "",
      },
    });

    console.log("Database Prefill Done");
    res
      .status(200)
      .json({
        author: addAuthor,
        category: addCategory,
        media: addMedia,
        post: addPost,
        comment: addComment,
        home: addHome,
      });
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while modifying home url video" + err });
  }
};
