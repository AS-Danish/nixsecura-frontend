import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUploadService } from "@/services/imageUploadService";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange?: (url: string) => void;
  placeholder?: string;
}

export const ImageUpload = ({ 
  label = "Image", 
  value = "", 
  onChange,
  placeholder = "Upload image or paste URL"
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState(value);
  const [urlInput, setUrlInput] = useState(value);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (value) {
      setPreviewUrl(value);
      setUrlInput(value);
    } else {
      // Only clear if value is explicitly empty
      if (value === "") {
        setPreviewUrl("");
        setUrlInput("");
      }
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setUrlInput("");

      // Upload to server
      const uploadedUrl = await imageUploadService.upload(file);
      
      // Update preview with server URL and keep it visible
      setPreviewUrl(uploadedUrl);
      setUrlInput(uploadedUrl); // Also set URL input so it shows the path
      onChange?.(uploadedUrl);
      
      // Clean up local preview URL
      URL.revokeObjectURL(localPreview);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      console.error("Image upload error:", error);
      setPreviewUrl("");
      setUrlInput("");
      toast({
        title: "Upload Failed",
        description: error?.response?.data?.message || error?.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    if (url) {
      setPreviewUrl(url);
      onChange?.(url);
    }
  };

  const clearImage = () => {
    setPreviewUrl("");
    setUrlInput("");
    onChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Preview */}
      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-40 object-cover"
            onError={(e) => {
              // If image fails to load, don't clear if it's a server URL
              if (!previewUrl.startsWith('http://localhost:8000') && !previewUrl.startsWith('http')) {
                setPreviewUrl("");
              }
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
          {/* Show URL below image */}
          {previewUrl && previewUrl.startsWith('http') && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
              {previewUrl}
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
        <div 
          className={`border-2 border-dashed border-border/50 rounded-lg p-6 text-center transition-colors ${
            uploading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:border-primary/50'
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
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* URL Input - Always show for manual URL entry */}
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={urlInput}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="flex-1"
        />
        {urlInput && !previewUrl && (
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={() => {
              setPreviewUrl(urlInput);
              onChange?.(urlInput);
            }}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
