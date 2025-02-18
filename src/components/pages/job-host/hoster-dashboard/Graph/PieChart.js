import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Cookies from 'js-cookie';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ jobs }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasJobs, setHasJobs] = useState(false);

  const defaultPieData = {
    labels: ['Software Development', 'Data Science', 'Product Management', 'Design'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: [
        'hsla(210, 70%, 50%, 0.8)',
        'hsla(280, 70%, 50%, 0.8)',
        'hsla(150, 70%, 50%, 0.8)',
        'hsla(45, 70%, 50%, 0.8)'
      ],
      borderColor: 'white',
      borderWidth: 2,
    }]
  };

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setHasJobs(true);
      fetchAllCompaniesData();
    } else {
      setHasJobs(false);
      setChartData([]);
    }
  }, [jobs]);

  const fetchAllCompaniesData = async () => {
    setIsLoading(true);
    try {
      const jobTotals = {};
      
      await Promise.all(
        jobs.map(async (job) => {
          const response = await fetch(`https://jobquick.onrender.com/applicants/graph/${job._id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` },
          });
          const result = await response.json();
          const applicants = result.data ? 
            result.data.reduce((sum, day) => sum + day.applicants, 0) : 0;
          
          jobTotals[job.title] = (jobTotals[job.title] || 0) + applicants;
        })
      );

      const data = Object.entries(jobTotals).map(([job, total]) => ({
        name: job,
        applicants: total
      }));

      setChartData(data);
    } catch (error) {
      console.error("Error fetching jobs data:", error);
    } finally {
      setIsLoading(false);
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

  const pieChartData = hasJobs ? {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.applicants),
        backgroundColor: generateColors(chartData.length),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  } : defaultPieData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return hasJobs 
              ? `${value} Applicants (${percentage}%)`
              : `${value} Sample Units (${percentage}%)`;
          }
        }
      },
    },
  };

  const totalApplicants = chartData.reduce((sum, item) => sum + item.applicants, 0);

  return (
    <div className="w-full bg-white rounded-xl lg:p-2 h-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-lg font-semibold text-gray-800">
            {hasJobs ? "Job Applications Distribution" : "Sample Distribution Overview"}
          </h2>
        </div>

        <div className="w-full h-[280px]">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center space-y-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <Pie data={pieChartData} options={options} />
          )}
        </div>

        {hasJobs && chartData.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Applicants</p>
              <p className="text-xl font-semibold text-blue-600">
                {totalApplicants}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Jobs Listed</p>
              <p className="text-xl font-semibold text-green-600">
                {chartData.length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Average/Job</p>
              <p className="text-xl font-semibold text-purple-600">
                {(totalApplicants / chartData.length).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-[12px] sm:text-sm text-gray-600">Most Applied Job</p>
              <p className="text-md font-semibold text-orange-600">
                {chartData.reduce((max, item) => 
                  item.applicants > max.applicants ? item : max
                ).name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;