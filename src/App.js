import React from 'react';
import Signup from './components/auth/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/pages/home/Home';
import Blog from './components/pages/Blogs/Blog';
import FilterPage from './components/pages/categories/FilterPage';
import Contact from './components/pages/contact/Contact';
import ATS from './components/pages/AI-Tools/ATS/ATS';
import ResumePage from './components/pages/AI-Tools/Resume-Builder/ResumePage';
import Salaries from './components/pages/Salaries/Salaries';
import UserDetails from './components/pages/users/userDetail/UserDetails';
import NotFound from './components/pages/notFound/NotFound';
import JobPosting from './components/pages/job-host/job-post/JobPosting';
import HosterDetail from './components/pages/job-host/hoster-detail/HosterDetail';
import HosterProfile from './components/pages/job-host/hoster-detail/hoster-profile/HosterProfile';
import HosterLogin from './components/auth/hoster-auth/HosterLogin';
import HosterSignup from './components/auth/hoster-auth/HosterSignup';
import HosterDashboard from './components/pages/job-host/hoster-dashboard/HosterDashboard';
import ProfilePage from './components/pages/users/profilePage/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute'
import MyJob from './components/pages/job-host/hoster-dashboard/myJob/MyJob';
import JobDetails from './components/pages/categories/filtering/jobDetails/JobDetails';
import ViewApplicant from './components/pages/job-host/hoster-dashboard/view-Applicant/ViewApplicant';
import Applicant from './components/pages/job-host/hoster-dashboard/view-Applicant/Applicant-Details/Applicant';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/host-login' element={<HosterLogin />} />
          <Route path='/host-signup' element={<HosterSignup />} />
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/salary' element={<Salaries />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<NotFound />} />

          {/* Protected Routes */}
          <Route
            path='/alljobs'
            element={
              <ProtectedRoute>
                <FilterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/resbuild'
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/atschk'
            element={
              <ProtectedRoute>
                <ATS />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-detail'
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/jobpost'
            element={
              <ProtectedRoute>
                <JobPosting />
              </ProtectedRoute>
            }
          />
          <Route
            path='/host-detail'
            element={
              <ProtectedRoute>
                <HosterDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path='/host-profile'
            element={
              <ProtectedRoute>
                <HosterProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/host-dashboard'
            element={
              <ProtectedRoute>
                <HosterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
          path='/host-jobs'
          element={
            <ProtectedRoute>
              <MyJob/>
            </ProtectedRoute>
          }
          />
          <Route
          path='/job-detials/:id'
          element={
            <ProtectedRoute>
              <JobDetails/>
            </ProtectedRoute>
            }
            />
            <Route
            path='/job/:id/applicants'
            element={
              <ViewApplicant/>
              }
              />
              <Route
              path='/applicant/:id'
              element={
                <ProtectedRoute>
                  <Applicant/>
                </ProtectedRoute>
                }
                />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
