import Link from 'next/link';

export const Header = () => {
  return (
    <header className={'flex justify-between gap-[20px] p-[20px] bg-sky-950 text-white'}>
      <h1>E-Commerce</h1>

      <nav>
        <ul className={'flex gap-[20px]'}>
          <li>
            <Link href={'/products'}>Products</Link>
          </li>
          <li>
            <Link href={'/about-us'}>About us</Link>
          </li>
          <li>
            <Link href={'/reviews'}>Review</Link>
          </li>
          <li>
            <Link href={'/authform'}>
              <img src={"/images/logologin.png"} alt="Login" width={30} height={30} />
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  )
}
