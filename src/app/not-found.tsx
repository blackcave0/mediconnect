import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
        <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
