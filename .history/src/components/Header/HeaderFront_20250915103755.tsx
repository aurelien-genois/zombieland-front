import './Header.css'
export default function Header() {
  return (
    <header>
      <img src="logo.png" alt="My App Logo" />
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      <button>Login</button>
    </header>
  )
}