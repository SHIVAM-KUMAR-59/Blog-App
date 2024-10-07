// blog.mjs

import { Router } from "express";
import { posts } from "../Constants/posts.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import createPostValidationSchema from "../utils/validationSchemas.mjs"; // Correct import

const router = Router();

// Get all posts
router.get("/api/posts", (req, res) => {
  res.status(200).send(posts);
});

// Create a new blog post
router.post(
  "/api/posts",
  checkSchema(createPostValidationSchema),
  (req, res) => {
    // Extracts the validation errors of an express request
    const result = validationResult(req);

    // Send the errors if any
    if (!result.isEmpty()) {
      return res.status(401).send({ errors: result.array() });
    }

    // extract the validated data
    const data = matchedData(req);
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      ...data,
    };
    // Push the user in the array
    posts.push(newPost);
    res.status(200).send(newPost);
  }
);

// Delete a blog
router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the post with the given ID
  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  // If post not found, send a 404 response
  if (postIndex === -1) {
    return res.status(404).send({ msg: "Post not found" });
  }

  // Remove the post from the array
  const deletedPost = posts.splice(postIndex, 1); // This will remove the post and return the deleted post

  // Send back the deleted post or confirmation message
  res.status(200).send({ msg: "Post deleted successfully", post: deletedPost });
});

// Modify a post by id
router.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Find the index of the post with the matching ID
  const postIndex = posts.findIndex((post) => post.id === id);

  // If the post is not found, return a 404 error
  if (postIndex === -1) {
    return res.status(404).send({ msg: "Post not found" });
  }

  // Extract the fields to be updated from the request body
  const { title, shortDescription, content, tags, reactions } = req.body;

  // Update the fields of the post with the new values
  if (title) posts[postIndex].title = title;
  if (shortDescription) posts[postIndex].shortDescription = shortDescription;
  if (tags) posts[postIndex].tags = tags;

  // Send the updated post as a response
  res
    .status(200)
    .send({ msg: "Post updated successfully", post: posts[postIndex] });
});

// Get Trending Posts
router.get("/api/posts/trending", (req, res) => {
  // Sort the posts array by 'likes' in descending order
  const trendingPosts = posts
    .sort((a, b) => b.reactions.likes - a.reactions.likes)
    .slice(0, 10); // Get the top 10 posts

  // Send the top 10 sorted posts
  res.status(200).send(trendingPosts);
});

// Get posts by title or tags (case-insensitive)
router.get("/api/posts/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;

  // Check if the search term is a valid ID (assuming IDs are numeric or alphanumeric)
  const isId = !isNaN(Number(searchTerm));

  // Convert the search term to lowercase for case-insensitive title/tag matching
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Filter posts where the title or tags contain the search term
  const matchedPosts = posts.filter((post) => {
    const postTitleMatch = post.title
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const postTagsMatch = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return postTitleMatch || postTagsMatch;
  });

  // If search term is a valid ID, try to find the post by its ID
  if (isId) {
    const matchedPostById = posts.find(
      (post) => post.id === Number(searchTerm)
    );
    if (matchedPostById) {
      matchedPosts.push(matchedPostById); // Push the post found by ID to the matchedPosts array
    }
  }

  // If no posts are found, send a 404 response
  if (matchedPosts.length === 0) {
    return res
      .status(404)
      .send({ msg: "No posts found matching the search term." });
  }

  // Remove any duplicate posts if the same post was found by title/tags and ID
  const uniquePosts = [
    ...new Map(matchedPosts.map((post) => [post.id, post])).values(),
  ];

  // Return the matched posts
  res.status(200).send(uniquePosts);
});

export default router;
