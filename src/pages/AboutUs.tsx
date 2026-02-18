import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Footer } from "../components/sections/Footer";
import { Target, Lightbulb, Users, Award } from "lucide-react";

const goals = [
    {
        icon: Target,
        title: "Mission",
        description: "To democratize cyber security education and make it accessible to everyone, regardless of their background.",
    },
    {
        icon: Lightbulb,
        title: "Vision",
        description: "To be the leading global platform for cyber security training, known for excellence and innovation.",
    },
    {
        icon: Users,
        title: "Community",
        description: "Building a strong community of security professionals who support and learn from each other.",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "Maintaining the highest standards in our curriculum and training methodologies.",
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Header />

            <main className="pt-20">
                {/* Founder Section */}
                <section className="py-20 lg:py-32 relative overflow-hidden">
                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Leadership</span>
                            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
                                Meet Our <span className="gradient-text">Founder</span>
                            </h1>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2"
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                                    <img
                                        src="/founder.jpg"
                                        alt="Founder"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none'; // Hide broken image
                                            target.parentElement!.style.backgroundColor = '#1a1a1a'; // Dark background
                                            // Optional: Create a text fallback
                                            const fallback = document.createElement('div');
                                            fallback.className = 'absolute inset-0 flex items-center justify-center text-muted-foreground';
                                            fallback.innerText = 'Image not found';
                                            target.parentElement!.appendChild(fallback);
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold">Imran Gauhar Khatib</h3>
                                        <p className="text-primary font-medium">Founder & CEO</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-foreground">A Vision for a Safer Digital World</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    "I started Nixsecura with a simple belief: that security is not just a technical requirement, but a fundamental right in the digital age. Our goal is to empower the next generation of defenders with the skills and mindset needed to protect our digital future."
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    With over 15 years of experience in the cybersecurity industry, John has led numerous high-profile security audits and has been a keynote speaker at major international security conferences. His passion for teaching led to the establishment of Nixsecura Institute.
                                </p>

                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Goals Section */}
                <section className="py-20 bg-muted/30 relative">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Purpose</span>
                            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
                                Driving <span className="gradient-text">Excellence</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {goals.map((goal, index) => (
                                <motion.div
                                    key={goal.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group text-center"
                                >
                                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                        <goal.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-4">{goal.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
