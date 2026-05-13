import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineTool,
  AiOutlineCode,
  AiOutlineBook,
} from "react-icons/ai";

const NAV_ITEMS = [
  { to: "/", label: "Home", Icon: AiOutlineHome, end: true },
  { to: "/about", label: "About", Icon: AiOutlineUser },
  { to: "/education", label: "Edu", Icon: AiOutlineBook },
  { to: "/work", label: "Work", Icon: AiOutlineTool },
  { to: "/skills", label: "Skills & certs", Icon: AiOutlineCode },
  { to: "/project", label: "Projects", Icon: AiOutlineFundProjectionScreen },
  { to: "/awards", label: "Awards", Icon: AiFillStar },
];

function pathMatches(pathname, to, end) {
  const p = (pathname || "/").replace(/\/$/, "").toLowerCase() || "/";
  const t = (to || "/").replace(/\/$/, "").toLowerCase() || "/";
  if (end) return p === t;
  return p === t || p.startsWith(`${t}/`);
}

function NavBar() {
  const [expand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpand(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!expand) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setExpand(false);
    };
    document.addEventListener("keydown", onKey);

    const mq = window.matchMedia("(max-width: 767px)");
    const lock = () => {
      if (mq.matches) {
        document.body.style.overflow = "hidden";
      }
    };
    lock();
    mq.addEventListener("change", lock);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      mq.removeEventListener("change", lock);
    };
  }, [expand]);

  const navShellClass = [
    "app-navbar",
    scrolled ? "app-navbar--scrolled" : "",
    expand ? "app-navbar--menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {expand ? (
        <button
          type="button"
          className="app-navbar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setExpand(false)}
        />
      ) : null}
      <Navbar
        id="app-navbar"
        expanded={expand}
        fixed="top"
        expand="md"
        className={navShellClass}
      >
        <Container fluid="xxl" className="app-navbar-container px-3 px-md-4">
          <Navbar.Brand
            as={Link}
            to="/"
            className="app-navbar-brand d-flex align-items-center gap-2"
            aria-label="Home"
            onClick={() => setExpand(false)}
          >
            <BrandLogo className="app-navbar-brand-logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-expanded={expand}
            aria-label={expand ? "Close menu" : "Open menu"}
            className="app-navbar-toggler app-navbar-menu-btn"
            onClick={() => setExpand((e) => !e)}
          >
            <span />
            <span />
            <span />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto app-navbar-nav">
              {NAV_ITEMS.map(({ to, label, Icon, end }, index) => {
                const active = pathMatches(location.pathname, to, end);
                return (
                  <Nav.Item
                    key={to}
                    className="app-navbar-nav-item"
                    style={{ "--nav-i": index }}
                  >
                    <Nav.Link
                      as={Link}
                      to={to}
                      className={`app-nav-link${active ? " app-nav-link--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setExpand(false)}
                    >
                      <span className="app-nav-link-icon" aria-hidden>
                        <Icon />
                      </span>
                      <span className="app-nav-link-label">{label}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
