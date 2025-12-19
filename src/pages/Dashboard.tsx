import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, GraduationCap, Calendar, Award,
  MessageSquare, Image, Users, LogOut, Menu, X, Plus, Search,
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

// Sample data for UI
const sampleBlogs = [
  { id: "1", title: "Top 10 Cybersecurity Threats in 2024", category: "Threats", status: "published", date: "2024-01-15" },
  { id: "2", title: "Getting Started with Ethical Hacking", category: "Career", status: "draft", date: "2024-01-10" },
  { id: "3", title: "Understanding Zero-Day Vulnerabilities", category: "Security", status: "published", date: "2024-01-05" },
];

const sampleCourses = [
  { id: "1", title: "Certified Ethical Hacker (CEH)", category: "Certification", students: 156, status: "active" },
  { id: "2", title: "Web Application Security", category: "Specialization", students: 89, status: "active" },
  { id: "3", title: "Network Security Fundamentals", category: "Foundation", students: 234, status: "draft" },
];

const sampleWorkshops = [
  { id: "1", title: "Penetration Testing Bootcamp", date: "2024-02-15", registrations: 45, status: "upcoming" },
  { id: "2", title: "Malware Analysis Workshop", date: "2024-03-01", registrations: 32, status: "open" },
  { id: "3", title: "Cloud Security Essentials", date: "2024-01-20", registrations: 50, status: "completed" },
];

const sampleTestimonials = [
  { id: "1", name: "Rahul Sharma", course: "CEH", rating: 5, status: "approved" },
  { id: "2", name: "Priya Patel", course: "Web Security", rating: 5, status: "pending" },
  { id: "3", name: "Amit Kumar", course: "Network Security", rating: 4, status: "approved" },
];

const sampleFaculty = [
  { id: "1", name: "Dr. Rajesh Kumar", specialization: "Ethical Hacking", experience: "15 years" },
  { id: "2", name: "Priya Sharma", specialization: "Network Security", experience: "10 years" },
  { id: "3", name: "Amit Singh", specialization: "Cloud Security", experience: "8 years" },
];

const sampleCertificates = [
  { id: "1", title: "ISO 27001 Certified", issuer: "ISO", year: "2023" },
  { id: "2", title: "NASSCOM Excellence Award", issuer: "NASSCOM", year: "2024" },
  { id: "3", title: "Best Training Institute", issuer: "CII", year: "2023" },
];

