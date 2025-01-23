import React from "react";

const blogPosts = [
  {
    id: 1,
    image: "https://demoapus1.com/freeio/wp-content/uploads/2022/09/blog2.jpg", // Replace with real image URLs
    title: "New Apartment Nice in the Best Canadian Cities",
    description:
      "Bringing the culture of sharing to everyone Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam ...",
    category: "Music & Audio",
    date: "November 7, 2022",
    author: "admin",
  },
  {
    id: 2,
    image: "https://demoapus1.com/freeio/wp-content/uploads/2022/09/blog1.jpg", // Replace with real image URLs
    title: "Explore the Top 5 Destinations for Solo Travelers",
    description:
      "Discover the joys of solo traveling Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue ...",
    category: "Travel & Adventure",
    date: "November 14, 2022",
    author: "admin",
  },
  {
    id: 3,
    image: "https://demoapus1.com/freeio/wp-content/uploads/2022/09/blog12.jpg", // Replace with real image URLs
    title: "How to Build a Productive Morning Routine",
    description:
      "Start your day right with these tips Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue ...",
    category: "Self Development",
    date: "November 20, 2022",
    author: "admin",
  },
  {
    id: 4,
    image: "https://demoapus1.com/freeio/wp-content/uploads/2022/09/blog2.jpg", // Replace with real image URLs
    title: "New Apartment Nice in the Best Canadian Cities",
    description:
      "Bringing the culture of sharing to everyone Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam ...",
    category: "Music & Audio",
    date: "November 7, 2022",
    author: "admin",
  },
  {
    id: 5,
    image: "https://demoapus1.com/freeio/wp-content/uploads/2022/09/blog1.jpg", // Replace with real image URLs
    title: "Explore the Top 5 Destinations for Solo Travelers",
    description:
      "Discover the joys of solo traveling Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue ...",
    category: "Travel & Adventure",
    date: "November 14, 2022",
    author: "admin",
  },
];

const BlogPage = () => {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Blogs
        </h1>
        <div className="max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              {/* Blog Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover h-auto"
              />
  
              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-2">{post.author}</span>
                  <span className="mr-2">•</span>
                  <span className="mr-2">{post.category}</span>
                  <span className="mr-2">•</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <a
                  href="#"
                  className="text-green-600 font-medium hover:text-green-800 transition-colors"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default BlogPage;