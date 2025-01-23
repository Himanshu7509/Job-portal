import React from "react";

const JobGrid = () => {
  const jobs = [
    {
      image: "https://media.wired.com/photos/5926aae5f3e2356fd800a0e8/master/pass/amazon-logo.jpg",
      title: "Amazon",
      description: "Expert in graphic design and branding strategies.",
      tags: ["HTML", "CSS", "Javascript"],
    },
    {
      image: "https://imageio.forbes.com/specials-images/imageserve/657299f9c6898fd9524d546c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      title: "AMD",
      description:
        "Specializing in responsive web applications and user experience.",
      tags: ["Bootstrap", "Scss", "other"],
    },
    {
      image: "https://images.yourstory.com/cs/2/220356402d6d11e9aa979329348d4c3e/Flipkart-1582211499554.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75",
      title: "Flipkart",
      description: "Skilled in data visualization and statistical analysis.",
      tags: ["React", "Tailwindcss", "SQL"],
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIoIr2Y33v0IdprP2CEPnEU07j1IPUUyjnw&s",
      title: "Zomato",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      tags: ["Tag one", "Tag two", "Tag three"],
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-mTOvpR2vZqrFGr65sUgVRPJhX5F7VBIBg&s",
      title: "Infosys",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      tags: ["Tag one", "Tag two", "Tag three"],
    },
    {
      image: "https://worktheater.com/wp-content/uploads/2023/04/tcs-business-model.png.webp",
      title: "TCS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      tags: ["Tag one", "Tag two", "Tag three"],
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">Explore Jobs</h2>
        <p className="text-gray-600">Discover the job related to your field.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border"
          >

            {/* <img src={job.image} className="w-full h-36"/> */}

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-500 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobGrid;
