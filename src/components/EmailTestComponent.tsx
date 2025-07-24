import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export const EmailTestComponent = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendTestEmail = async () => {
    setLoading(true);
    try {
      console.log('Triggering test email...');
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'welcome',
          userEmail: 'hlarosesurprenant@gmail.com',
          userName: 'Hugo'
        }
      });

      console.log('Email response:', { data, error });

      if (error) {
        throw error;
      }

      toast({
        title: "Test Email Sent!",
        description: "Check your inbox at hlarosesurprenant@gmail.com",
      });
    } catch (error: any) {
      console.error('Email sending failed:', error);
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send test email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={sendTestEmail} 
        disabled={loading}
        variant="outline"
        className="bg-background/80 backdrop-blur-sm"
      >
        {loading ? "Sending..." : "Send Test Email"}
      </Button>
    </div>
  );
};