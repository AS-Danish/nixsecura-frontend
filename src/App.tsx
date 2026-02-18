import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoutes";
import Loading from "./components/Loading";

const Index = lazy(() => import("./pages/Index"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const AllCourses = lazy(() => import("./pages/AllCourses"));
const AllWorkshops = lazy(() => import("./pages/AllWorkshops"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const WorkshopDetail = lazy(() => import("./pages/WorkshopDetail"));
const WorkshopRegister = lazy(() => import("./pages/WorkshopRegister"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/workshops" element={<AllWorkshops />} />
              <Route path="/workshop/:id" element={<WorkshopDetail />} />
              <Route path="/workshop/:id/register" element={<WorkshopRegister />} />
              <Route path="/blogs" element={<AllBlogs />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;