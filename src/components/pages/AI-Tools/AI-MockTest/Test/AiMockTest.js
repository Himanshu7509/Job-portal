
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">AI Mock Test</h2>

                <select
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => setSelectedCategory(categories.find(cat => cat._id === e.target.value))}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.title}</option>
                    ))}
                </select>

                {selectedCategory && (
                    <select
                        className="w-full p-2 border rounded mb-4"
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                    >
                        <option value="">Select Subcategory</option>
                        {selectedCategory.subcategories.map((sub, index) => (
                            <option key={index} value={sub.title}>{sub.title}</option>
                        ))}
                    </select>
                )}

                {selectedSubcategory && (
                    <button 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        onClick={handleStartTest}
                    >
                        Start Test
                    </button>
                )}
            </div>
        </div>
    );
};

export default AiMockTest;

