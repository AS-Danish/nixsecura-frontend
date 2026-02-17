import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, GraduationCap, Calendar, Award,
  MessageSquare, Image, Users, LogOut, Menu, X, Plus,
  Edit, Trash2, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import { blogService, BlogInput } from "@/services/blogService";
import { BlogPost } from "@/data/blogs";
import { Course } from "@/data/courses";
import { courseService, CourseInput } from "@/services/courseService";
import { workshopService, Workshop, WorkshopInput } from "@/services/workshopService";
import { testimonialService, Testimonial, TestimonialInput } from "@/services/testimonialService";
import { facultyService, Faculty, FacultyInput } from "@/services/facultyService";
import { certificateService, Certificate, CertificateInput } from "@/services/certificateService";
import { galleryService, Gallery, GalleryInput } from "@/services/galleryService";
import { useAuth } from "@/context/AuthContext";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { dashboardService, DashboardStats } from "@/services/dashboardService";

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list',
  'link', 'image'
];


const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);

  // Modal states
  const [blogModal, setBlogModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: BlogPost }>({ open: false, mode: "add" });
  const [courseModal, setCourseModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Course }>({ open: false, mode: "add" });
  const [workshopModal, setWorkshopModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Workshop }>({ open: false, mode: "add" });
  const [testimonialModal, setTestimonialModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Testimonial }>({ open: false, mode: "add" });
  const [facultyModal, setFacultyModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Faculty }>({ open: false, mode: "add" });
  const [certificateModal, setCertificateModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Certificate }>({ open: false, mode: "add" });
  const [galleryModal, setGalleryModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: Gallery }>({ open: false, mode: "add" });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: "", id: "" });

  // Blog Form State
  const [blogForm, setBlogForm] = useState<BlogInput>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    published_at: "",
    tags: []
  });

  // Courses State (for listing and stats)
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll();
      setCourses(response.data);
    } catch (e: any) {
      console.error("Failed to fetch courses", e);
      setCourses([]); // Set empty array on error
      // Only show error if it's a real error (not 404 or network issue)
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch courses.", variant: "destructive" });
      }
    }
  };

  const fetchWorkshops = async () => {
    try {
      const data = await workshopService.getAll();
      setWorkshops(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Failed to fetch workshops", e);
      setWorkshops([]); // Set empty array on error
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch workshops.", variant: "destructive" });
      }
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getAll();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Failed to fetch testimonials", e);
      setTestimonials([]); // Set empty array on error
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch testimonials.", variant: "destructive" });
      }
    }
  };

  const fetchFaculty = async () => {
    try {
      const data = await facultyService.getAll();
      setFaculty(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Failed to fetch faculty", e);
      setFaculty([]); // Set empty array on error
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch faculty.", variant: "destructive" });
      }
    }
  };

  const fetchCertificates = async () => {
    try {
      const data = await certificateService.getAll();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Failed to fetch certificates", e);
      setCertificates([]); // Set empty array on error
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch certificates.", variant: "destructive" });
      }
    }
  };

  const fetchGallery = async () => {
    try {
      const data = await galleryService.getAll();
      setGallery(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Failed to fetch gallery", e);
      setGallery([]); // Set empty array on error
      // Only show error if it's a real error (not 404 or network issue)
      if (e?.response?.status && e?.response?.status !== 404 && e?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch gallery items.", variant: "destructive" });
      }
    }
  };

  const fetchStats = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch stats", e);
      toast({ title: "Error", description: "Failed to fetch dashboard stats.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case "blogs":
        if (blogs.length === 0) fetchBlogs();
        break;
      case "courses":
        if (courses.length === 0) fetchCourses();
        break;
      case "workshops":
        if (workshops.length === 0) fetchWorkshops();
        break;
      case "testimonials":
        if (testimonials.length === 0) fetchTestimonials();
        break;
      case "faculty":
        if (faculty.length === 0) fetchFaculty();
        break;
      case "certificates":
        if (certificates.length === 0) fetchCertificates();
        break;
      case "gallery":
        if (gallery.length === 0) fetchGallery();
        break;
    }
  }, [activeTab]);

  // Course Form State
  const [courseForm, setCourseForm] = useState<{
    title: string;
    category: string;
    duration: string;
    image: string;
    description: string;
    curriculum: string;
  }>({
    title: "",
    category: "Beginner",
    duration: "",
    image: "",
    description: "",
    curriculum: ""
  });

  // Workshop Form State
  const [workshopForm, setWorkshopForm] = useState<WorkshopInput>({
    title: "",
    description: "",
    images: [],
    date: new Date().toISOString().split('T')[0],
    start_time: "",
    end_time: "",
    location: "",
    max_participants: undefined,
    registrations: 0,
    status: "upcoming"
  });

  // Testimonial Form State
  const [testimonialForm, setTestimonialForm] = useState<TestimonialInput>({
    name: "",
    course: "",
    testimonial: "",
    image: "",
    position: "",
    company: "",
    is_featured: false
  });

  // Faculty Form State
  const [facultyForm, setFacultyForm] = useState<FacultyInput>({
    name: "",
    specialization: "",
    experience: "",
    image: "",
    qualifications: [],
    order: 0,
    is_active: true
  });

  // Certificate Form State
  const [certificateForm, setCertificateForm] = useState<CertificateInput>({
    title: "",
    issuer: "",
    year: new Date().getFullYear().toString(),
    order: 0
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState<GalleryInput>({
    title: "",
    category: "Facilities",
    image: "",
    order: 0,
    is_featured: false
  });



  useEffect(() => {
    const loadBlogData = async () => {
      if (blogModal.open && blogModal.mode === "edit" && blogModal.data) {
        // Set initial data from local state to avoid flicker
        setBlogForm({
          title: blogModal.data.title,
          excerpt: blogModal.data.excerpt,
          content: blogModal.data.content,
          image: blogModal.data.image,
          category: blogModal.data.category,
          published_at: blogModal.data.date,
          tags: blogModal.data.tags || []
        });

        try {
          // Fetch fresh data from server to ensure content is complete
          const freshData = await blogService.getById(blogModal.data.id);
          setBlogForm({
            title: freshData.title,
            excerpt: freshData.excerpt,
            content: freshData.content,
            image: freshData.image,
            category: freshData.category,
            published_at: freshData.date,
            tags: freshData.tags || []
          });
        } catch (error) {
          console.error("Failed to fetch blog details", error);
          toast({
            title: "Error",
            description: "Failed to load latest blog details",
            variant: "destructive",
          });
        }
      } else if (blogModal.open && blogModal.mode === "add") {
        // Don't clear image if it was just uploaded - preserve it
        setBlogForm(prev => ({
          title: "",
          excerpt: "",
          content: "",
          image: prev.image || "", // Keep image if it exists
          category: "Threats",
          published_at: new Date().toISOString().split('T')[0],
          tags: []
        }));
      }
    };
    loadBlogData();
  }, [blogModal.open, blogModal.mode]);

  useEffect(() => {
    if (courseModal.open && courseModal.mode === "edit" && courseModal.data) {
      setCourseForm({
        title: courseModal.data.title || "",
        category: courseModal.data.category || "",
        duration: courseModal.data.duration || "",
        image: courseModal.data.image || "",
        description: courseModal.data.description || "",
        curriculum: courseModal.data.curriculum
          ? courseModal.data.curriculum.map(c => c.module).join('\n')
          : ""
      });
    } else if (courseModal.open && courseModal.mode === "add") {
      setCourseForm({
        title: "",
        category: "Certification",
        duration: "",
        image: "",
        description: "",
        curriculum: ""
      });
    }
  }, [courseModal.open, courseModal.mode, courseModal.data]);

  useEffect(() => {
    if (workshopModal.open && workshopModal.mode === "edit" && workshopModal.data) {
      setWorkshopForm({
        title: workshopModal.data.title || "",
        description: workshopModal.data.description || "",
        images: workshopModal.data.images ? workshopModal.data.images.map(img => img.image_path) : [],
        date: workshopModal.data.date || new Date().toISOString().split('T')[0],
        start_time: workshopModal.data.start_time || "",
        end_time: workshopModal.data.end_time || "",
        location: workshopModal.data.location || "",
        max_participants: workshopModal.data.max_participants,
        registrations: workshopModal.data.registrations || 0,
        status: workshopModal.data.status || "upcoming"
      });
    } else if (workshopModal.open && workshopModal.mode === "add") {
      setWorkshopForm({
        title: "",
        description: "",
        images: [],
        date: new Date().toISOString().split('T')[0],
        start_time: "",
        end_time: "",
        location: "",
        max_participants: undefined,
        registrations: 0,
        status: "upcoming"
      });
    }
  }, [workshopModal.open, workshopModal.mode, workshopModal.data]);

  useEffect(() => {
    if (testimonialModal.open && testimonialModal.mode === "edit" && testimonialModal.data) {
      setTestimonialForm({
        name: testimonialModal.data.name || "",
        course: testimonialModal.data.course || "",
        testimonial: testimonialModal.data.testimonial || "",
        image: testimonialModal.data.image || "",
        position: testimonialModal.data.position || "",
        company: testimonialModal.data.company || "",
        is_featured: testimonialModal.data.is_featured || false
      });
    } else if (testimonialModal.open && testimonialModal.mode === "add") {
      setTestimonialForm({
        name: "",
        course: "",
        testimonial: "",
        image: "",
        position: "",
        company: "",
        is_featured: false
      });
    }
  }, [testimonialModal.open, testimonialModal.mode, testimonialModal.data]);

  useEffect(() => {
    if (facultyModal.open && facultyModal.mode === "edit" && facultyModal.data) {
      setFacultyForm({
        name: facultyModal.data.name || "",
        specialization: facultyModal.data.specialization || "",
        experience: facultyModal.data.experience || "",
        image: facultyModal.data.image || "",
        qualifications: facultyModal.data.qualifications || [],
        order: facultyModal.data.order || 0,
        is_active: facultyModal.data.is_active !== undefined ? facultyModal.data.is_active : true
      });
    } else if (facultyModal.open && facultyModal.mode === "add") {
      setFacultyForm({
        name: "",
        specialization: "",
        experience: "",
        image: "",
        qualifications: [],
        order: 0,
        is_active: true
      });
    }
  }, [facultyModal.open, facultyModal.mode, facultyModal.data]);

  useEffect(() => {
    if (certificateModal.open && certificateModal.mode === "edit" && certificateModal.data) {
      setCertificateForm({
        title: certificateModal.data.title || "",
        issuer: certificateModal.data.issuer || "",
        year: certificateModal.data.year || new Date().getFullYear().toString(),
        order: certificateModal.data.order || 0
      });
    } else if (certificateModal.open && certificateModal.mode === "add") {
      setCertificateForm({
        title: "",
        issuer: "",
        year: new Date().getFullYear().toString(),
        order: 0
      });
    }
  }, [certificateModal.open, certificateModal.mode, certificateModal.data]);

  useEffect(() => {
    if (galleryModal.open && galleryModal.mode === "edit" && galleryModal.data) {
      setGalleryForm({
        title: galleryModal.data.title || "",
        category: galleryModal.data.category || "Facilities",
        image: galleryModal.data.image || "",
        order: galleryModal.data.order || 0,
        is_featured: galleryModal.data.is_featured || false
      });
    } else if (galleryModal.open && galleryModal.mode === "add") {
      setGalleryForm({
        title: "",
        category: "Facilities",
        image: "",
        order: 0,
        is_featured: false
      });
    }
  }, [galleryModal.open, galleryModal.mode, galleryModal.data]);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAll();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Failed to fetch blogs", error);
      setBlogs([]); // Set empty array on error
      // Only show error if it's a real error (not 404 or network issue)
      if (error?.response?.status && error?.response?.status !== 404 && error?.response?.status !== 0) {
        toast({ title: "Error", description: "Failed to fetch blogs.", variant: "destructive" });
      }
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "workshops", label: "Workshops", icon: Calendar },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "faculty", label: "Faculty", icon: Users },
  ];

  const handleDelete = async () => {
    try {
      if (deleteModal.type === "blog") {
        await blogService.delete(deleteModal.id);
        toast({ title: "Blog Deleted", description: "The blog post has been successfully deleted." });
        fetchBlogs();
      } else if (deleteModal.type === "course") {
        await courseService.delete(deleteModal.id);
        toast({ title: "Course Deleted", description: "The course has been successfully deleted." });
        fetchCourses();
      } else if (deleteModal.type === "workshop") {
        await workshopService.delete(deleteModal.id);
        toast({ title: "Workshop Deleted", description: "The workshop has been successfully deleted." });
        fetchWorkshops();
      } else if (deleteModal.type === "testimonial") {
        await testimonialService.delete(deleteModal.id);
        toast({ title: "Testimonial Deleted", description: "The testimonial has been successfully deleted." });
        fetchTestimonials();
      } else if (deleteModal.type === "faculty") {
        await facultyService.delete(deleteModal.id);
        toast({ title: "Faculty Deleted", description: "The faculty member has been successfully deleted." });
        fetchFaculty();
      } else if (deleteModal.type === "certificate") {
        await certificateService.delete(deleteModal.id);
        toast({ title: "Certificate Deleted", description: "The certificate has been successfully deleted." });
        fetchCertificates();
      } else if (deleteModal.type === "gallery") {
        await galleryService.delete(deleteModal.id);
        toast({ title: "Gallery Item Deleted", description: "The gallery item has been successfully deleted." });
        fetchGallery();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" });
    }
    setDeleteModal({ open: false, type: "", id: "" });
  };

  const handleSave = async (type: string) => {
    try {
      if (type === "blog") {
        // Validate required fields
        if (!blogForm.title?.trim()) {
          toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
          return;
        }
        if (!blogForm.excerpt?.trim()) {
          toast({ title: "Validation Error", description: "Excerpt is required.", variant: "destructive" });
          return;
        }
        if (!blogForm.content || blogForm.content.trim() === '' || blogForm.content === '<p><br></p>') {
          toast({ title: "Validation Error", description: "Content is required.", variant: "destructive" });
          return;
        }
        if (!blogForm.category?.trim()) {
          toast({ title: "Validation Error", description: "Category is required.", variant: "destructive" });
          return;
        }

        // Clean and prepare blog data
        const payload: BlogInput = {
          title: blogForm.title.trim(),
          excerpt: blogForm.excerpt.trim(),
          content: blogForm.content.trim(), // Keep HTML from ReactQuill
          category: blogForm.category.trim(),
          tags: Array.isArray(blogForm.tags)
            ? blogForm.tags.filter(t => t.trim() !== '')
            : [],
        };

        // Only include optional fields if they have values
        if (blogForm.image?.trim()) {
          payload.image = blogForm.image.trim();
        }
        if (blogForm.published_at) {
          payload.published_at = blogForm.published_at.includes('T')
            ? blogForm.published_at.split('T')[0]
            : blogForm.published_at;
        }

        if (blogModal.mode === "add") {
          await blogService.create(payload);
          toast({ title: "Blog Created", description: "New blog post has been published." });
        } else if (blogModal.data) {
          await blogService.update(blogModal.data.id, payload);
          toast({ title: "Blog Updated", description: "Blog post has been updated." });
        }
        fetchBlogs();
        setBlogModal({ open: false, mode: "add" });
        // Clear form after modal closes (but keep image briefly for visual feedback)
        setTimeout(() => {
          setBlogForm({ title: "", excerpt: "", content: "", image: "", category: "", published_at: "", tags: [] });
        }, 300);
      } else if (type === "course") {
        // Validate required fields
        if (!courseForm.title?.trim()) {
          toast({ title: "Validation Error", description: "Course title is required.", variant: "destructive" });
          return;
        }
        if (!courseForm.description?.trim()) {
          toast({ title: "Validation Error", description: "Description is required.", variant: "destructive" });
          return;
        }
        if (!courseForm.category?.trim()) {
          toast({ title: "Validation Error", description: "Category is required.", variant: "destructive" });
          return;
        }

        const curriculumArray = courseForm.curriculum
          ? courseForm.curriculum.split('\n')
            .filter(line => line.trim() !== '')
            .map(line => ({
              module: line.trim(),
              topics: [line.trim()],
              duration: "TBD"
            }))
          : [];

        // Clean and prepare course data
        const payload: CourseInput = {
          title: courseForm.title.trim(),
          description: courseForm.description.trim(),
          category: courseForm.category.trim(),
          image: courseForm.image?.trim() || undefined,
          duration: courseForm.duration?.trim() || undefined,
          curriculum: curriculumArray,
        };

        if (courseModal.mode === "add") {
          await courseService.create(payload);
          toast({ title: "Course Added", description: "New course has been added." });
          fetchCourses();
        } else if (courseModal.mode === "edit" && courseModal.data) {
          await courseService.update(courseModal.data.id, payload);
          toast({ title: "Course Updated", description: "Course has been updated." });
          fetchCourses();
        }
        setCourseModal({ open: false, mode: "add" });
        setCourseForm({ title: "", category: "Beginner", duration: "", image: "", description: "", curriculum: "" });
      } else if (type === "workshop") {
        // Validate required fields
        if (!workshopForm.title?.trim()) {
          toast({ title: "Validation Error", description: "Workshop title is required.", variant: "destructive" });
          return;
        }
        if (!workshopForm.date) {
          toast({ title: "Validation Error", description: "Date is required.", variant: "destructive" });
          return;
        }
        if (!workshopForm.status) {
          toast({ title: "Validation Error", description: "Status is required.", variant: "destructive" });
          return;
        }
        if (!workshopForm.images || workshopForm.images.length === 0) {
          toast({ title: "Validation Error", description: "At least one image is required.", variant: "destructive" });
          return;
        }

        // Clean and prepare workshop data
        const cleanWorkshopData: WorkshopInput = {
          title: workshopForm.title.trim(),
          date: workshopForm.date,
          status: workshopForm.status,
          description: workshopForm.description?.trim() || undefined,
          location: workshopForm.location?.trim() || undefined,
          images: workshopForm.images,
          start_time: workshopForm.start_time?.trim() || undefined,
          end_time: workshopForm.end_time?.trim() || undefined,
          max_participants: workshopForm.max_participants || undefined,
          registrations: workshopForm.registrations || 0,
        };

        if (workshopModal.mode === "add") {
          await workshopService.create(cleanWorkshopData);
          toast({ title: "Workshop Added", description: "New workshop has been added." });
          fetchWorkshops();
        } else if (workshopModal.mode === "edit" && workshopModal.data) {
          await workshopService.update(workshopModal.data.id, cleanWorkshopData);
          toast({ title: "Workshop Updated", description: "Workshop has been updated." });
          fetchWorkshops();
        }
        setWorkshopModal({ open: false, mode: "add" });
      } else if (type === "testimonial") {
        // Validate required fields
        if (!testimonialForm.name?.trim()) {
          toast({ title: "Validation Error", description: "Name is required.", variant: "destructive" });
          return;
        }


        // Clean and prepare testimonial data
        const cleanTestimonialData: TestimonialInput = {
          name: testimonialForm.name.trim(),
          course: undefined,
          testimonial: testimonialForm.testimonial?.trim() || undefined,
          position: undefined,
          company: undefined,
          image: testimonialForm.image?.trim() || undefined,
          is_featured: testimonialForm.is_featured || false,
        };

        if (testimonialModal.mode === "add") {
          await testimonialService.create(cleanTestimonialData);
          toast({ title: "Testimonial Added", description: "New testimonial has been added." });
          fetchTestimonials();
        } else if (testimonialModal.mode === "edit" && testimonialModal.data) {
          await testimonialService.update(testimonialModal.data.id, cleanTestimonialData);
          toast({ title: "Testimonial Updated", description: "Testimonial has been updated." });
          fetchTestimonials();
        }
        setTestimonialModal({ open: false, mode: "add" });
      } else if (type === "faculty") {
        // Validate required fields
        if (!facultyForm.name?.trim()) {
          toast({ title: "Validation Error", description: "Name is required.", variant: "destructive" });
          return;
        }
        if (!facultyForm.specialization?.trim()) {
          toast({ title: "Validation Error", description: "Specialization is required.", variant: "destructive" });
          return;
        }

        // Clean and prepare faculty data
        const cleanFacultyData: FacultyInput = {
          name: facultyForm.name.trim(),
          specialization: facultyForm.specialization.trim(),
          qualifications: Array.isArray(facultyForm.qualifications) ? facultyForm.qualifications.filter(q => q.trim() !== '') : [],
          experience: facultyForm.experience?.trim() || undefined,
          image: facultyForm.image?.trim() || undefined,
          order: facultyForm.order || 0,
          is_active: facultyForm.is_active !== undefined ? facultyForm.is_active : true,
        };

        if (facultyModal.mode === "add") {
          await facultyService.create(cleanFacultyData);
          toast({ title: "Faculty Added", description: "New faculty member has been added." });
          fetchFaculty();
        } else if (facultyModal.mode === "edit" && facultyModal.data) {
          await facultyService.update(facultyModal.data.id, cleanFacultyData);
          toast({ title: "Faculty Updated", description: "Faculty member has been updated." });
          fetchFaculty();
        }
        setFacultyModal({ open: false, mode: "add" });
      } else if (type === "certificate") {
        // Validate required fields
        if (!certificateForm.title?.trim()) {
          toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
          return;
        }
        if (!certificateForm.issuer?.trim()) {
          toast({ title: "Validation Error", description: "Issuer is required.", variant: "destructive" });
          return;
        }
        if (!certificateForm.year?.trim()) {
          toast({ title: "Validation Error", description: "Year is required.", variant: "destructive" });
          return;
        }

        // Clean and prepare certificate data
        const cleanCertificateData: CertificateInput = {
          title: certificateForm.title.trim(),
          issuer: certificateForm.issuer.trim(),
          year: certificateForm.year.trim(),
          order: certificateForm.order || 0,
        };

        if (certificateModal.mode === "add") {
          await certificateService.create(cleanCertificateData);
          toast({ title: "Certificate Added", description: "New certificate has been added." });
          fetchCertificates();
        } else if (certificateModal.mode === "edit" && certificateModal.data) {
          await certificateService.update(certificateModal.data.id, cleanCertificateData);
          toast({ title: "Certificate Updated", description: "Certificate has been updated." });
          fetchCertificates();
        }
        setCertificateModal({ open: false, mode: "add" });
      } else if (type === "gallery" || type === "image") {
        // Validate required fields
        if (!galleryForm.title?.trim()) {
          toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
          return;
        }
        if (!galleryForm.category?.trim()) {
          toast({ title: "Validation Error", description: "Category is required.", variant: "destructive" });
          return;
        }
        if (!galleryForm.image?.trim()) {
          toast({ title: "Validation Error", description: "Image URL is required.", variant: "destructive" });
          return;
        }

        // Clean and prepare gallery data
        const cleanGalleryData: GalleryInput = {
          title: galleryForm.title.trim(),
          category: galleryForm.category.trim(),
          image: galleryForm.image.trim(),
          order: galleryForm.order || 0,
          is_featured: galleryForm.is_featured || false,
        };

        if (galleryModal.mode === "add") {
          await galleryService.create(cleanGalleryData);
          toast({ title: "Gallery Item Added", description: "New gallery item has been added." });
          fetchGallery();
        } else if (galleryModal.mode === "edit" && galleryModal.data) {
          await galleryService.update(galleryModal.data.id, cleanGalleryData);
          toast({ title: "Gallery Item Updated", description: "Gallery item has been updated." });
          fetchGallery();
        }
        setGalleryModal({ open: false, mode: "add" });
      }
    } catch (error: any) {
      console.error(`Failed to save ${type}:`, error);
      // Show validation errors from backend if available
      const backendErrors = error?.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : null;
      const backendMessage = error?.response?.data?.message || error?.response?.data?.error;
      const errorMessage =
        backendErrors
        || (backendMessage && backendMessage !== 'Validation failed' ? backendMessage : null)
        || `Failed to save ${type}. Please check all required fields.`;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden"
          }`}
      >
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              View Website
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Blogs", value: stats?.blogs || 0, change: "" },
                  { label: "Active Courses", value: stats?.courses || 0, change: "" },
                  { label: "Upcoming Workshops", value: stats?.workshops.upcoming || 0, change: stats ? `${stats.workshops.registrations} registrations` : "" },
                  { label: "Testimonials", value: stats?.testimonials.total || 0, change: stats ? `${stats.testimonials.featured} featured` : "" },
                ].map((stat, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      {stat.change !== "" && <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Blogs</h2>
                <Button variant="hero" onClick={() => setBlogModal({ open: true, mode: "add", data: undefined })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Blog
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No blogs found. Click "Add Blog" to create your first blog post.
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium">{blog.title}</TableCell>
                          <TableCell>{blog.category}</TableCell>
                          <TableCell>{blog.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setBlogModal({ open: true, mode: "edit", data: blog })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "blog", id: blog.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Courses</h2>
                <Button variant="hero" onClick={() => setCourseModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Course
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No courses found. Click "Add Course" to create your first course.
                        </TableCell>
                      </TableRow>
                    ) : (
                      courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell>{course.duration}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setCourseModal({ open: true, mode: "edit", data: course })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "course", id: course.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Workshops Tab */}
          {activeTab === "workshops" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Workshops</h2>
                <Button variant="hero" onClick={() => setWorkshopModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Workshop
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workshops.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No workshops found. Click "Add Workshop" to create your first workshop.
                        </TableCell>
                      </TableRow>
                    ) : (
                      workshops.map((workshop) => (
                        <TableRow key={workshop.id}>
                          <TableCell className="font-medium">{workshop.title}</TableCell>
                          <TableCell>{workshop.date}</TableCell>
                          <TableCell>{workshop.registrations}</TableCell>
                          <TableCell>
                            <Badge variant={workshop.status === "open" ? "default" : workshop.status === "completed" ? "secondary" : "outline"}>
                              {workshop.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setWorkshopModal({ open: true, mode: "edit", data: workshop })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "workshop", id: workshop.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Certificates & Awards</h2>
                <Button variant="hero" onClick={() => setCertificateModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Certificate
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Issuing Organization</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No certificates found. Click "Add Certificate" to create your first certificate.
                        </TableCell>
                      </TableRow>
                    ) : (
                      certificates.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.title}</TableCell>
                          <TableCell>{cert.issuer}</TableCell>
                          <TableCell>{cert.year}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setCertificateModal({ open: true, mode: "edit", data: cert })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "certificate", id: cert.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Testimonials</h2>
                <Button variant="hero" onClick={() => setTestimonialModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                          No testimonials found. Click "Add Testimonial" to create your first testimonial.
                        </TableCell>
                      </TableRow>
                    ) : (
                      testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          <TableCell className="font-medium">{testimonial.name}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTestimonialModal({ open: true, mode: "edit", data: testimonial })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "testimonial", id: testimonial.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Gallery</h2>
                <Button variant="hero" onClick={() => setGalleryModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Image
                </Button>
              </div>
              {gallery.length === 0 ? (
                <Card className="border-border/50">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No gallery items found. Click "Add Image" to add your first gallery item.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {gallery.map((item) => (
                    <Card key={item.id} className="border-border/50 overflow-hidden group">
                      <div className="relative aspect-video bg-muted">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary" onClick={() => setGalleryModal({ open: true, mode: "edit", data: item })}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => setDeleteModal({ open: true, type: "gallery", id: item.id })}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Faculty Tab */}
          {activeTab === "faculty" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Manage Faculty</h2>
                <Button variant="hero" onClick={() => setFacultyModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Faculty
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faculty.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No faculty members found. Click "Add Faculty" to create your first faculty member.
                        </TableCell>
                      </TableRow>
                    ) : (
                      faculty.map((facultyMember) => (
                        <TableRow key={facultyMember.id}>
                          <TableCell className="font-medium">{facultyMember.name}</TableCell>
                          <TableCell>{facultyMember.specialization}</TableCell>
                          <TableCell>{facultyMember.experience}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setFacultyModal({ open: true, mode: "edit", data: facultyMember })}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "faculty", id: facultyMember.id })}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}
        </main>
      </div>

      {/* Blog Modal */}
      <Dialog open={blogModal.open} onOpenChange={(open) => setBlogModal({ ...blogModal, open })}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{blogModal.mode === "add" ? "Add New Blog" : "Edit Blog"}</DialogTitle>
            <DialogDescription>Fill in the details for the blog post.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter blog title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={blogForm.category}
                  onValueChange={(value) => setBlogForm({ ...blogForm, category: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Threats">Threats</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  value={blogForm.published_at ? blogForm.published_at.split('T')[0] : ''}
                  onChange={(e) => setBlogForm({ ...blogForm, published_at: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input
                placeholder="security, hacking, tutorial"
                value={blogForm.tags?.join(', ') || ''}
                onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(',').map(t => t.trim()) })}
              />
            </div>

            <ImageUpload
              label="Featured Image"
              placeholder="Enter image URL or upload"
              value={blogForm.image}
              onChange={(url) => setBlogForm({ ...blogForm, image: url })}
            />

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                placeholder="Brief description..."
                rows={2}
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <div className="h-72 mb-12">
                <ReactQuill
                  theme="snow"
                  value={blogForm.content}
                  onChange={(content) => setBlogForm({ ...blogForm, content })}
                  modules={modules}
                  formats={formats}
                  className="h-64"
                />
              </div>
            </div>

          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setBlogModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("blog")}>Publish Blog</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Modal */}
      <Dialog open={courseModal.open} onOpenChange={(open) => setCourseModal({ ...courseModal, open })}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{courseModal.mode === "add" ? "Add New Course" : "Edit Course"}</DialogTitle>
            <DialogDescription>Fill in the course details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input
                placeholder="Enter course title"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={courseForm.category} onValueChange={(value) => setCourseForm({ ...courseForm, category: value })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Specialized">Specialized</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                placeholder="e.g., 12 Weeks"
                value={courseForm.duration}
                onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
              />
            </div>
            <ImageUpload
              label="Course Image"
              placeholder="Enter image URL or upload"
              value={courseForm.image}
              onChange={(url) => setCourseForm({ ...courseForm, image: url })}
            />
            <div className="space-y-2">
              <Label>Description</Label>
              <div className="h-72 mb-12">
                <ReactQuill
                  theme="snow"
                  value={courseForm.description}
                  onChange={(content) => setCourseForm({ ...courseForm, description: content })}
                  modules={modules}
                  formats={formats}
                  className="h-64"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Curriculum (one topic per line)</Label>
              <Textarea
                placeholder="Introduction&#10;Module 1&#10;Module 2..."
                rows={4}
                value={courseForm.curriculum}
                onChange={(e) => setCourseForm({ ...courseForm, curriculum: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setCourseModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("course"); setCourseModal({ open: false, mode: "add" }); }}>Save Course</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workshop Modal */}
      <Dialog open={workshopModal.open} onOpenChange={(open) => setWorkshopModal({ ...workshopModal, open })}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{workshopModal.mode === "add" ? "Add New Workshop" : "Edit Workshop"}</DialogTitle>
            <DialogDescription>Fill in the workshop details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Workshop Title</Label>
              <Input
                placeholder="Enter workshop title"
                value={workshopForm.title}
                onChange={(e) => setWorkshopForm({ ...workshopForm, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={workshopForm.date}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={workshopForm.status}
                  onValueChange={(value: any) => setWorkshopForm({ ...workshopForm, status: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="open">Registration Open</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Venue or Online"
                  value={workshopForm.location}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Participants</Label>
                <div className="space-y-1">
                  <Input
                    type="number"
                    placeholder="Enter number (Leave empty for Unlimited)"
                    value={workshopForm.max_participants === undefined || workshopForm.max_participants === null ? '' : workshopForm.max_participants}
                    onChange={(e) => {
                      const val = e.target.value;
                      setWorkshopForm({
                        ...workshopForm,
                        max_participants: val === '' ? undefined : parseInt(val)
                      });
                    }}
                  />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Leave empty for unlimited seats
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={workshopForm.start_time}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, start_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={workshopForm.end_time}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, end_time: e.target.value })}
                />
              </div>
            </div>
            <MultiImageUpload
              label="Workshop Images"
              placeholder="Enter image URL or upload"
              values={workshopForm.images}
              onChange={(urls) => setWorkshopForm({ ...workshopForm, images: urls })}
              maxImages={10}
            />
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Workshop description..."
                rows={3}
                value={workshopForm.description}
                onChange={(e) => setWorkshopForm({ ...workshopForm, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setWorkshopModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("workshop")}>Save Workshop</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Testimonial Modal */}
      <Dialog open={testimonialModal.open} onOpenChange={(open) => setTestimonialModal({ ...testimonialModal, open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{testimonialModal.mode === "add" ? "Add Testimonial" : "Edit Testimonial"}</DialogTitle>
            <DialogDescription>Add student feedback and testimonials.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Student Name</Label>
              <Input
                placeholder="Full name"
                value={testimonialForm.name}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
              />
            </div>
            <ImageUpload
              label="Student Photo"
              placeholder="Enter photo URL or upload"
              value={testimonialForm.image}
              onChange={(url) => setTestimonialForm({ ...testimonialForm, image: url })}
            />
            <div className="space-y-2">
              <Label>Testimonial</Label>
              <Textarea
                placeholder="What the student said..."
                rows={4}
                value={testimonialForm.testimonial}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setTestimonialModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("testimonial")}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Faculty Modal */}
      <Dialog open={facultyModal.open} onOpenChange={(open) => setFacultyModal({ ...facultyModal, open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{facultyModal.mode === "add" ? "Add Faculty Member" : "Edit Faculty"}</DialogTitle>
            <DialogDescription>Add faculty member information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Dr. John Doe"
                value={facultyForm.name}
                onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input
                placeholder="e.g., Ethical Hacking"
                value={facultyForm.specialization}
                onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  placeholder="e.g., 10 years"
                  value={facultyForm.experience}
                  onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={facultyForm.order}
                  onChange={(e) => setFacultyForm({ ...facultyForm, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <ImageUpload
              label="Faculty Photo"
              placeholder="Enter photo URL or upload"
              value={facultyForm.image}
              onChange={(url) => setFacultyForm({ ...facultyForm, image: url })}
            />

          </div>
          <div className="space-y-2">
            <Label>Qualifications (comma separated)</Label>
            <Input
              placeholder="CEH, CISSP, OSCP"
              value={Array.isArray(facultyForm.qualifications) ? facultyForm.qualifications.join(', ') : (facultyForm.qualifications || '')}
              onChange={(e) => {
                const quals = e.target.value.split(',').map(q => q.trim()).filter(q => q !== '');
                setFacultyForm({ ...facultyForm, qualifications: quals });
              }}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setFacultyModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("faculty")}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <Dialog open={certificateModal.open} onOpenChange={(open) => setCertificateModal({ ...certificateModal, open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{certificateModal.mode === "add" ? "Add Certificate/Award" : "Edit Certificate"}</DialogTitle>
            <DialogDescription>Add certificate or award details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Award/Certificate name"
                value={certificateForm.title}
                onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input
                placeholder="e.g., ISO, NASSCOM"
                value={certificateForm.issuer}
                onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  placeholder="2024"
                  value={certificateForm.year}
                  onChange={(e) => setCertificateForm({ ...certificateForm, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={certificateForm.order}
                  onChange={(e) => setCertificateForm({ ...certificateForm, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setCertificateModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("certificate")}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Modal */}
      <Dialog open={galleryModal.open} onOpenChange={(open) => setGalleryModal({ ...galleryModal, open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{galleryModal.mode === "add" ? "Add Gallery Image" : "Edit Image"}</DialogTitle>
            <DialogDescription>Upload an image to the gallery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Image title"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={galleryForm.category}
                  onValueChange={(value) => setGalleryForm({ ...galleryForm, category: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facilities">Facilities</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                    <SelectItem value="Workshops">Workshops</SelectItem>
                    <SelectItem value="Students">Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={galleryForm.order}
                  onChange={(e) => setGalleryForm({ ...galleryForm, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <ImageUpload
              label="Gallery Image"
              placeholder="Enter image URL or upload"
              value={galleryForm.image}
              onChange={(url) => setGalleryForm({ ...galleryForm, image: url })}
            />

          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setGalleryModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => handleSave("gallery")}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ ...deleteModal, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {deleteModal.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModal({ open: false, type: "", id: "" })}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default Dashboard;
