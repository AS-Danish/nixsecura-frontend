import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        setUrlInput("");
        onChange?.(result);
      };
      reader.readAsDataURL(file);
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
            onError={() => setPreviewUrl("")}
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
          className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground/70">
              PNG, JPG, GIF up to 10MB
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

      {/* URL Input */}
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
            onClick={() => setPreviewUrl(urlInput)}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
