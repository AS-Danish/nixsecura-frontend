import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUploadService } from "@/services/imageUploadService";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/utils/imageUtils";

interface MultiImageUploadProps {
    label?: string;
    values?: string[];
    onChange?: (urls: string[]) => void;
    placeholder?: string;
    maxImages?: number;
}

export const MultiImageUpload = ({
    label = "Images",
    values = [],
    onChange,
    placeholder = "Upload image or paste URL",
    maxImages = 10
}: MultiImageUploadProps) => {
    const [images, setImages] = useState<string[]>(values);
    const [urlInput, setUrlInput] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Sync with props
        if (JSON.stringify(values) !== JSON.stringify(images)) {
            setImages(values || []);
        }
    }, [values]);

    const updateImages = (newImages: string[]) => {
        setImages(newImages);
        onChange?.(newImages);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Check if adding these files would exceed the limit
        if (images.length + files.length > maxImages) {
            toast({
                title: "Limit Reached",
                description: `You can only upload up to ${maxImages} images. You have ${images.length} and are trying to add ${files.length}.`,
                variant: "destructive",
            });
            // Clear input so user can try again
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }

        setUploading(true);
        const newImages = [...images];

        try {
            setUrlInput("");

            // Process all selected files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Validate file size (10MB max)
                if (file.size > 10 * 1024 * 1024) {
                    toast({
                        title: "Error",
                        description: `Image ${file.name} is larger than 10MB`,
                        variant: "destructive",
                    });
                    continue;
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    toast({
                        title: "Error",
                        description: `${file.name} is not a valid image file`,
                        variant: "destructive",
                    });
                    continue;
                }

                // Upload to server
                try {
                    const uploadedUrl = await imageUploadService.upload(file);
                    const normalized = normalizeImageUrl(uploadedUrl);
                    newImages.push(normalized);
                } catch (err: any) {
                    console.error(`Failed to upload ${file.name}`, err);
                    toast({
                        title: "Upload Failed",
                        description: `Failed to upload ${file.name}`,
                        variant: "destructive",
                    });
                }
            }

            updateImages(newImages);

            if (newImages.length > images.length) {
                toast({
                    title: "Success",
                    description: `${newImages.length - images.length} image(s) uploaded successfully`,
                });
            }

        } catch (error: any) {
            console.error("Image upload error:", error);
            toast({
                title: "Upload Error",
                description: "An unexpected error occurred during upload.",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleUrlAdd = () => {
        if (!urlInput.trim()) return;

        if (images.length >= maxImages) {
            toast({
                title: "Limit Reached",
                description: `You can only upload up to ${maxImages} images.`,
                variant: "destructive",
            });
            return;
        }

        const normalized = normalizeImageUrl(urlInput);
        if (normalized) {
            updateImages([...images, normalized]);
            setUrlInput("");
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        updateImages(newImages);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <Label>{label} ({images.length}/{maxImages})</Label>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden border border-border bg-muted/30 aspect-square group">
                            <img
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.warn('Image failed to load:', url);
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            {images.length < maxImages && (
                <div
                    className={`border-2 border-dashed border-border/50 rounded-lg p-6 text-center transition-colors ${uploading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:border-primary/50'
                        }`}
                    onClick={() => !uploading && fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center gap-2">
                        {uploading ? (
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-primary" />
                            </div>
                        )}
                        <p className="text-sm text-muted-foreground">
                            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                            PNG, JPG, GIF, WEBP up to 10MB
                        </p>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* URL Input */}
            {images.length < maxImages && (
                <div className="flex gap-2">
                    <Input
                        placeholder={placeholder}
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleUrlAdd();
                            }
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleUrlAdd}
                        disabled={!urlInput}
                    >
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};
