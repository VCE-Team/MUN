import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <strong>Phone:</strong> +91 9121890849 / +91 9010736004
              <br />
              <strong>Email:</strong> mun@vardhaman.org
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/munvce"
                className="hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/munvce-517773285"
                className="hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
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
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/committees"
                  className="text-gray-400 hover:text-white"
                >
                  Committees
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-conduct"
                  className="text-gray-400 hover:text-white"
                >
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-400 hover:text-white">
                  Rules of Procedure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Committees</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/committees/general-assembly"
                  className="text-gray-400 hover:text-white"
                >
                  General Assembly
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/unsc"
                  className="text-gray-400 hover:text-white"
                >
                  UN Security Council
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/unhrc"
                  className="text-gray-400 hover:text-white"
                >
                  UN Human Rights Council
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/who"
                  className="text-gray-400 hover:text-white"
                >
                  World Health Organization
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/lok-sabha"
                  className="text-gray-400 hover:text-white"
                >
                  Lok Sabha
                </Link>
              </li>
              <li>
                <Link
                  href="/committees/international-press"
                  className="text-gray-400 hover:text-white"
                >
                  International Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              COMING SOON !! MORE UPDATES PLEASE FOLLOW
            </p>
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
