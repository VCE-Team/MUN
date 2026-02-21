"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [openCountryMatrix, setOpenCountryMatrix] = useState(false);
  const [openHandbook, setOpenHandbook] = useState(false);

  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Handle scrolling when navigating to home page with committees hash
    if (pathname === "/" && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#committees") {
        // Use a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
          const committeesSection = document.getElementById("committees");
          if (committeesSection) {
            committeesSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const handleCommitteesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/") {
      // On home page, scroll to committees section immediately
      const committeesSection = document.getElementById("committees");
      if (committeesSection) {
        // Use a combination of methods to ensure mobile compatibility
        committeesSection.scrollIntoView({ behavior: "auto" });
        // Fallback for smooth scrolling using setTimeout if available
        if ("requestAnimationFrame" in window) {
          setTimeout(() => {
            committeesSection.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      }
    } else {
      // On other pages, navigate to home with hash
      router.push("/#committees");
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              Vardhaman College of Engineering
            </h3>
            <p className="text-gray-400">
              7835+R26, Narkhuda, Nagarguda
              <br />
              Shamshabad Rd, Kacharam
              <br />
              Telangana 501218
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong> +91 85908 68759 / +91 79816 09732
              <br />
              <strong>Email:</strong> mun@vardhaman.org
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/vcemun_hyd"
                target="_blank"
                className="hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#committees"
                  onClick={handleCommitteesClick}
                  className="text-gray-400 hover:text-white uppercase cursor-pointer"
                >
                  Committees
                </a>
              </li>
              <li>
                <Link
                  href="/usg"
                  className="text-gray-400 hover:text-white uppercase"
                >
                  Under Sec Gen (USGs)
                </Link>
              </li>
              <li>
                <Link
                  href="/chairs"
                  className="text-gray-400 hover:text-white uppercase"
                >
                  Chairs
                </Link>
              </li>
              {/* <li>
                <Dialog
                  open={openCountryMatrix}
                  onOpenChange={setOpenCountryMatrix}
                >
                  <DialogTrigger asChild>
                    <button className="text-gray-400 hover:text-white uppercase">
                      Country Matrix
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-[425px] bg-black text-white border border-red-500/20">
                    <DialogHeader>
                      <DialogTitle>Download Countries List</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to download the list of countries?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => setOpenCountryMatrix(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={() =>
                          handleDownload("/COUNTRY_MATRIX_VCEMUN25.xlsx")
                        }
                      >
                        Download
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog open={openHandbook} onOpenChange={setOpenHandbook}>
                  <DialogTrigger asChild>
                    <button className="text-gray-400 hover:text-white uppercase">
                      VCEMUN Handbook
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-[425px] bg-black text-white border border-red-500/20">
                    <DialogHeader>
                      <DialogTitle>Download VCEMUN Handbook</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to download VCEMUN Handbook?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => setOpenHandbook(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleDownload("/VCEMUN Handbook.pdf")}
                      >
                        Download
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Committees</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/committees/disec"
                  className="text-gray-400 hover:text-white"
                >
                  DISEC
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/unhrc"
                  className="text-gray-400 hover:text-white"
                >
                  UNHRC
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/aippm"
                  className="text-gray-400 hover:text-white"
                >
                  AIPPM
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/internationalpress"
                  className="text-gray-400 hover:text-white"
                >
                  International Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; Copyright <strong>VCEMUN</strong>. Student Affairs Cell. All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
