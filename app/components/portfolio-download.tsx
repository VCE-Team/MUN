'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PortfolioDownloadProps {
  filename: string;
  fileUrl: string;
  label?: string;
}

export function PortfolioDownload({
  filename,
  fileUrl,
  label = 'Portfolio Matrix',
}: PortfolioDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      setShowSuccess(true);
      setOpen(false);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
          >
            <Download className="w-5 h-5" />
            Download {label}
          </motion.button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-[425px] bg-black border border-red-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Download {label}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to download the {label.toLowerCase()}? This
              file contains important information for the committee.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outline"
              className="border-red-500/30 text-gray-300 hover:bg-red-900/20"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-4 bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span>Downloaded successfully!</span>
        </motion.div>
      )}
    </>
  );
}
