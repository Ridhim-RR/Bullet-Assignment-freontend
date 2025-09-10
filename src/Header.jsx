// src/Header.jsx
import HeaderLogo from './HeaderLogo';

export default function Header() {
  return (
    <header
      style={{
        background: "#191c23",
        padding: "18px 0 0 42px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <HeaderLogo />
      {/* Add navigation/menu items here */}
    </header>
  );
}