const sampleGallery = [
  { id: "1", title: "Cyber Lab", category: "Facilities", image: "/placeholder.svg" },
  { id: "2", title: "Workshop 2024", category: "Events", image: "/placeholder.svg" },
  { id: "3", title: "Graduation Day", category: "Events", image: "/placeholder.svg" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [blogModal, setBlogModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleBlogs[0] }>({ open: false, mode: "add" });
  const [courseModal, setCourseModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleCourses[0] }>({ open: false, mode: "add" });
  const [workshopModal, setWorkshopModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleWorkshops[0] }>({ open: false, mode: "add" });
  const [testimonialModal, setTestimonialModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleTestimonials[0] }>({ open: false, mode: "add" });
  const [facultyModal, setFacultyModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleFaculty[0] }>({ open: false, mode: "add" });
  const [certificateModal, setCertificateModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleCertificates[0] }>({ open: false, mode: "add" });
  const [galleryModal, setGalleryModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: typeof sampleGallery[0] }>({ open: false, mode: "add" });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: "", id: "" });

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

  const handleDelete = () => {
    toast({ title: "Item Deleted", description: "The item has been successfully deleted." });
    setDeleteModal({ open: false, type: "", id: "" });
  };

  const handleSave = (type: string) => {
    toast({ title: "Saved Successfully", description: `The ${type} has been saved.` });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed lg:relative z-40 w-64 h-screen bg-card border-r border-border flex flex-col"
          >
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
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
                onClick={() => navigate("/login")}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
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
                  { label: "Total Blogs", value: "24", change: "+3 this month" },
                  { label: "Active Courses", value: "12", change: "2 drafts" },
                  { label: "Upcoming Workshops", value: "5", change: "120 registrations" },
                  { label: "Testimonials", value: "48", change: "5 pending" },
                ].map((stat, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
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
                <Button variant="hero" onClick={() => setBlogModal({ open: true, mode: "add" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Blog
                </Button>
              </div>
              <Card className="border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleBlogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell className="font-medium">{blog.title}</TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>
                          <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                            {blog.status}
                          </Badge>
                        </TableCell>
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
                    ))}
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
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "active" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </TableCell>
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
                    ))}
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
                    {sampleWorkshops.map((workshop) => (
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
                    ))}
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
                    {sampleCertificates.map((cert) => (
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
                    ))}
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
                      <TableHead>Course</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleTestimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell className="font-medium">{testimonial.name}</TableCell>
                        <TableCell>{testimonial.course}</TableCell>
                        <TableCell>{"⭐".repeat(testimonial.rating)}</TableCell>
                        <TableCell>
                          <Badge variant={testimonial.status === "approved" ? "default" : "secondary"}>
                            {testimonial.status}
                          </Badge>
                        </TableCell>
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
                    ))}
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sampleGallery.map((item) => (
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
                    {sampleFaculty.map((faculty) => (
                      <TableRow key={faculty.id}>
                        <TableCell className="font-medium">{faculty.name}</TableCell>
                        <TableCell>{faculty.specialization}</TableCell>
                        <TableCell>{faculty.experience}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setFacultyModal({ open: true, mode: "edit", data: faculty })}>
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => setDeleteModal({ open: true, type: "faculty", id: faculty.id })}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Input placeholder="Enter blog title" defaultValue={blogModal.data?.title} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue={blogModal.data?.category}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Threats">Threats</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ImageUpload label="Featured Image" placeholder="Enter image URL or upload" />
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea placeholder="Brief description..." rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea placeholder="Write your blog content here..." rows={6} />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setBlogModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("blog"); setBlogModal({ open: false, mode: "add" }); }}>Publish Blog</Button>
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
              <Input placeholder="Enter course title" defaultValue={courseModal.data?.title} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue={courseModal.data?.category}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Specialization">Specialization</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={courseModal.data?.status || "active"}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input placeholder="e.g., 12 weeks" />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ImageUpload label="Course Image" placeholder="Enter image URL or upload" />
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Course description..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Curriculum (one topic per line)</Label>
              <Textarea placeholder="Introduction&#10;Module 1&#10;Module 2..." rows={4} />
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
              <Input placeholder="Enter workshop title" defaultValue={workshopModal.data?.title} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" defaultValue={workshopModal.data?.date} />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input placeholder="e.g., 2 days" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Venue or Online" />
              </div>
              <div className="space-y-2">
                <Label>Max Seats</Label>
                <Input type="number" placeholder="50" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" placeholder="2999" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={workshopModal.data?.status || "upcoming"}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="open">Registration Open</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ImageUpload label="Workshop Image" placeholder="Enter image URL or upload" />
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Workshop description..." rows={3} />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setWorkshopModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("workshop"); setWorkshopModal({ open: false, mode: "add" }); }}>Save Workshop</Button>
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
              <Input placeholder="Full name" defaultValue={testimonialModal.data?.name} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course</Label>
                <Input placeholder="Course name" defaultValue={testimonialModal.data?.course} />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select defaultValue={testimonialModal.data?.rating?.toString() || "5"}>
                  <SelectTrigger><SelectValue placeholder="Rating" /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={r.toString()}>{r} Stars</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ImageUpload label="Student Photo" placeholder="Enter photo URL or upload" />
            <div className="space-y-2">
              <Label>Testimonial</Label>
              <Textarea placeholder="What the student said..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={testimonialModal.data?.status || "pending"}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setTestimonialModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("testimonial"); setTestimonialModal({ open: false, mode: "add" }); }}>Save</Button>
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
              <Input placeholder="Dr. John Doe" defaultValue={facultyModal.data?.name} />
            </div>
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input placeholder="e.g., Ethical Hacking" defaultValue={facultyModal.data?.specialization} />
            </div>
            <div className="space-y-2">
              <Label>Experience</Label>
              <Input placeholder="e.g., 10 years" defaultValue={facultyModal.data?.experience} />
            </div>
            <ImageUpload label="Faculty Photo" placeholder="Enter photo URL or upload" />
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea placeholder="Brief biography..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Certifications (comma separated)</Label>
              <Input placeholder="CEH, CISSP, OSCP" />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setFacultyModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("faculty"); setFacultyModal({ open: false, mode: "add" }); }}>Save</Button>
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
              <Input placeholder="Award/Certificate name" defaultValue={certificateModal.data?.title} />
            </div>
            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input placeholder="e.g., ISO, NASSCOM" defaultValue={certificateModal.data?.issuer} />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input placeholder="2024" defaultValue={certificateModal.data?.year} />
            </div>
            <ImageUpload label="Certificate Image" placeholder="Enter image URL or upload" />
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Details about this recognition..." rows={3} />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setCertificateModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("certificate"); setCertificateModal({ open: false, mode: "add" }); }}>Save</Button>
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
              <Input placeholder="Image title" defaultValue={galleryModal.data?.title} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue={galleryModal.data?.category}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Workshops">Workshops</SelectItem>
                  <SelectItem value="Students">Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ImageUpload label="Gallery Image" placeholder="Enter image URL or upload" value={galleryModal.data?.image} />
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input placeholder="Description for accessibility" />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setGalleryModal({ open: false, mode: "add" })}>Cancel</Button>
            <Button variant="hero" onClick={() => { handleSave("image"); setGalleryModal({ open: false, mode: "add" }); }}>Save</Button>
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
    </div>
  );
};

export default Dashboard;
