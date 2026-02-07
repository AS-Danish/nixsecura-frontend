import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { courseService } from "@/services/courseService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultCourseId?: string;
}

export function EnrollmentModal({ isOpen, onClose, defaultCourseId }: EnrollmentModalProps) {
    const { toast } = useToast();
    const [courses, setCourses] = useState<{ id: number; title: string; duration: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        email: "",
        courseId: "",
        source: "",
        otherSource: "",
        internshipInterest: "",
    });

    useEffect(() => {
        if (isOpen) {
            fetchCourses();
            // Set default course if provided
            if (defaultCourseId) {
                setFormData((prev) => ({ ...prev, courseId: defaultCourseId }));
            }
        }
    }, [isOpen, defaultCourseId]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await courseService.getList();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses list", error);
            toast({
                title: "Error",
                description: "Failed to load courses. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Find selected course name
            const selectedCourse = courses.find((c) => c.id.toString() === formData.courseId);
            const courseName = selectedCourse ? `${selectedCourse.title} (${selectedCourse.duration})` : "";

            const submissionData = {
                ...formData,
                courseName,
                submittedAt: new Date().toISOString(),
            };

            // TODO: Replace with actual Google Apps Script URL provided by user
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3sswIvTNeaazDFTamZyYSanVlFOJ-grBjCvplUOMFh5ygYIe6T1VUjcfx5BDHED8UOw/exec";

            if (!GOOGLE_SCRIPT_URL) {
                throw new Error("Google Script URL is not configured");
            }

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(submissionData),
                mode: "no-cors", // Important for Google Apps Script
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast({
                title: "Success",
                description: "Your enrollment request has been submitted successfully!",
            });
            onClose();
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Error",
                description: "Failed to submit enrollment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Enroll Now</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to enroll in our courses.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                                id="contactNumber"
                                required
                                type="tel"
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                placeholder="+1 234 567 890"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select
                            value={formData.courseId}
                            onValueChange={(val) => setFormData({ ...formData, courseId: val })}
                            required
                        >
                            <SelectTrigger id="course">
                                <SelectValue placeholder={loading ? "Loading courses..." : "Select a course"} />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.title} ({course.duration})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="source">How did you hear about Nixsecura?</Label>
                        <Select
                            value={formData.source}
                            onValueChange={(val) => setFormData({ ...formData, source: val })}
                            required
                        >
                            <SelectTrigger id="source">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                                <SelectItem value="Facebook">Facebook</SelectItem>
                                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                <SelectItem value="Website">Website</SelectItem>
                                <SelectItem value="Advertisement">Advertisement</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.source === "Other" && (
                        <div className="space-y-2">
                            <Label htmlFor="otherSource">Please specify</Label>
                            <Input
                                id="otherSource"
                                required
                                value={formData.otherSource}
                                onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
                                placeholder="Friend, Event, etc."
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Are you interested in internship or practical training?</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="internship"
                                    value="Yes"
                                    checked={formData.internshipInterest === "Yes"}
                                    onChange={(e) => setFormData({ ...formData, internshipInterest: e.target.value })}
                                    className="accent-primary h-4 w-4"
                                    required
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="internship"
                                    value="No"
                                    checked={formData.internshipInterest === "No"}
                                    onChange={(e) => setFormData({ ...formData, internshipInterest: e.target.value })}
                                    className="accent-primary h-4 w-4"
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="hero" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Enrollment"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
