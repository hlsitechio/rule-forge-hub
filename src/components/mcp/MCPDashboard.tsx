import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthProvider';
import { mcpService, MCPCategory, MCPDocument } from '@/services/mcpService';
import { 
  Activity, 
  Database, 
  Globe, 
  Key, 
  Settings,
  TrendingUp,
  RefreshCw,
  Search,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  BookOpen,
  Code2,
  Server,
  Link
} from 'lucide-react';

export const MCPDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [categories, setCategories] = useState<MCPCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [documents, setDocuments] = useState<MCPDocument[]>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [usage, setUsage] = useState({
    apiCalls: 0,
    storage: 0,
    lastSync: null as string | null
  });

  useEffect(() => {
    if (user) {
      initializeMCPService();
    }
  }, [user]);

  const initializeMCPService = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const success = await mcpService.initialize(user.id);
      if (success) {
        setInitialized(true);
        await loadCategories();
        await loadUsageStats();
        
        // Generate display API key (partially hidden)
        const key = localStorage.getItem(`mcp_key_${user.id}`) || 'mcp_key_****************';
        setApiKey(key);
      }
    } catch (error) {
      console.error('Error initializing MCP service:', error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize MCP service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await mcpService.fetchCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadUsageStats = async () => {
    try {
      const stats = await mcpService.getUsageStats();
      setUsage(stats);
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const results = await mcpService.syncDocumentationLibrary();
      
      toast({
        title: "Sync Complete",
        description: (
          <div className="space-y-1">
            <p>✅ {results.categories} categories synced</p>
            <p>📄 {results.documents} documents imported</p>
            {results.errors.length > 0 && (
              <p className="text-red-500">⚠️ {results.errors.length} errors occurred</p>
            )}
          </div>
        ),
      });

      // Reload categories and stats
      await loadCategories();
      await loadUsageStats();
    } catch (error: any) {
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync documentation library",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const loadCategoryDocuments = async (categoryKey: string) => {
    try {
      const docs = await mcpService.fetchCategoryDocuments(categoryKey);
      setDocuments(docs);
      setSelectedCategory(categoryKey);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents for this category",
        variant: "destructive"
      });
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!initialized) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Initialized</AlertTitle>
        <AlertDescription>
          Please sign in to access the MCP Documentation Dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">MCP Documentation Hub</h2>
          <p className="text-muted-foreground">
            Manage and sync your documentation library with AI assistants
          </p>
        </div>
        <Button 
          onClick={handleSync} 
          disabled={syncing}
          className="gap-2"
        >
          {syncing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Sync Library
            </>
          )}
        </Button>
      </div>

      {/* API Key Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Use this key to authenticate with the MCP API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <code className="text-sm font-mono">{apiKey}</code>
            <Button variant="outline" size="sm" onClick={copyApiKey}>
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Keep this key secure. It provides access to your MCP documentation services.
          </p>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.apiCalls}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.storage} MB</div>
            <p className="text-xs text-muted-foreground">
              Total storage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usage.lastSync ? new Date(usage.lastSync).toLocaleDateString() : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground">
              {usage.lastSync ? new Date(usage.lastSync).toLocaleTimeString() : 'Not synced yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Documentation Library
          </CardTitle>
          <CardDescription>
            Browse and manage your synced documentation categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-4">
              {categories.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Categories</AlertTitle>
                  <AlertDescription>
                    Click "Sync Library" to import documentation categories from GitHub.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <Card 
                      key={category.key} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => loadCategoryDocuments(category.key)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{category.icon || '📚'}</span>
                          <Badge variant="secondary">
                            {category.documentsCount} docs
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Badge variant="outline">
                            <Code2 className="h-3 w-3 mr-1" />
                            API Ready
                          </Badge>
                          <Badge variant="outline">
                            <Server className="h-3 w-3 mr-1" />
                            MCP
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              {selectedCategory ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Documents in {categories.find(c => c.key === selectedCategory)?.name}
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Back to Categories
                    </Button>
                  </div>
                  
                  {documents.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Loading Documents</AlertTitle>
                      <AlertDescription>
                        Fetching documents for this category...
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <Card key={doc.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {doc.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {doc.url}
                              </p>
                              <div className="flex gap-2 mt-2">
                                {doc.tags?.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Link className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Select a Category</AlertTitle>
                  <AlertDescription>
                    Choose a category from the Categories tab to view its documents.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="justify-start" variant="outline">
            <Globe className="mr-2 h-4 w-4" />
            Add Documentation Source
          </Button>
          <Button className="justify-start" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure AI Assistant
          </Button>
          <Button className="justify-start" variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button className="justify-start" variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search Documents
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
