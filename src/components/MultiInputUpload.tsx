import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Globe, 
  Image, 
  FileText, 
  Upload, 
  Link, 
  Camera,
  FileType,
  PlusCircle,
  Sparkles,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MultiInputUploadProps {
  onAnalyze?: (data?: { url?: string }) => void;
}

export const MultiInputUpload = ({ onAnalyze }: MultiInputUploadProps) => {
  const { toast } = useToast();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const websiteUrlBlockRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const handleScrollToWebsiteUrl = () => {
      if (websiteUrlBlockRef.current) {
        websiteUrlBlockRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlight(true);
        setTimeout(() => setHighlight(false), 2000);
      }
    };
    window.addEventListener("scroll-to-website-url", handleScrollToWebsiteUrl);
    return () => window.removeEventListener("scroll-to-website-url", handleScrollToWebsiteUrl);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) ready for AI analysis`,
    });
  };

  const handleAnalyze = () => {
    toast({
      title: "AI Analysis Started",
      description: "Processing your inputs to generate Meta Ads strategy...",
    });
    onAnalyze?.({ url: websiteUrl });
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Multi-Modal AI Input
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Feed Your <span className="text-primary">AI Marketing Brain</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The more you share, the smarter your ads become. Upload any combination 
            of content and watch AI create your perfect Meta Ads strategy.
          </p>
        </div>

        <Card className="p-8 shadow-elegant">
          <Tabs defaultValue="website" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileType className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="description" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website" className="space-y-6">
              <div
                ref={websiteUrlBlockRef}
                className={`text-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/30 transition-shadow duration-500 ${highlight ? 'ring-4 ring-blue-400 ring-opacity-60' : ''}`}
              >
                <Link className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Website Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Enter your website URL and let AI extract insights about your business, products, and audience.
                </p>
                <div className="max-w-md mx-auto">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input
                    id="website-url"
                    type="url"
                    placeholder="https://your-website.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/30">
                <Image className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Product & Brand Images</h3>
                <p className="text-muted-foreground mb-4">
                  Upload product photos, logos, or brand visuals for AI to analyze your visual identity.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Images
                  </Button>
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/30">
                <FileType className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Business Documents</h3>
                <p className="text-muted-foreground mb-4">
                  Upload PDFs, DOCX files, or presentations about your business, products, or services.
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.pptx"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                />
                <Label htmlFor="document-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Documents
                  </Button>
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    placeholder="Describe your business, target audience, products/services, unique value proposition, and marketing goals..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Uploaded files display */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                  >
                    <FileText className="w-3 h-3" />
                    {file.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="hero" size="lg" onClick={handleAnalyze} className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Analyze & Generate Ads
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add More Content
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};