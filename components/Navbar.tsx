import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="primary-header flex w-100">
      <Link href="/">
        <a className="logo">NM</a>
      </Link>
      <nav>
        <ul id="primary-navigation" className="primary-navigation flex">
          <li>
            <Link href="/music">
              <a>Music</a>
            </Link>
          </li>
          <li>
            <Link href="/dev">
              <a>Dev</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
