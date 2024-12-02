/* eslint-disable react/prop-types */
export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="heading">
        <img src="/icons/check.png" />
        <h1>TodoNest</h1>
      </div>
      {children}
    </nav>
  );
}
