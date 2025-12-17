export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  mode: string;
  level: string;
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
    experience: string;
    certifications: string[];
  };
  curriculum: {
    module: string;
    topics: string[];
    duration: string;
  }[];
  batches: {
    id: string;
    startDate: string;
    timing: string;
    mode: string;
    seats: number;
  }[];
  highlights: string[];
}

export const courses: Course[] = [
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    description: "Master the art of identifying vulnerabilities and securing systems against real-world cyber threats. Learn offensive security techniques used by professional penetration testers.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    category: "Advanced",
    duration: "12 Weeks",
    mode: "Online + Offline",
    level: "Intermediate to Advanced",
    instructor: {
      name: "Rajesh Kumar",
      title: "Senior Security Consultant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      bio: "Former security researcher at leading tech companies with 12+ years of experience in penetration testing and vulnerability assessment.",
      experience: "12+ Years",
      certifications: ["OSCP", "CEH", "CISSP", "GPEN"],
    },
    curriculum: [
      { module: "Introduction to Ethical Hacking", topics: ["Legal & ethical considerations", "Setting up the lab environment", "Reconnaissance techniques"], duration: "Week 1" },
      { module: "Network Scanning & Enumeration", topics: ["Nmap mastery", "Service enumeration", "Vulnerability scanning"], duration: "Week 2-3" },
      { module: "System Hacking", topics: ["Password cracking", "Privilege escalation", "Maintaining access"], duration: "Week 4-5" },
      { module: "Web Application Security", topics: ["OWASP Top 10", "SQL injection", "XSS attacks", "Authentication bypass"], duration: "Week 6-8" },
      { module: "Wireless Security", topics: ["Wi-Fi hacking", "WPA/WPA2 cracking", "Evil twin attacks"], duration: "Week 9" },
      { module: "Advanced Exploitation", topics: ["Metasploit framework", "Custom exploit development", "Post-exploitation"], duration: "Week 10-11" },
      { module: "Reporting & Documentation", topics: ["Professional report writing", "Executive summaries", "Remediation strategies"], duration: "Week 12" },
    ],
    batches: [
      { id: "b1", startDate: "January 15, 2025", timing: "Mon-Wed-Fri, 7:00 PM - 9:00 PM", mode: "Online", seats: 12 },
      { id: "b2", startDate: "February 1, 2025", timing: "Sat-Sun, 10:00 AM - 2:00 PM", mode: "Offline", seats: 8 },
      { id: "b3", startDate: "February 20, 2025", timing: "Tue-Thu, 6:30 PM - 8:30 PM", mode: "Hybrid", seats: 15 },
    ],
    highlights: ["Hands-on labs with real vulnerable systems", "Industry-recognized certification prep", "1:1 mentorship sessions", "Lifetime access to course materials"],
  },
  {
    id: "network-security",
    title: "Network Security Fundamentals",
    description: "Build a strong foundation in network defense, firewall configuration, and intrusion detection systems. Perfect for beginners starting their cybersecurity journey.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "Beginner",
    duration: "8 Weeks",
    mode: "Online + Offline",
    level: "Beginner",
    instructor: {
      name: "Priya Sharma",
      title: "Network Security Architect",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      bio: "Certified network security professional with expertise in enterprise network defense and cloud security architecture.",
      experience: "10+ Years",
      certifications: ["CCNP Security", "CompTIA Security+", "AWS Security"],
    },
    curriculum: [
      { module: "Network Fundamentals", topics: ["OSI model", "TCP/IP protocols", "Network topologies"], duration: "Week 1-2" },
      { module: "Firewalls & Access Control", topics: ["Firewall types", "Rule configuration", "DMZ setup"], duration: "Week 3-4" },
      { module: "Intrusion Detection", topics: ["IDS/IPS concepts", "Snort configuration", "Alert analysis"], duration: "Week 5-6" },
      { module: "VPN & Encryption", topics: ["VPN protocols", "IPSec configuration", "SSL/TLS"], duration: "Week 7" },
      { module: "Security Best Practices", topics: ["Network hardening", "Security policies", "Incident response basics"], duration: "Week 8" },
    ],
    batches: [
      { id: "b1", startDate: "January 10, 2025", timing: "Mon-Wed, 6:00 PM - 8:00 PM", mode: "Online", seats: 20 },
      { id: "b2", startDate: "January 25, 2025", timing: "Sat, 9:00 AM - 1:00 PM", mode: "Offline", seats: 10 },
    ],
    highlights: ["Beginner-friendly approach", "Real network lab simulations", "CompTIA Network+ aligned", "Job placement assistance"],
  },
  {
    id: "security-analyst",
    title: "Cyber Security Analyst Program",
    description: "Comprehensive training to become a certified security analyst with hands-on SOC experience. Learn to detect, analyze, and respond to security threats.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    category: "Professional",
    duration: "16 Weeks",
    mode: "Hybrid",
    level: "Intermediate",
    instructor: {
      name: "Amit Verma",
      title: "SOC Manager & Threat Analyst",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      bio: "Led security operations centers for Fortune 500 companies. Expert in threat intelligence and incident response.",
      experience: "15+ Years",
      certifications: ["GCIH", "GCIA", "SANS", "CySA+"],
    },
    curriculum: [
      { module: "SOC Fundamentals", topics: ["SOC operations", "SIEM introduction", "Log management"], duration: "Week 1-3" },
      { module: "Threat Detection", topics: ["Threat intelligence", "IOC analysis", "MITRE ATT&CK framework"], duration: "Week 4-6" },
      { module: "Security Monitoring", topics: ["Splunk/ELK stack", "Alert triage", "Dashboard creation"], duration: "Week 7-9" },
      { module: "Incident Response", topics: ["IR process", "Malware analysis basics", "Forensic fundamentals"], duration: "Week 10-13" },
      { module: "Capstone Project", topics: ["Real-world SOC simulation", "Team exercises", "Final assessment"], duration: "Week 14-16" },
    ],
    batches: [
      { id: "b1", startDate: "January 5, 2025", timing: "Mon-Tue-Thu, 7:00 PM - 9:30 PM", mode: "Hybrid", seats: 15 },
      { id: "b2", startDate: "March 1, 2025", timing: "Sat-Sun, 10:00 AM - 3:00 PM", mode: "Offline", seats: 12 },
    ],
    highlights: ["Live SOC environment access", "Real-time threat analysis", "Career mentorship program", "Guaranteed interview opportunities"],
  },
  {
    id: "cloud-security",
    title: "Cloud Security Architecture",
    description: "Learn to secure cloud environments across AWS, Azure, and GCP with industry best practices. Master cloud-native security tools and compliance frameworks.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "Advanced",
    duration: "10 Weeks",
    mode: "Online",
    level: "Advanced",
    instructor: {
      name: "Sneha Patel",
      title: "Cloud Security Architect",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      bio: "Multi-cloud security expert with experience designing secure architectures for enterprises migrating to cloud.",
      experience: "8+ Years",
      certifications: ["AWS Security Specialty", "Azure Security Engineer", "CCSP"],
    },
    curriculum: [
      { module: "Cloud Security Basics", topics: ["Shared responsibility model", "Cloud threat landscape", "Identity management"], duration: "Week 1-2" },
      { module: "AWS Security", topics: ["IAM", "VPC security", "S3 security", "CloudTrail"], duration: "Week 3-4" },
      { module: "Azure Security", topics: ["Azure AD", "Network security groups", "Key Vault", "Sentinel"], duration: "Week 5-6" },
      { module: "GCP Security", topics: ["Cloud IAM", "VPC service controls", "Security Command Center"], duration: "Week 7-8" },
      { module: "Compliance & Governance", topics: ["GDPR", "SOC 2", "Cloud security frameworks"], duration: "Week 9-10" },
    ],
    batches: [
      { id: "b1", startDate: "January 20, 2025", timing: "Tue-Thu, 8:00 PM - 10:00 PM", mode: "Online", seats: 25 },
    ],
    highlights: ["Multi-cloud hands-on labs", "Cloud certification prep", "Real architecture reviews", "Industry case studies"],
  },
  {
    id: "digital-forensics",
    title: "Digital Forensics & Incident Response",
    description: "Develop skills in investigating cyber crimes and responding to security incidents effectively. Learn forensic techniques used by law enforcement.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    category: "Specialized",
    duration: "12 Weeks",
    mode: "Hybrid",
    level: "Intermediate to Advanced",
    instructor: {
      name: "Dr. Vikram Singh",
      title: "Digital Forensics Expert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      bio: "Former law enforcement cyber crime investigator. PhD in Digital Forensics with numerous published research papers.",
      experience: "18+ Years",
      certifications: ["EnCE", "GCFE", "CHFI", "ACE"],
    },
    curriculum: [
      { module: "Forensics Fundamentals", topics: ["Digital evidence types", "Chain of custody", "Legal considerations"], duration: "Week 1-2" },
      { module: "Disk Forensics", topics: ["File systems", "Data recovery", "Artifact analysis"], duration: "Week 3-5" },
      { module: "Memory Forensics", topics: ["RAM acquisition", "Volatility framework", "Malware detection"], duration: "Week 6-7" },
      { module: "Network Forensics", topics: ["Packet capture analysis", "Log correlation", "Traffic reconstruction"], duration: "Week 8-9" },
      { module: "Incident Response", topics: ["IR planning", "Containment strategies", "Recovery procedures"], duration: "Week 10-12" },
    ],
    batches: [
      { id: "b1", startDate: "February 10, 2025", timing: "Mon-Wed-Fri, 6:30 PM - 8:30 PM", mode: "Hybrid", seats: 10 },
    ],
    highlights: ["Law enforcement case studies", "Forensic tool mastery", "Court testimony preparation", "Expert witness training"],
  },
  {
    id: "web-security",
    title: "Web Application Security",
    description: "Protect web applications from OWASP Top 10 vulnerabilities and secure the modern web stack. Essential training for developers and security professionals.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    category: "Intermediate",
    duration: "8 Weeks",
    mode: "Online + Offline",
    level: "Intermediate",
    instructor: {
      name: "Arjun Mehta",
      title: "Application Security Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
      bio: "Bug bounty hunter turned security consultant. Found vulnerabilities in major platforms and trained development teams globally.",
      experience: "9+ Years",
      certifications: ["OSWE", "GWAPT", "eWPT", "BSCP"],
    },
    curriculum: [
      { module: "Web Security Basics", topics: ["HTTP/HTTPS", "Same-origin policy", "Authentication mechanisms"], duration: "Week 1" },
      { module: "Injection Attacks", topics: ["SQL injection", "Command injection", "LDAP injection"], duration: "Week 2-3" },
      { module: "Client-Side Attacks", topics: ["XSS variants", "CSRF", "Clickjacking"], duration: "Week 4-5" },
      { module: "Authentication & Authorization", topics: ["Session management", "OAuth security", "JWT vulnerabilities"], duration: "Week 6" },
      { module: "Secure Development", topics: ["Secure coding practices", "Code review", "DevSecOps"], duration: "Week 7-8" },
    ],
    batches: [
      { id: "b1", startDate: "January 12, 2025", timing: "Sat-Sun, 11:00 AM - 2:00 PM", mode: "Offline", seats: 15 },
      { id: "b2", startDate: "February 5, 2025", timing: "Tue-Thu, 7:00 PM - 9:00 PM", mode: "Online", seats: 20 },
    ],
    highlights: ["Bug bounty methodology", "Real vulnerable apps practice", "Code review skills", "Developer security mindset"],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
