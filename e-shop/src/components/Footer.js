import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">E-Shop</h3>
          <p className="mb-4">
            Get the best products for your store with the  right price .
          </p>
          <p className="text-sm">&copy; {new Date().getFullYear()} @E-Shop. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M9.197 21v-9.3h-3v-4h3v-3c0-3.057 1.492-5.7 5.5-5.7h3v4h-3c-.551 0-1.5.224-1.5 1v3h4.5v4h-4.5v9.3h-4.5z"/></svg>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.937 4.937 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.196 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149a4.923 4.923 0 0 0-.666 2.475c0 1.708.869 3.215 2.19 4.1a4.902 4.902 0 0 1-2.229-.616v.061c0 2.384 1.693 4.374 3.946 4.827a4.935 4.935 0 0 1-2.224.084c.626 1.956 2.444 3.379 4.6 3.419a9.875 9.875 0 0 1-6.102 2.105c-.395 0-.785-.023-1.17-.068a13.94 13.94 0 0 0 7.557 2.213c9.054 0 14-7.5 14-14 0-.213-.005-.425-.015-.636A9.952 9.952 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 0c3.256 0 3.667.012 4.947.072 1.272.059 2.14.267 2.96.568a6.463 6.463 0 0 1 2.307 1.535 6.463 6.463 0 0 1 1.535 2.307c.301.82.509 1.688.568 2.96.06 1.28.072 1.691.072 4.947s-.012 3.667-.072 4.947c-.059 1.272-.267 2.14-.568 2.96a6.463 6.463 0 0 1-1.535 2.307 6.463 6.463 0 0 1-2.307 1.535c-.82.301-1.688.509-2.96.568-1.28.06-1.691.072-4.947.072s-3.667-.012-4.947-.072c-1.272-.059-2.14-.267-2.96-.568a6.463 6.463 0 0 1-2.307-1.535 6.463 6.463 0 0 1-1.535-2.307c-.301-.82-.509-1.688-.568-2.96-.06-1.28-.072-1.691-.072-4.947s.012-3.667.072-4.947c.059-1.272.267-2.14.568-2.96a6.463 6.463 0 0 1 1.535-2.307 6.463 6.463 0 0 1 2.307-1.535c.82-.301 1.688-.509 2.96-.568C8.333.012 8.744 0 12 0zm0 2.162c-3.207 0-3.595.011-4.86.07-1.185.055-1.833.243-2.26.405a4.428 4.428 0 0 0-1.635 1.065 4.428 4.428 0 0 0-1.065 1.635c-.162.427-.35 1.075-.405 2.26-.059 1.265-.07 1.653-.07 4.86s.011 3.595.07 4.86c.055 1.185.243 1.833.405 2.26a4.428 4.428 0 0 0 1.065 1.635 4.428 4.428 0 0 0 1.635 1.065c.427.162 1.075.35 2.26.405 1.265.059 1.653.07 4.86.07s3.595-.011 4.86-.07c1.185-.055 1.833-.243 2.26-.405a4.428 4.428 0 0 0 1.635-1.065 4.428 4.428 0 0 0 1.065-1.635c.162-.427.35-1.075.405-2.26.059-1.265.07-1.653.07-4.86s-.011-3.595-.07-4.86c-.055-1.185-.243-1.833-.405-2.26a4.428 4.428 0 0 0-1.065-1.635 4.428 4.428 0 0 0-1.635-1.065c-.427-.162-1.075-.35-2.26-.405-1.265-.059-1.653-.07-4.86-.07zm0 5.948c-3.359 0-6.09 2.73-6.09 6.09s2.73 6.09 6.09 6.09 6.09-2.73 6.09-6.09-2.73-6.09-6.09-6.09zm0 2.162a3.928 3.928 0 1 1 0 7.857 3.928 3.928 0 0 1 0-7.857zm7.832-.946a1.44 1.44 0 1 1-2.879 0 1.44 1.44 0 0 1 2.879 0z"/></svg>
            </a>
            {/* Add more social links if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
