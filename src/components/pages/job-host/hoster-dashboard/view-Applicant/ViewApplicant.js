import React, { useEffect, useState } from 'react';
import { Mail, User, Briefcase, GraduationCap, MapPin, Star } from 'lucide-react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const ViewApplicant = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants?jobId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          const applicantDetails = data
            .map((application) => application.applicantId)
            .filter((applicant) => applicant !== null && applicant !== undefined);

          setApplicants(applicantDetails);
        } else {
          setApplicants([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplicants();
    }
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-teal-700">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-2xl text-red-500 mb-4">
            {error}
          </p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-5">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <User className="w-8 h-8" />
              Job Applicants
            </h2>
          </div>

          <div className="p-6">
            {applicants.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No applicants yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {applicants.map((applicant) => (
                  <div 
                    key={applicant?._id} 
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <User className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-semibold text-gray-900 text-lg">{applicant?.fullName || "N/A"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-teal-600" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium text-gray-900 truncate">{applicant?.email || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-teal-600" />
                          <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="font-medium text-gray-900">{applicant?.city || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-500">Skills</p>
                          <p className="font-medium text-gray-900">{applicant?.skills?.join(', ') || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-500">Education</p>
                          <p className="font-medium text-gray-900">
                            {applicant?.eduDegree ? `${applicant.eduDegree} - ${applicant.eduSpecialisation}` : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="font-medium text-gray-900">
                            {applicant?.expPosition ? `${applicant.expPosition} at ${applicant.expCompany}` : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;