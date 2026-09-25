// NAVBAR — Cloudfolio-inspired overlay menu
// Adapted to the Shafiqur portfolio visual system.

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Gallery", href: "#gallery" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock page scrolling while menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu with Escape.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Closed navbar */}
      <header className="navbar">
        <button
          className="navbar__menu-btn"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label="Open navigation menu"
        >
          <span>MENU</span>

          <span className="navbar__menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </header>

      {/* Menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.28,
              ease: [0.65, 0, 0.35, 1],
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              className="menu-overlay__panel"
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                duration: 0.42,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.04,
              }}
            >
              {/* Menu header */}
              <div className="menu-overlay__header">
                <span>MENU</span>

                <button
                  className="menu-overlay__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <span />
                  <span />
                </button>
              </div>

              {/* Menu content */}
              <div className="menu-overlay__body">
                <nav
                  className="menu-overlay__links"
                  aria-label="Main navigation"
                >
                  <ul>
                    {NAV_LINKS.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.12 + index * 0.045,
                          duration: 0.3,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                      >
                        <a href={link.href} onClick={handleLinkClick}>
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="menu-overlay__cta"
                    onClick={handleLinkClick}
                  >
                    <span>Contact Me</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </nav>

                {/* Replace this with your portrait later */}
                <div className="menu-overlay__portrait" aria-hidden="true">
                  <div className="menu-overlay__portrait-placeholder">
                    <span>SH</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
