import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const AiMockTest = () => {
    const CategoryApi = "https://jobquick.onrender.com/categories";
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = Cookies.get("Token");
                const response = await fetch(CategoryApi, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleStartTest = () => {
        if (selectedCategory && selectedSubcategory) {
            navigate(`/questions/${selectedCategory.title}/${selectedSubcategory}`);
        }
    };

    return (

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

    <div className="max-w-4xl mx-auto text-center my-8 md:my-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
        Prepare for Success with AI-Powered Testing
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
        Access personalized assessments designed to help you excel in your studies and career path
      </p>
    </div>

    <div className="max-w-7xl mx-auto mt-6">

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">


        <div className="hidden lg:block w-full lg:w-1/2">
            <div className="overflow-hidden rounded-2xl ">
            <img
                src='https://i.pinimg.com/736x/83/28/24/832824bc2d34803c747977a4e4207d0f.jpg'
                alt="AI Mock Test Platform"
                className="object-cover w-full"
            />
            </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center">
              AI Mock Test
            </h2>
            
            <p className="text-gray-700 text-center mb-6">
              Tailored assessments to measure and improve your skills
            </p>
            
            <div className="space-y-6">
            
        
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  Select Category
                </label>
                <select
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white/80 
                           shadow-inner text-gray-700 focus:ring-2 focus:ring-blue-400 
                           focus:border-transparent outline-none transition-all duration-300
                           hover:bg-white"
                  onChange={(e) => setSelectedCategory(categories.find(cat => cat._id === e.target.value))}
                  value={selectedCategory?._id || ""}
                >
                  <option value="">-- Choose a category --</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedCategory && (
                <div className="transition-all duration-300 animate-fadeIn">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    Select Subcategory
                  </label>
                  <select
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white/80 
                              shadow-inner text-gray-700 focus:ring-2 focus:ring-blue-400 
                              focus:border-transparent outline-none transition-all duration-300
                              hover:bg-white"
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    value={selectedSubcategory}
                  >
                    <option value="">-- Choose a subcategory --</option>
                    {selectedCategory.subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
          
              {selectedSubcategory && (
                <div className="mt-8 transition-all duration-300 animate-fadeIn">
                  <button
                    className="w-full bg-gradient-to-r from-pink-600 to-blue-600 text-white 
                            py-4 rounded-xl font-bold text-lg shadow-lg transform transition 
                            duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 
                            active:scale-[0.98] outline-none"
                    onClick={handleStartTest}
                  >
                    Start Your Test
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 text-center mt-6 text-sm">
              Select your preferred category and subcategory to begin the test.
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>

    );
};

export default AiMockTest;