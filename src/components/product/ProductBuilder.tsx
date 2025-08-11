import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Save,
  Eye,
  Upload,
  Package,
  Code2,
  FileText,
  Tag,
  DollarSign,
  Sparkles,
  Globe,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Copy,
  Download,
  Zap,
  BookOpen,
  Loader2
} from 'lucide-react';

interface ProductData {
  title: string;
  short_description: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  product_code: string;
  file_url: string;
  preview_content: {
    documentsCount?: number;
    sampleTitles?: string[];
    features?: string[];
    whatsIncluded?: string[];
    requirements?: string[];
  };
  implementation_guide: string;
}

const CATEGORIES = [
  { value: 'MCP Documentation', label: 'MCP Documentation', icon: '🖥️' },
  { value: 'Cursor Rules', label: 'Cursor Rules', icon: '⚡' },
  { value: 'System Prompts', label: 'System Prompts', icon: '🧠' },
  { value: 'Agent Instructions', label: 'Agent Instructions', icon: '🤖' },
  { value: 'Workflow Automation', label: 'Workflow Automation', icon: '⚙️' },
  { value: 'Development Tools', label: 'Development Tools', icon: '🛠️' },
  { value: 'Documentation', label: 'Documentation', icon: '📚' },
];

const TEMPLATE_FEATURES = [
  'Full source code access',
  'Detailed documentation',
  'Regular updates',
  'Technical support',
  'AI integration ready',
  'Copy-paste ready',
  'Battle-tested in production',
  'Customizable templates'
];

