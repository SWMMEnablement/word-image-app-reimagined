import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Send, Building2, User, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const productOptions = [
  { id: "icm-viewer", label: "ICM Viewer" },
  { id: "icm-sewer", label: "ICM Sewer" },
  { id: "icm-flood", label: "ICM Flood" },
  { id: "icm-ultimate", label: "ICM Ultimate" },
];

const teamSizeOptions = [
  { value: "1", label: "1 seat" },
  { value: "2-5", label: "2-5 seats" },
  { value: "6-10", label: "6-10 seats" },
  { value: "11-20", label: "11-20 seats" },
  { value: "20+", label: "20+ seats" },
];

export const QuoteRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "",
    products: [] as string[],
    projectDescription: "",
    timeline: "",
  });

  const handleProductToggle = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(p => p !== productId)
        : [...prev.products, productId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Quote Request Submitted",
      description: "An Autodesk reseller will contact you within 1-2 business days.",
    });
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Quote Request Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your interest. An authorized Autodesk reseller will contact you within 1-2 business days with a personalized quote.
          </p>
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-medium border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Request Official Quote
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Get accurate pricing from an authorized Autodesk reseller for your specific needs.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Work Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company *
              </Label>
              <Input
                id="company"
                placeholder="Engineering Firm Inc."
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                maxLength={200}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                maxLength={20}
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className="space-y-3">
            <Label>Products of Interest</Label>
            <div className="flex flex-wrap gap-2">
              {productOptions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductToggle(product.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                    formData.products.includes(product.id)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  <Checkbox
                    checked={formData.products.includes(product.id)}
                    className="pointer-events-none"
                  />
                  <span className="text-sm">{product.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label>Estimated Team Size</Label>
            <Select 
              value={formData.teamSize} 
              onValueChange={(v) => setFormData(prev => ({ ...prev, teamSize: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                {teamSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe your project requirements, timeline, and any specific features you need..."
              value={formData.projectDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
              className="min-h-[100px]"
              maxLength={1000}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Request Official Quote
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to be contacted by an Autodesk authorized reseller. 
            Your information will be handled according to Autodesk's privacy policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
