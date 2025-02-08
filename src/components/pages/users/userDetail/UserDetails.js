import React, { useState, useEffect } from "react";
import HeroSl from "../../../../assets/slider71.png";
import HeroS2 from "../../../../assets/slider72.jpg";
import HeroS3 from "../../../../assets/slider73.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../common/header/Header";
import Footer from "../../../common/footer/Footer";

const UserDetails = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fullName, setfullName] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [city, setcity] = useState("");
  const [eduDegree, seteduDegree] = useState("");
  const [eduInstitution, seteduInstitution] = useState("");
  const [eduSpecialisation, seteduSpecialisation] = useState("");
  const [eduStartYear, seteduStartYear] = useState("");
  const [eduEndYear, seteduEndYear] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [gender, setgender] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [skills, setskills] = useState([]);
  const [expCompany, setexpCompany] = useState("");
  const [expPosition, setexpPosition] = useState("");
  const [expStartYear, setexpStartYear] = useState("");
  const [expEndYear, setexpEndYear] = useState("");
  const [summary, setsummary] = useState("");
  const [projectUrl, setprojectUrl] = useState("");
  const [resume, setresume] = useState(null);

  const SeekId = Cookies.get("Id");
  const SeekToken = Cookies.get("Token");
  const SeekApi = `https://jobquick.onrender.com/seekuser/update/${SeekId}`;
  const userDetailApi = `https://jobquick.onrender.com/seekuser/${SeekId}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(userDetailApi, {
          headers: { Authorization: `Bearer ${SeekToken}` },
        });

        const userData = response.data;
        setfullName(userData.fullName || "");
        setprofileImg(userData.profileImg || "");
        setcity(userData.city || "");
        seteduDegree(userData.eduDegree || "");
        seteduInstitution(userData.eduInstitution || "");
        seteduSpecialisation(userData.eduSpecialisation || "");
        seteduStartYear(userData.eduStartYear || "");
        seteduEndYear(userData.eduEndYear || "");
        setaddress(userData.address || "");
        setpincode(userData.pincode || "");
        setstate(userData.state || "");
        setcountry(userData.country || "");
        setgender(userData.gender || "");
        setphoneNumber(userData.phoneNumber || "");
        setdateOfBirth(userData.dateOfBirth || "");
        setskills(userData.skills || []);
        setexpCompany(userData.expCompany || "");
        setexpPosition(userData.expPosition || "");
        setexpStartYear(userData.expStartYear || "");
        setexpEndYear(userData.expEndYear || "");
        setsummary(userData.summary || "");
        setprojectUrl(userData.projectUrl || "");
        setresume(userData.resume || null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [SeekId, SeekToken, userDetailApi]);

  if (loading) {
    return (
      <p className="text-center mt-5 text-5xl text-pink-500 font-semibold">
        Loading...
      </p>
    );
  }

  const handleSeekData = (e) => {
    e.preventDefault();
    const update = {
      fullName: fullName,
      profileImg: profileImg,
      city: city,
      eduDegree: eduDegree,
      eduInstitution: eduInstitution,
      eduSpecialisation: eduSpecialisation,
      eduStartYear: eduStartYear,
      eduEndYear: eduEndYear,
      eduAddress: address,
      pincode: pincode,
      state: state,
      country: country,
      gender: gender,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      skills: skills,
      expCompany: expCompany,
      expPosition: expPosition,
      expStartYear: expStartYear,
      expEndYear: expEndYear,
      summary: summary,
      projectUrl: projectUrl,
      resume: resume,
      address: address,
    };

    fetch(SeekApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SeekToken}`,
      },
      body: JSON.stringify(update),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data updated successfully");
          navigate("/user-profile");
        } else {
          console.error("Error updating data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const renderuserDetailForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Detials
        </h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            name="profileImg"
            accept="profileImg/*"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Github Link
            </label>
            <input
              type="url"
              name="projectUrl"
              value={projectUrl}
              onChange={(e) => setprojectUrl(e.target.value)}
              placeholder="Enter your github link for projects"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </>
  );

  // const renderuserAboutForm = () => (
  //   <>
  //     <div className="space-y-6">
  //       <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
  //         About yourself
  //       </h2>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Summary
  //         </label>
  //         <input
  //           type="text"
  //           name="summary"
  //           value={summary}
  //           onChange={(e) => setsummary(e.target.value)}
  //           rows="5"
  //           placeholder="Enter your Address"
  //           className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //         />
  //       </div>

  //       <div className="flex-1">
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Github Link
  //         </label>
  //         <input
  //           type="url"
  //           name="projectUrl"
  //           value={projectUrl}
  //           onChange={(e) => setprojectUrl(e.target.value)}
  //           placeholder="Enter your github link for projects"
  //           className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //         />
  //       </div>

  //       <div className="flex-1">
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Upload Resume
  //         </label>
  //         <input
  //           type="file"
  //           name="resume"
  //           accept="resume/*"
  //           className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
  //         />
  //       </div>

  //       <div className="flex justify-between">
  //         <button
  //           type="button"
  //           onClick={handlePrevious}
  //           className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
  //         >
  //           Previous
  //         </button>

  //         <button
  //           type="button"
  //           onClick={handleNext}
  //           className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );

  const renderuserAddressForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Location
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter your Address"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              placeholder="Enter your city"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PinCode
            </label>
            <input
              type="text"
              name="pincode"
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
              placeholder="Enter your pincode"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            placeholder="Enter your country"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            placeholder="Enter your state"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderuserEducationForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Education
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree
          </label>
          <input
            type="text"
            name="eduDegree"
            value={eduDegree}
            onChange={(e) => seteduDegree(e.target.value)}
            placeholder="Enter the degree"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <input
            type="text"
            name="eduInstitution"
            value={eduInstitution}
            onChange={(e) => seteduInstitution(e.target.value)}
            placeholder="Enter the name of your university"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialisation
          </label>
          <input
            type="text"
            name="eduSpecialisation"
            value={eduSpecialisation}
            onChange={(e) => seteduSpecialisation(e.target.value)}
            placeholder="Enter the field"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Year
            </label>
            <input
              type="date"
              name="eduStartYear"
              value={eduStartYear}
              onChange={(e) => seteduStartYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ending Year
            </label>
            <input
              type="date"
              name="eduEndYear"
              value={eduEndYear}
              onChange={(e) => seteduEndYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
  const renderuserExperienceForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Work Experience and Skills
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="expCompany"
            value={expCompany}
            onChange={(e) => setexpCompany(e.target.value)}
            placeholder="Enter the company name"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            name="expPosition"
            value={expPosition}
            onChange={(e) => setexpPosition(e.target.value)}
            placeholder="Enter the position you have been working"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="expStartYear"
              value={expStartYear}
              onChange={(e) => setexpStartYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="expEndYear"
              value={expEndYear}
              onChange={(e) => setexpEndYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <div className="relative">
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => setskills(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Type a skill and press Enter or comma to add"
            />
            <div className="mt-2 text-xs text-gray-500">
              Press Enter or comma (,) to add a skill
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:space-x-10 space-y-6 lg:space-y-0">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            className="w-full sm:w-4/5"
          >
            <SwiperSlide>
              <img
                src={HeroSl}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS2}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS3}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-lg sm:p-6 p-4">
            <form onSubmit={handleSeekData}>
              {step === 1 && renderuserDetailForm()}
              {/* {step === 2 && renderuserAboutForm()} */}
              {step === 2 && renderuserAddressForm()}
              {step === 3 && renderuserEducationForm()}
              {step === 4 && renderuserExperienceForm()}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;
