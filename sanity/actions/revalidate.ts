import type { DocumentActionComponent } from 'sanity'
import { RefreshIcon } from '@sanity/icons'

export const revalidateAction: DocumentActionComponent = (props) => {
  const { type } = props

  // Only show for siteSettings documents
  if (type !== 'siteSettings') {
    return null
  }

  return {
    label: 'Update Website',
    icon: RefreshIcon,
    shortcut: 'Ctrl+Shift+U',
    onHandle: async () => {
      try {
        // Get the base URL - in Sanity Studio, we can use window.location
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : 'http://localhost:3000';
        
        const revalidateUrl = `${baseUrl}/api/revalidate`;
        
        // Get revalidation secret if configured (from environment)
        const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (secret) {
          headers['x-revalidate-secret'] = secret;
        }
        
        const response = await fetch(revalidateUrl, {
          method: 'POST',
          headers,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to revalidate website');
        }

        const data = await response.json();
        
        // Show success notification
        props.onComplete();
        
        // Show success message
        alert('✅ Website updated successfully! Changes should be visible now.');
      } catch (error) {
        // Show error notification
        const errorMessage = error instanceof Error ? error.message : 'Failed to update website. Please try again.';
        alert(`❌ ${errorMessage}`);
        console.error('Revalidation error:', error);
      }
    },
  }
}
