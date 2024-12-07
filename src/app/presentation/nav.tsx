import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/presentation/todos">Todos</Link> |<Link href="/">About</Link>
  </nav>
);

export default Nav;
