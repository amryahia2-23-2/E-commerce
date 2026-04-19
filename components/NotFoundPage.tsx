import Link from "next/link";
import Image from "next/image";
import { Image_404 } from "@/assests";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 mb-16 lg:mb-0">
      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row gap-10 items-center">
        
        {/* Text Section */}
        <div className="text-center lg:text-left lg:mt-16 lg:w-96">
          <h1 className="text-6xl font-bold text-green-600 mb-4">
            404
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>

          <p className="text-gray-500 mb-6">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex justify-center flex-1">
          <Image
            src={Image_404}
            alt="404 illustration"
            width={400}
            height={400}
            className="w-full  object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}