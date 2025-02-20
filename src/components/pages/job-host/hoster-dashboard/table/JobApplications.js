import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasRealData, setHasRealData] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    totalItems: 0,
    totalPages: 1,
  });

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");

  const sampleApplications = [
    {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        
      }),
      company: "---",
      position: "---",
      type: "---",
      contact: "---",
      status: "---",
      applicantName: "---",
      logo: "blue",
    },
    {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        
      }),
      company: "---",
      position: "---",
      type: "---",
      contact: "---",
      status: "---",
      applicantName: "---",
      logo: "purple",
    },
    
  ];

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const shortlisted =
        statusFilter === "shortlisted"
          ? true
          : statusFilter === "underReview"
          ? false
          : "";

      const dashboardTableApi = `https://jobquick.onrender.com/job/table/${HostId}?page=${page}${
        statusFilter !== "all" ? `&shortlisted=${shortlisted}` : ""
      }`;

      const response = await fetch(dashboardTableApi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${HostToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
 

      if (
        data.success &&
        Array.isArray(data.applicants) &&
        data.applicants.length > 0
      ) {
        const formattedApplications = data.applicants.map((app) => ({
          date: new Date(app.dateApplied).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          company: app.jobId.companyName,
          position: app.jobId.title,
          type: app.jobId.jobType,
          contact: app.applicantId.phoneNumber,
          status: app.shortListed ? "Shortlisted" : "Under Review",
          applicantName: app.applicantId.fullName,
          logo: [
            "blue",
            "purple",
            "indigo",
            "emerald",
            "amber",
            "teal",
            "rose",
            "cyan",
          ][Math.floor(Math.random() * 8)],
        }));

        setApplications(formattedApplications);
        setPagination(data.pagination);
        setHasRealData(true);
      } else {
        setApplications(sampleApplications);
        setHasRealData(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setApplications(sampleApplications);
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, [statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Under Review":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const LogoIcon = ({ color, company }) => {
    const getLogoColor = (color) => {
      const colors = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        indigo: "bg-indigo-500",
        emerald: "bg-emerald-500",
        amber: "bg-amber-500",
        teal: "bg-teal-500",
        rose: "bg-rose-500",
        cyan: "bg-cyan-500",
      };
      return colors[color] || "bg-gray-500";
    };

    return (
      <div
        className={`w-10 h-10 rounded-xl ${getLogoColor(
          color
        )} flex items-center justify-center shadow-sm`}
      >
        <span className="text-white font-semibold text-lg">
          {company.charAt(0)}
        </span>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    fetchApplications(newPage);
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={` inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasPrevPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={` ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasNextPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * 10 + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.currentPage * 10, pagination.totalItems)}
            </span>{" "}
            of <span className="font-medium">{pagination.totalItems}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasPrevPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(pagination.totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pagination.currentPage === idx + 1
                    ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Job Applications
              </h2>
              {!hasRealData && (
                <p className="text-sm text-gray-500 mt-1">
                  Your actual applications will appear here
                  once you receive them.
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Applications</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="underReview">Under Review</option>
              </select>
              <div className=" w-full sm:w-auto">
               
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Sr.No",
                  "Date",
                  "Company",
                  "Applicant",
                  "Position",
                  "Job Type",
                  "Contact",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left py-4 px-4 text-sm font-medium text-gray-600 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <LogoIcon color={app.logo} company={app.company} />
                      <div>
                        <span className="font-medium text-gray-900 lg:text-sm">
                          {app.company}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantName}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.position}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.type}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.contact}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No applications found matching your search.
              </p>
            </div>
          )}
        </div>

        {hasRealData && <PaginationControls />}
      </div>
    </div>
  );
};

export default JobApplications;
