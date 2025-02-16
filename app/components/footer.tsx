"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const countriesListUrl = "/COUNTRY_MATRIX_VCEMUN25.xlsx";
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = countriesListUrl;
    link.download = "COUNTRY_MATRIX_VCEMUN25.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <strong>Phone:</strong> +91 77020 40524 / +91 98495 83637
              <br />
              <strong>Email:</strong> mun@vardhaman.org
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/vcemun_hyd"
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
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white uppercase"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white uppercase"
                >
                  Committees
                </Link>
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
              <li>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="text-gray-400 hover:text-white uppercase">
                      Country Matrix
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>Download Countries List</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to download the list of countries?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => setOpen(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button type="button" onClick={handleDownload}>
                        Download
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
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
                  href="/committees/ecosoc"
                  className="text-gray-400 hover:text-white"
                >
                  ECOSOC
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
