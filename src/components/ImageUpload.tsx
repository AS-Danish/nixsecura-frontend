import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUploadService } from "@/services/imageUploadService";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/utils/imageUtils";

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
    // Always sync with value prop
    if (value) {
      const normalized = normalizeImageUrl(value);
      setPreviewUrl(normalized);
      setUrlInput(normalized);
    } else if (value === "" || value === null || value === undefined) {
      // Only clear if explicitly empty
      setPreviewUrl("");
      setUrlInput("");
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
      // Don't show local preview immediately, wait for upload
      setUrlInput("");

      // Upload to server
      const uploadedUrl = await imageUploadService.upload(file);

      // Update preview with server URL and keep it visible
      const normalized = normalizeImageUrl(uploadedUrl);
      setPreviewUrl(normalized);
      setUrlInput(normalized); // Also set URL input so it shows the path
      onChange?.(normalized);

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
    const normalized = normalizeImageUrl(url);
    setUrlInput(normalized);
    if (normalized) {
      setPreviewUrl(normalized);
      onChange?.(normalized);
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
              // Don't clear preview on error - might be CORS or temporary issue
              console.warn('Image failed to load:', previewUrl);
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
        </div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
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
              const normalized = normalizeImageUrl(urlInput);
              setPreviewUrl(normalized);
              onChange?.(normalized);
            }}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
