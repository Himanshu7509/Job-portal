import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Search, ChevronDown } from "lucide-react";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasRealData, setHasRealData] = useState(false);

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");
  const dashboardTableApi = `https://jobquick.onrender.com/job/table/${HostId}`;

  const sampleApplications = [
    {
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      company: 'TechCorp',
      position: 'Frontend Developer',
      type: 'Full-time',
      contact: '+1 (555) 000-0000',
      status: 'Shortlisted',
      applicantName: 'John Smith',
      logo: 'blue'
    },
    {
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      company: 'DataSystems',
      position: 'Data Analyst',
      type: 'Remote',
      contact: '+1 (555) 000-0001',
      status: 'Under Review',
      applicantName: 'Emma Wilson',
      logo: 'purple'
    },
    {
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      company: 'DesignHub',
      position: 'UI/UX Designer',
      type: 'Part-time',
      contact: '+1 (555) 000-0002',
      status: 'Shortlisted',
      applicantName: 'Michael Brown',
      logo: 'emerald'
    }
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(dashboardTableApi, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${HostToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (data.success && Array.isArray(data.applicants) && data.applicants.length > 0) {
          const formattedApplications = data.applicants.map(app => ({
            date: new Date(app.dateApplied).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            company: app.jobId.companyName,
            position: app.jobId.title,
            type: app.jobId.jobType,
            contact: app.applicantId.phoneNumber,
            status: app.shortListed ? 'Shortlisted' : 'Under Review',
            applicantName: app.applicantId.fullName,
            logo: ['blue', 'purple', 'indigo', 'emerald', 'amber', 'teal', 'rose', 'cyan'][
              Math.floor(Math.random() * 8)
            ]
          }));
          
          setApplications(formattedApplications);
          setHasRealData(true);
        } else {
          // If no real data, set sample data
          setApplications(sampleApplications);
          setHasRealData(false);
        }
      } catch (err) {
        // In case of any error, fallback to sample data
        console.error('Error fetching data:', err);
        setApplications(sampleApplications);
        setHasRealData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [dashboardTableApi, HostToken]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const LogoIcon = ({ color, company }) => {
    const getLogoColor = (color) => {
      const colors = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        indigo: 'bg-indigo-500',
        emerald: 'bg-emerald-500',
        amber: 'bg-amber-500',
        teal: 'bg-teal-500',
        rose: 'bg-rose-500',
        cyan: 'bg-cyan-500'
      };
      return colors[color] || 'bg-gray-500';
    };

    return (
      <div className={`w-10 h-10 rounded-xl ${getLogoColor(color)} flex items-center justify-center shadow-sm`}>
        <span className="text-white font-semibold text-lg">
          {company.charAt(0)}
        </span>
      </div>
    );
  };

  const filteredApplications = applications.filter(app =>
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Job Applications</h2>
              {!hasRealData && (
                <p className="text-sm text-gray-500 mt-1">Sample data shown. Your actual applications will appear here once you receive them.</p>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Date', 'Company', 'Applicant', 'Position', 'Job Type', 'Contact', 'Status'].map((header) => (
                  <th key={header} className="text-left py-4 px-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      {header}
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{app.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <LogoIcon color={app.logo} company={app.company} />
                      <div>
                        <span className="font-medium text-gray-900">{app.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{app.applicantName}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{app.position}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{app.type}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{app.contact}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplications;