import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ jobs, applicantsData }) => {
  const [chartData, setChartData] = useState([]);
  const [hasApplicants, setHasApplicants] = useState(false);

  useEffect(() => {
    if (jobs && jobs.length > 0 && Object.keys(applicantsData).length > 0) {
      processChartData();
    } else {
      setChartData([]);
      setHasApplicants(false);
    }
  }, [jobs, applicantsData]);

  const processChartData = () => {
    const jobTotals = {};
    let totalApplicantsCount = 0;

    jobs.forEach((job) => {
      const jobData = applicantsData[job._id] || [];
      const applicants = jobData.reduce((sum, day) => sum + day.applicants, 0);

      if (applicants > 0) {
        jobTotals[job.title] = (jobTotals[job.title] || 0) + applicants;
        totalApplicantsCount += applicants;
      }
    });
    setHasApplicants(totalApplicantsCount > 0);

    const data = Object.entries(jobTotals).map(([job, total]) => ({
      name: job,
      applicants: total,
    }));

    setChartData(data);
  };

  const fetchAllCompaniesData = async () => {
    try {
      const jobTotals = {};
      let totalApplicantsCount = 0;

      await Promise.all(
        jobs.map(async (job) => {
          const response = await fetch(
            `https://jobquick.onrender.com/applicants/graph/${job._id}`,
            {
              headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` },
            }
          );
          const result = await response.json();
          const applicants = result.data
            ? result.data.reduce((sum, day) => sum + day.applicants, 0)
            : 0;

          if (applicants > 0) {
            jobTotals[job.title] = (jobTotals[job.title] || 0) + applicants;
            totalApplicantsCount += applicants;
          }
        })
      );

      // Only set chart data if there are any applicants
      setHasApplicants(totalApplicantsCount > 0);

      const data = Object.entries(jobTotals).map(([job, total]) => ({
        name: job,
        applicants: total,
      }));

      setChartData(data);
    } catch (error) {
      console.error("Error fetching jobs data:", error);
    }
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
    }
    return colors;
  };

  const pieChartData = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        data: chartData.map((item) => item.applicants),
        backgroundColor: generateColors(chartData.length),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "600",
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} Applicants (${percentage}%)`;
          },
        },
      },
    },
  };

  const totalApplicants = chartData.reduce(
    (sum, item) => sum + item.applicants,
    0
  );

  if (!hasApplicants) {
    return (
      <div className="w-full p-3 sm:p-4 lg:p-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-2 md:mb-4 text-center sm:text-left">
          Job Applications Distribution
        </h2>
        <div className="flex justify-center items-center h-48 sm:h-56 md:h-64">
          <p className="text-gray-500 text-center">
            No applications received for any jobs yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-3 sm:p-4 lg:p-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-2 md:mb-4 text-center sm:text-left">
        Job Applications Distribution
      </h2>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 lg:mb-0">
          <div className="w-full h-48 sm:h-56 md:h-64">
            <Pie data={pieChartData} options={options} />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col px-2 sm:px-4">
          <div
            className="h-auto lg:h-[200px] overflow-y-scroll -ms-overflow-style-none"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-2 lg:mt-8">
              {pieChartData.labels.map((label, index) => (
                <div
                  key={label}
                  className="flex items-center p-1 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2 flex-shrink-0"
                    style={{
                      backgroundColor:
                        pieChartData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-xs md:text-sm text-gray-700 truncate">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm hover:shadow-md">
            <p className="text-xs sm:text-sm text-purple-700 font-medium">
              Average/Job
            </p>
            <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-600">
              {chartData.length > 0
                ? (totalApplicants / chartData.length).toFixed(1)
                : "0"}
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm hover:shadow-md">
            <p className="text-xs sm:text-sm text-orange-700 font-medium">
              Most Applied
            </p>
            <p className="text-xs sm:text-sm md:text-base font-bold text-orange-600 truncate">
              {chartData.length > 0
                ? chartData.reduce((max, item) =>
                    item.applicants > max.applicants ? item : max
                  ).name
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
