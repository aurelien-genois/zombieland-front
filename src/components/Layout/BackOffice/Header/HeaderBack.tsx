import './HeaderBack.css'
export default function HeaderBack() {
  return (
    <header>
      <img src="logo.png" alt="My App Logo" />
      <nav>
        <ul>
          <li>Home</li>
          <li>activity</li>
          <li>user</li>
        </ul>
      </nav>
      <button>logout</button>
    </header>
  )
}