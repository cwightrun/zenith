import React from 'react';

function Footer(props) {
  return (
    <footer className="footer">
      &copy;{new Date().getFullYear()} created by <a href="https://www.twitter.com/cwightrun">casey wight</a>
    </footer>
  )
}

export default Footer;