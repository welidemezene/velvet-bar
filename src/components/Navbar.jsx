import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { navLinks } from '../../constants/index.js';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      'nav',
      { backgroundColor: 'transparent' },
      {
        backgroundColor: '#00000050',
        backdropFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: 'nav',
          start: 'bottom top',
        },
      }
    );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-white">
      <div className="flex flex-row justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
          <p className="text-base font-semibold">Velvet Pour</p>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id} className="text-gray-400 hover:text-white">
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button - ☰ or × */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-white z-[999]"
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile Slide-Out Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-55 w-80 bg-#00000050 text-white p-6 z-50 transform translate-x-full md:hidden mt-16"
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.id} className="text-gray-200 hover:text-white">
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)} // Close when clicking link
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
