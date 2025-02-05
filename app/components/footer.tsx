import { Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
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
              <a href="https://instagram.com" className="hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              {/* LinkedIn item removed */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#committees"
                  className="text-gray-400 hover:text-white"
                >
                  Committees
                </Link>
              </li>
              <li>
                <Link href="/usg" className="text-gray-400 hover:text-white">
                  Under Sec Gen (USGs)
                </Link>
              </li>
              <li>
                <Link href="/chairs" className="text-gray-400 hover:text-white">
                  Chairs
                </Link>
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
            &copy; Copyright <strong>VCEMUN</strong>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
