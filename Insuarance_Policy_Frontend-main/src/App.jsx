// src/App.js
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from 'react';
import { Toaster } from "react-hot-toast";
// Components
import Header from './components/shared/Header';
import Loader from './components/shared/Loader';
import { useGetMyProfileQuery} from './redux/api/user'; 
import { useDispatch, useSelector } from 'react-redux';
import { userExist } from './redux/reducers/userReducer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// API slice
// import { claimApi } from './redux/api/claim';    

// Pages
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Notifications = lazy(() => import("./pages/Notifications"));  
const FarmerApplication = lazy(() => import("./pages/FarmerApplication"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const CreateClaim = lazy(() => import("./pages/CreateClaim")); // Import CreateClaim page
const MyClaims = lazy(() => import("./pages/MyClaims")); // Import MyClaims page  


// Admin Pages
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));
const AllInsu = lazy(() => import("./pages/Admin/AllInsu"));
const Applications = lazy(() => import("./pages/Admin/AdminApplications"));
const CreateIns = lazy(() => import("./pages/Admin/CreateIns"));
const Feedbacks = lazy(() => import("./pages/Admin/Feedbacks"));
const AdminApplicationDetails = lazy(() => import("./pages/Admin/AdminApplicationDetails"));   

// claims
const AdminViewClaims = lazy(() => import("./pages/Admin/AdminViewClaims"));

const App = () => {
  const { user, isLoading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { data } = useGetMyProfileQuery();
  
  useEffect(() => {
    if (data?.user) {
      dispatch(userExist(data.user));
    } else {
      dispatch(userExist(null));
    }
  }, [dispatch, data]);

  return (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        {
          !isLoading && (
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route element={<ProtectedRoute isAuthenticated={user} />}>
                <Route path='/profile' element={<Profile />} /> 
                <Route path='/notifications' element={<Notifications />} />  
                <Route path='/apply/:id' element={<FarmerApplication />} />
                <Route path='/my/application' element={<MyApplications />} />
                <Route path='/create-claim/:policyNumber' element={<CreateClaim />} /> {/* New Route for CreateClaim */}
                <Route path='/my-claims' element={<MyClaims />} /> {/* New Route for MyClaims */}     
              </Route>
              
              {/* Admin Pages */}
              <Route element={<ProtectedRoute isAuthenticated={user} adminOnly={true} isAdmin={user?.role === "admin"} />}>
                <Route path='/admin' element={<AdminHome />} />
                <Route path='/admin/insurance/new' element={<CreateIns />} />
                <Route path='/admin/insurance/view' element={<AllInsu />} />    
                <Route path='/admin/claims/view' element={<AdminViewClaims />} /> 
                <Route path='/admin/applications' element={<Applications />} />
                <Route path='/admin/application/:id' element={<AdminApplicationDetails />} />
                <Route path='/admin/feedbacks' element={<Feedbacks />} />      
              </Route>
            </Routes>
          )
        }
      </Suspense>
      <Toaster position='bottom-center' />
    </Router>
  );
}

export default App;


