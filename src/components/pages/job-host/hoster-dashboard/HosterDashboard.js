import React from "react";

import {
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  Bookmark,
  Users,
  Circle,
  BriefcaseBusiness,
} from "lucide-react";

const HosterDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <BriefcaseBusiness className="w-6 h-6 text-teal-500" />
          <span className="ml-2 text-2xl font-bold text-teal-700">
            Job Qucik
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="ml-3">
            <div className="font-medium">john singh</div>
            <div className="w-2 h-2 bg-teal-500 rounded-full" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 p-3 bg-teal-700 text-white rounded-lg">
              <Users className="w-5 h-5" />
              <span>Dashboard</span>
            </div>

            {[
              { icon: <User className="w-5 h-5" />, label: "My Profile" },
              { icon: <Briefcase className="w-5 h-5" />, label: "My Jobs" },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                label: "Messages",
              },
              { icon: <FileText className="w-5 h-5" />, label: "Submit Job" },
              {
                icon: <Bookmark className="w-5 h-5" />,
                label: "Save Candidate",
              },
              //   { icon: <Users className="w-5 h-5" />, label: "Membership" },
              //   {
              //     icon: <Settings className="w-5 h-5" />,
              //     label: "Account Settings",
              //   },
              //   { icon: <Circle className="w-5 h-5" />, label: "Delete Account" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Profile Progress */}
        <div className="mt-auto">
          <div className="mb-4">
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full w-[87%] bg-teal-500 rounded-full" />
            </div>
            <div className="mt-1 text-sm text-gray-500">Profile Complete</div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors">
              Post a Job
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              number: "07",
              label: "Posted Job",
              icon: <User className="w-6 h-6 text-teal-600" />,
            },
            {
              number: "03",
              label: "Shortlisted",
              icon: <Bookmark className="w-6 h-6 text-teal-600" />,
            },
            {
              number: "1.7k",
              label: "Application",
              icon: <Search className="w-6 h-6 text-teal-600" />,
            },
            {
              number: "04",
              label: "Save Candidate",
              icon: <FileText className="w-6 h-6 text-teal-600" />,
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.number}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Posted Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Posted Job
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Web & Mobile Prototype",
                  type: "Fulltime",
                  location: "Spain",
                  logo: "A",
                },
                {
                  title: "Document Writer",
                  type: "Part-time",
                  location: "Italy",
                  logo: "B",
                },
                {
                  title: "Outbound Call Service",
                  type: "Fulltime",
                  location: "USA",
                  logo: "C",
                },
                {
                  title: "Product Designer",
                  type: "Part-time",
                  location: "Dubai",
                  logo: "D",
                },
                {
                  title: "Marketing Specialist",
                  type: "Part-time",
                  location: "UK",
                  logo: "E",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      {job.logo}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.type} · {job.location}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    •••
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterDashboard;
