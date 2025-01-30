import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  LogOut,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  Bookmark,
  Users,
  BriefcaseBusiness,
} from "lucide-react";


const JobHostingDashboard = () => {

  return (

    <>
    
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      <div className="w-full md:w-64 bg-white p-6 flex flex-col shadow-sm">
        <Link to='/'>
        <div className="flex items-center mb-8">
          <span className="ml-4 text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Job Quick
          </span>
        </div>
        </Link>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200"/>
          <div className="ml-3">
            <div className="font-medium"> john William </div>
          </div>
        </div>

        <nav className="flex-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 p-3 bg-pink-700 text-white rounded-lg">
              <Users className="w-5 h-5" />
              <span>Dashboard</span>
            </div>

            {[
              { icon: <User className="w-5 h-5" />, label: "My Profile" },
              { icon: <Briefcase className="w-5 h-5" />, label: "My Jobs" },
              { icon: <MessageSquare className="w-5 h-5" />, label: "Candidates" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        <div className="mt-auto">
         
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span className="hover:text-red-600">Logout</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8">

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Dashboard</h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
          
            <Link to='/jobpost'>
            <button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold">
              Post a Job
            </button>
            </Link>  
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { number: "07", label: "Posted Job", icon: <User className="w-6 h-6 text-pink-600" /> },
            { number: "03", label: "Shortlisted", icon: <Bookmark className="w-6 h-6 text-pink-600" /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Posted Job</h2>
            <div className="space-y-4">
              {[{ title: "Web & Mobile Prototype", type: "Fulltime", location: "Spain", logo: "A" },
                { title: "Document Writer", type: "Part-time", location: "Italy", logo: "B" },
                { title: "Outbound Call Service", type: "Fulltime", location: "USA", logo: "C" },
                { title: "Product Designer", type: "Part-time", location: "Dubai", logo: "D" },
                { title: "Marketing Specialist", type: "Part-time", location: "UK", logo: "E" }].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">{job.logo}</div>
                    <div>
                      <div className="font-medium text-gray-800">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.type} · {job.location}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">•••</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    
    </>


  );
};

export default JobHostingDashboard;