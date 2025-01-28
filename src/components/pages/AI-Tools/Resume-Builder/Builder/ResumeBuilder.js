import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    major: "",
    graduationYear: "",
  });

  const [currentWork, setCurrentWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const generatePDF = () => {
    if (!personalInfo.fullName) {
      alert("Please enter your full name before generating the resume.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Refined Color Palette
    const colors = {
      primary: [34, 49, 63], // Charcoal Blue (Darker, more professional)
      accent: [48, 213, 200], // Soft Aqua (Adds freshness and vibrancy)
      text: {
        dark: [40, 40, 40], // Dark Gray (Readable, soft on the eyes)
        light: [255, 255, 255], // White (For header, buttons, and highlighted text)
      },
      background: {
        main: [255, 255, 255], // White (Clean, minimal look for readability)
        section: [245, 245, 245], // Light Gray (Subtle contrast for sections)
      },
    };

    let yPos = 20;

    const drawPageBackground = () => {
      doc.setFillColor(...colors.background.main);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.1);
      for (let i = 0; i < pageWidth; i += 5) {
        for (let j = 0; j < pageHeight; j += 5) {
          if (Math.random() > 0.9) {
            doc.line(i, j, i + 1, j + 1);
          }
        }
      }
    };

    const drawHeader = () => {
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 50, 'F');

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(0, 50, pageWidth, 50);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...colors.text.light);
      doc.text(personalInfo.fullName.toUpperCase(), pageWidth / 2, 30, { align: "center" });

      doc.setFontSize(10);
      doc.text(
        `${personalInfo.email || ""} | ${personalInfo.phone || ""} | ${personalInfo.location || ""}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );

      yPos = 60;
    };

    const drawSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...colors.primary);

      doc.text(title.toUpperCase(), 20, yPos);
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.7);
      doc.line(20, yPos + 3, 120, yPos + 3);

      yPos += 15;
    };

    const drawProfessionalSection = (title, items, formatter) => {
      drawSectionTitle(title);

      items.forEach((item, index) => {
        doc.setFillColor(...(index % 2 === 0 ? colors.background.section : [255, 255, 255]));
        doc.rect(20, yPos - 2, pageWidth - 40, 12, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...colors.text.dark);

        doc.text("•", 22, yPos + 6);
        doc.text(formatter(item), 35, yPos + 6);

        yPos += 12;
      });

      yPos += 10;
    };

    const renderSkills = () => {
      drawSectionTitle("Skills");

      const skillsPerLine = 4;
      skills.forEach((skill, index) => {
        if (index % skillsPerLine === 0) {
          yPos += (index > 0 ? 12 : 0);
        }

        const xPosition = 20 + (index % skillsPerLine) * 45;

        doc.setFillColor(...colors.accent);
        doc.setTextColor(...colors.text.light);

        doc.roundedRect(xPosition, yPos, 40, 8, 2, 2, 'F');
        doc.setFontSize(9);
        doc.text(skill, xPosition + 20, yPos + 6, { align: 'center' });
      });

      yPos += 20;
    };

    const drawSections = () => {
      drawSectionTitle("Professional Summary");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...colors.text.dark);
      doc.text(doc.splitTextToSize(personalInfo.summary || "No summary provided", pageWidth - 40), 20, yPos);

      yPos += 30;

      drawProfessionalSection("Education", education, (edu) =>
        `${edu.school} - ${edu.degree} in ${edu.major} (${edu.graduationYear})`
      );

      drawProfessionalSection("Work Experience", workExperience, (work) =>
        `${work.company} | ${work.position} (${work.startDate} - ${work.endDate})`
      );

      renderSkills();
    };

    drawPageBackground();
    drawHeader();
    drawSections();

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Professional Resume | Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save(`${personalInfo.fullName}_Professional_Resume.pdf`);
  };

  const addEducation = () => {
    if (currentEducation.school || currentEducation.degree || currentEducation.major || currentEducation.graduationYear) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({ school: "", degree: "", major: "", graduationYear: "" });
    } else {
      alert("Please enter at least one education detail.");
    }
  };

  const addWorkExperience = () => {
    if (currentWork.company || currentWork.position || currentWork.startDate || currentWork.endDate || currentWork.description) {
      setWorkExperience([...workExperience, currentWork]);
      setCurrentWork({ company: "", position: "", startDate: "", endDate: "", description: "" });
    } else {
      alert("Please enter at least one work experience detail.");
    }
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    } else {
      alert("Please enter a skill.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Resume Builder</h1>

      <div className="space-y-6">
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Personal Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                className="w-full p-3 border-2 outline-none border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                Professional Summary
              </label>
              <textarea
                id="summary"
                placeholder="Professional Summary"
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <img src="https://img.freepik.com/free-vector/employees-cv-candidates-resume-corporate-workers-students-id-isolate-flat-design-element-job-applications-avatars-personal-information-concept-illustration_335657-1661.jpg?semt=ais_incoming" className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full" />
        </div>

        {/* Education Section */}
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Education</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
                School
              </label>
              <input
                type="text"
                id="school"
                placeholder="School"
                value={currentEducation.school}
                onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degree">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                placeholder="Degree"
                value={currentEducation.degree}
                onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">
                Major
              </label>
              <input
                type="text"
                id="major"
                placeholder="Major"
                value={currentEducation.major}
                onChange={(e) => setCurrentEducation({ ...currentEducation, major: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="graduationYear">
                Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                placeholder="Graduation Year"
                value={currentEducation.graduationYear}
                onChange={(e) => setCurrentEducation({ ...currentEducation, graduationYear: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={addEducation}
              className="bg-blue-500 text-white p-3 rounded-md w-full"
            >
              Add Education
            </button>

            {/* Display Added Education */}
            {education.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Education:</h3>
                {education.map((edu, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
                    {edu.school} - {edu.degree} in {edu.major} ({edu.graduationYear})
                  </div>
                ))}
              </div>
            )}
          </div>
          <img src="https://img.freepik.com/free-vector/teacher-concept-illustration_114360-2166.jpg" className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full" />
        </div>

        {/* Work Experience Section */}
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Work Experience</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                Company
              </label>
              <input
                type="text"
                id="company"
                placeholder="Company"
                value={currentWork.company}
                onChange={(e) => setCurrentWork({ ...currentWork, company: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                placeholder="Position"
                value={currentWork.position}
                onChange={(e) => setCurrentWork({ ...currentWork, position: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={currentWork.startDate}
                onChange={(e) => setCurrentWork({ ...currentWork, startDate: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={currentWork.endDate}
                onChange={(e) => setCurrentWork({ ...currentWork, endDate: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                value={currentWork.description}
                onChange={(e) => setCurrentWork({ ...currentWork, description: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={addWorkExperience}
              className="bg-blue-500 text-white p-3 rounded-md w-full"
            >
              Add Work Experience
            </button>

            {/* Display Added Work Experiences */}
            {workExperience.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Work Experiences:</h3>
                {workExperience.map((work, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
                    {work.company} - {work.position} ({work.startDate} - {work.endDate})
                  </div>
                ))}
              </div>
            )}
          </div>
          <img src="https://img.freepik.com/premium-vector/businessman-with-many-arms-sitting-computer-office-doing-many-tasks-same-time-freelance-worker-multitasking-skills-effective-time-management-productivity-concept_458444-1248.jpg" className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full" />
        </div>

        {/* Skills Section */}
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-1/2 xl:w-1/2 md:w-1/2 sm:w-full xs:w-full bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Skills</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
                Enter a skill
              </label>
              <input
                type="text"
                id="skill"
                placeholder="Enter a skill"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={addSkill}
              className="bg-blue-500 text-white p-3 rounded-md w-full"
            >
              Add Skill
            </button>

            {/* Display Added Skills */}
            {skills.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold">Added Skills:</h3>
                <div className="flex flex-wrap">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-md mr-2 mb-2">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={generatePDF}
          className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-4 font-bold text-2xl rounded-lg w-full"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;