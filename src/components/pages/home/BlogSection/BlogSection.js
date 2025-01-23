import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const blogs = [
    {
      date: "November 7, 2022",
      title: "New Apartment Nice in the Best Canadian Cities",
      description: "Bringing the culture of sharing to everyone",
      image: "https://demoapus1.com/freeio/wp-content/uploads/elementor/thumbs/blog2-qn9trz0tntvb57fdqgqc7n922izox97qkqia6tz1pi.jpg", 
    },
    {
      date: "November 7, 2022",
      title: "Diamond Manor Apartment in the New York and Service",
      description: "Bringing the culture of sharing to everyone",
      image: "https://demoapus1.com/freeio/wp-content/uploads/elementor/thumbs/blog1-qn9trz0tntvb57fdqgqc7n922izox97qkqia6tz1pi.jpg", 
    },
    {
      date: "November 7, 2022",
      title: "Unveils the Best Canadian Cities for Biking",
      description: "Bringing the culture of sharing to everyone",
      image: "https://demoapus1.com/freeio/wp-content/uploads/elementor/thumbs/blog12-qn9trz0tntvb57fdqgqc7n922izox97qkqia6tz1pi.jpg", 
    },
    {
      date: "November 7, 2022",
      title: "Exploring Some of the Cities and Home Services",
      description: "Bringing the culture of sharing to everyone",
      image: "https://demoapus1.com/freeio/wp-content/uploads/elementor/thumbs/blog3-qn9trz0tntvb57fdqgqc7n922izox97qkqia6tz1pi.jpg", 
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Our Blog</h2>
        <p className="text-gray-600 mb-8">
          See how you can up your career status
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <Link to='/blog'>
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{blog.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
