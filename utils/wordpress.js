const axios = require("axios").default;

/**
 * Function to get WordPress token to access the wordpress site
 * @param {string} wordPressUrl
 * @returns {string} WordPress token
 */
async function getWordPressToken(wordPressUrl) {
  const token = await axios({
    method: "POST",
    url: `${wordPressUrl}/wp-json/api/v1/token `,
    data: {
      username: `${process.env.WORDPRESS_NAME}`,
      password: `${process.env.WORDPRESS_PW}`,
    },
  });
  return token;
}

/**
 * Function to get all post from WordPress website
 * @param {string} wordPressUrl
 * @returns {array} Array of all post in the WordPress website
 */
async function getAllWordPressPost(wordPressUrl) {
  try {
    const token = await getWordPressToken(wordPressUrl);
    const wordPressPost = await axios.get(
      `${wordPressUrl}/wp-json/wp/v2/posts`,
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    return wordPressPost;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to create a post in WordPress. Used to add speakers to WordPress website.
 * @param {string} html
 * @param {string} title
 * @param {number} postCategoryId
 * @param {string} wordPressUrl
 * @returns {object} Link and ID of the created post.
 * This link and ID will be stored in the database for future updates.
 */
async function createPost(html, title, postCategoryId, wordPressUrl) {
  try {
    // console.log("inside create post", wordPressUrl);
    const token = await getWordPressToken(wordPressUrl);
    // console.log(token, "token");
    const wordPressPost = await axios.post(
      `${wordPressUrl}/wp-json/wp/v2/posts`,
      {
        content: html,
        title: title,
        categories: [postCategoryId],
        status: "publish",
      },
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    // console.log(wordPressPost, "wordpresspost");
    return {
      wordPressPostLink: wordPressPost.data.link,
      wordPressPostId: wordPressPost.data.id,
    };
    // return wordPressPost.data.link;
  } catch (err) {
    console.log(err);
    // return res.status(400).json({ error: true, msg: err });
  }
}

/**
 * Function to get WordPress post's category ID.
 * The post category refer to the speaker's country.
 * This category id is required to create a post.
 * Without the category id, the created post will not be shown on the WordPress website.
 * @param {string} speakerCountry
 * @param {string} wordPressUrl
 * @returns {number} ID of the category(speaker's country)
 */
async function getPostCategoriesId(speakerCountry, wordPressUrl) {
  console.log("inside getPostCategories", wordPressUrl);
  const slug = speakerCountry.toLowerCase();
  try {
    const token = await getWordPressToken(wordPressUrl);
    const { data } = await axios.get(
      `${wordPressUrl}/wp-json/wp/v2/categories/?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );

    // If a category is found, return the category ID
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === speakerCountry) {
        // console.log("Country existed");
        return data[i].id;
      }
    }

    // If no category matches, create a new category and return the category ID
    const catergory = await axios.post(
      `${wordPressUrl}/wp-json/wp/v2/categories`,
      {
        name: speakerCountry,
        slug: slug,
      },
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );

    return catergory.data.id;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to update a specific page on WordPress website.
 * Used to udpate session details and Program Overview.
 * @param {number} pageId
 * @param {object} data
 * @param {string} wordPressUrl
 * @returns {object} Information of the updated page.
 */
async function updateOnePage(pageId, data, wordPressUrl) {
  try {
    const token = await getWordPressToken(wordPressUrl);
    console.log("At updateOnePage utils");
    const wordPressPage = await axios.post(
      `${wordPressUrl}/wp-json/wp/v2/pages/${pageId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    // console.log(wordPressPost);
    return wordPressPage;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to create a page in WordPress website.
 * Used to create session and program overview pages.
 * @param {string} content
 * @param {string} title
 * @param {string} wordPressUrl
 * @param {string} status Either "draft" or "publish"
 * @returns {object} Link and ID of the created page
 */
async function createPage(content, title, wordPressUrl, status) {
  try {
    const token = await getWordPressToken(wordPressUrl);
    // console.log(token, "token");
    const wordPressPage = await axios.post(
      `${wordPressUrl}/wp-json/wp/v2/pages`,
      {
        title: title,
        content: content,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    return {
      wordpressLink: wordPressPage.data.link,
      wordpressId: wordPressPage.data.id,
    };
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to delete a specific post based on the post id.
 * Used to remove speakers from WordPress website.
 * @param {number} id
 * @param {string} wordPressUrl
 * @returns {object} Details of the deleted post.
 */
async function deletePost(id, wordPressUrl) {
  try {
    const token = await getWordPressToken(wordPressUrl);
    const wordPressPost = await axios.delete(
      `${wordPressUrl}/wp-json/wp/v2/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    // console.log(wordPressPost);
    return wordPressPost;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Function to upate a specific post based on the given postId.
 * Used to update speaker's information (post) on WordPress website.
 * @param {number} postId
 * @param {string} title
 * @param {object} data
 * @param {string} wordPressUrl
 * @returns {object} Information of the updated post.
 */
async function updateOnePost(postId, title, data, wordPressUrl) {
  try {
    const token = await getWordPressToken(wordPressUrl);
    console.log("At updateOnePost utils");

    const wordPressPost = await axios.post(
      `${wordPressUrl}/wp-json/wp/v2/posts/${postId}`,
      {
        title: title,
        content: data,
        status: "publish",
      },
      {
        headers: {
          Authorization: `Bearer ${token["data"]["jwt_token"]}`,
        },
      }
    );
    // console.log(wordPressPost);
    return wordPressPost;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getWordPressToken,
  getAllWordPressPost,
  createPage,
  updateOnePage,
  createPost,
  getPostCategoriesId,
  deletePost,
  updateOnePost,
  createPage,
};
