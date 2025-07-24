import { supabase } from '@/integrations/supabase/client';

// Test email sending functionality
export const sendTestEmail = async () => {
  try {
    console.log('Sending test email...');
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'welcome',
        userEmail: 'hlarosesurprenant@gmail.com',
        userName: 'Hugo'
      }
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message };
  }
};

// Auto-execute the test
sendTestEmail().then(result => {
  if (result.success) {
    console.log('✅ Test email sent successfully!');
  } else {
    console.error('❌ Failed to send test email:', result.error);
  }
});