export const ProductBuilder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    short_description: '',
    description: '',
    category: 'Cursor Rules',
    price: 0,
    tags: [],
    is_featured: false,
    is_active: true,
    product_code: '',
    file_url: '',
    preview_content: {
      features: [],
      whatsIncluded: [],
      requirements: []
    },
    implementation_guide: ''
  });

  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newIncluded, setNewIncluded] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    // Auto-generate product code
    if (productData.title) {
      const code = productData.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .substring(0, 20);
      setProductData(prev => ({
        ...prev,
        product_code: `${productData.category.toLowerCase().replace(' ', '_')}_${code}_${Date.now().toString(36)}`
      }));
    }
  }, [productData.title, productData.category]);

  const handleInputChange = (field: keyof ProductData, value: any) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreviewContentChange = (field: string, value: any) => {
    setProductData(prev => ({
      ...prev,
      preview_content: {
        ...prev.preview_content,
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (newTag && !productData.tags.includes(newTag)) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addFeature = () => {
    if (newFeature) {
      handlePreviewContentChange('features', [
        ...(productData.preview_content.features || []),
        newFeature
      ]);
      setNewFeature('');
    }
  };

  const addIncluded = () => {
    if (newIncluded) {
      handlePreviewContentChange('whatsIncluded', [
        ...(productData.preview_content.whatsIncluded || []),
        newIncluded
      ]);
      setNewIncluded('');
    }
  };

  const addRequirement = () => {
    if (newRequirement) {
      handlePreviewContentChange('requirements', [
        ...(productData.preview_content.requirements || []),
        newRequirement
      ]);
      setNewRequirement('');
    }
  };

  const generateImplementationGuide = () => {
    const guide = `
# ${productData.title} Implementation Guide

## Quick Start

### Installation
\`\`\`bash
# Download the package
curl -O ${productData.file_url || '[DOWNLOAD_URL]'}

# Extract and setup
tar -xzf ${productData.product_code}.tar.gz
cd ${productData.product_code}
\`\`\`

### Configuration

1. **Copy the template files** to your project directory
2. **Customize** the configuration to match your needs
3. **Test** the implementation in development
4. **Deploy** to production

## Features

${productData.preview_content.features?.map(f => `- ✅ ${f}`).join('\n') || '- Feature list coming soon'}

## What's Included

${productData.preview_content.whatsIncluded?.map(w => `- 📦 ${w}`).join('\n') || '- Package contents coming soon'}

## Requirements

${productData.preview_content.requirements?.map(r => `- ⚡ ${r}`).join('\n') || '- No specific requirements'}

## Usage Example

\`\`\`javascript
// Import and use
import { ${productData.title.replace(/[^a-zA-Z]/g, '')} } from './${productData.product_code}';

// Initialize
const instance = new ${productData.title.replace(/[^a-zA-Z]/g, '')}({
  // Your configuration
});

// Use it
instance.execute();
\`\`\`

## Support

- Documentation: [View Docs](#)
- Issues: [Report Issue](#)
- Updates: Automatic via dashboard

## License

This product is licensed for use as described in the purchase terms.
    `.trim();

    setProductData(prev => ({
      ...prev,
      implementation_guide: guide
    }));

    toast({
      title: "Guide Generated",
      description: "Implementation guide has been auto-generated",
    });
  };

  const validateProduct = (): boolean => {
    if (!productData.title) {
      toast({
        title: "Validation Error",
        description: "Product title is required",
        variant: "destructive"
      });
      return false;
    }

    if (!productData.short_description) {
      toast({
        title: "Validation Error",
        description: "Short description is required",
        variant: "destructive"
      });
      return false;
    }

    if (!productData.category) {
      toast({
        title: "Validation Error",
        description: "Category is required",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const saveAsDraft = async () => {
    if (!validateProduct()) return;

    setLoading(true);
    try {
      // Save to localStorage as draft
      const drafts = JSON.parse(localStorage.getItem('product_drafts') || '[]');
      drafts.push({
        ...productData,
        draft_id: Date.now().toString(),
        created_at: new Date().toISOString()
      });
      localStorage.setItem('product_drafts', JSON.stringify(drafts));

      toast({
        title: "Draft Saved",
        description: "Product saved as draft successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const publishProduct = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to publish products",
        variant: "destructive"
      });
      return;
    }

    if (!validateProduct()) return;

    setPublishing(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          price: productData.price * 100, // Convert to cents
          preview_content: JSON.stringify(productData.preview_content),
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Product Published!",
        description: `${productData.title} has been published to the marketplace`,
      });

      // Clear form
      setProductData({
        title: '',
        short_description: '',
        description: '',
        category: 'Cursor Rules',
        price: 0,
        tags: [],
        is_featured: false,
        is_active: true,
        product_code: '',
        file_url: '',
        preview_content: {
          features: [],
          whatsIncluded: [],
          requirements: []
        },
        implementation_guide: ''
      });

      // Return the product URL
      return `/product/${data.id}`;
    } catch (error: any) {
      toast({
        title: "Publish Failed",
        description: error.message || "Failed to publish product",
        variant: "destructive"
      });
    } finally {
      setPublishing(false);
    }
  };

  const exportProduct = () => {
    const exportData = {
      ...productData,
      exported_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${productData.product_code || 'product'}_export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Product Exported",
      description: "Product data exported as JSON",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Product Builder</h2>
          <p className="text-muted-foreground">Create and publish products to your marketplace</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            onClick={exportProduct}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <Card>
          <CardHeader>
            <CardTitle>Product Preview</CardTitle>
            <CardDescription>This is how your product will appear in the marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Product Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{productData.title || 'Product Title'}</h3>
                  <p className="text-muted-foreground mt-2">
                    {productData.short_description || 'Short description will appear here'}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="outline">{productData.category}</Badge>
                    {productData.is_featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Code: {productData.product_code}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    ${productData.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">one-time purchase</div>
                </div>
              </div>

              {/* Tags */}
              {productData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <div className="prose prose-sm max-w-none">
                  {productData.description || 'Full description will appear here'}
                </div>
              </div>

              {/* Features */}
              {productData.preview_content.features && productData.preview_content.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <div className="space-y-2">
                    {productData.preview_content.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {productData.preview_content.whatsIncluded && productData.preview_content.whatsIncluded.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <div className="space-y-2">
                    {productData.preview_content.whatsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core product details and metadata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title*</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Advanced Cursor Rules Pack"
                      value={productData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category*</Label>
                    <Select
                      value={productData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span>{cat.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short-desc">Short Description*</Label>
                  <Input
                    id="short-desc"
                    placeholder="Brief description for product cards (max 100 chars)"
                    value={productData.short_description}
                    onChange={(e) => handleInputChange('short_description', e.target.value)}
                    maxLength={100}
                  />
                  <span className="text-xs text-muted-foreground">
                    {productData.short_description.length}/100 characters
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        value={productData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file-url">File URL</Label>
                    <Input
                      id="file-url"
                      placeholder="https://github.com/..."
                      value={productData.file_url}
                      onChange={(e) => handleInputChange('file_url', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Content</CardTitle>
                <CardDescription>Detailed description and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed product description (supports markdown)"
                    value={productData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={10}
                  />
                  <span className="text-xs text-muted-foreground">
                    Supports markdown formatting
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Features & What's Included</CardTitle>
                <CardDescription>Highlight what makes your product special</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button onClick={addFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {productData.preview_content.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="flex-1">{feature}</span>
                        <X
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const newFeatures = [...(productData.preview_content.features || [])];
                            newFeatures.splice(idx, 1);
                            handlePreviewContentChange('features', newFeatures);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-2">
                  <Label>What's Included</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add included item"
                      value={newIncluded}
                      onChange={(e) => setNewIncluded(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())}
                    />
                    <Button onClick={addIncluded} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {productData.preview_content.whatsIncluded?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="flex-1">{item}</span>
                        <X
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const newItems = [...(productData.preview_content.whatsIncluded || [])];
                            newItems.splice(idx, 1);
                            handlePreviewContentChange('whatsIncluded', newItems);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label>Requirements</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add requirement"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <Button onClick={addRequirement} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {productData.preview_content.requirements?.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="flex-1">{req}</span>
                        <X
                          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const newReqs = [...(productData.preview_content.requirements || [])];
                            newReqs.splice(idx, 1);
                            handlePreviewContentChange('requirements', newReqs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Add Templates */}
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Quick Add Templates</p>
                      <div className="flex flex-wrap gap-2">
                        {TEMPLATE_FEATURES.map((feature) => (
                          <Button
                            key={feature}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!productData.preview_content.features?.includes(feature)) {
                                handlePreviewContentChange('features', [
                                  ...(productData.preview_content.features || []),
                                  feature
                                ]);
                              }
                            }}
                          >
                            {feature}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
                <CardDescription>Help users implement your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={generateImplementationGuide}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Auto-Generate Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guide">Implementation Guide (Markdown)</Label>
                  <Textarea
                    id="guide"
                    placeholder="Step-by-step implementation instructions"
                    value={productData.implementation_guide}
                    onChange={(e) => handleInputChange('implementation_guide', e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Settings</CardTitle>
                <CardDescription>Configure product visibility and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Featured Product</Label>
                    <p className="text-sm text-muted-foreground">
                      Display this product prominently in the marketplace
                    </p>
                  </div>
                  <Switch
                    checked={productData.is_featured}
                    onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this product available for purchase
                    </p>
                  </div>
                  <Switch
                    checked={productData.is_active}
                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={productData.product_code}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(productData.product_code);
                        toast({
                          title: "Copied",
                          description: "Product code copied to clipboard",
                        });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Auto-generated unique identifier
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={saveAsDraft}
                disabled={loading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={publishProduct}
                disabled={publishing || !productData.title}
                className="gap-2"
              >
                {publishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Publish to Marketplace
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
