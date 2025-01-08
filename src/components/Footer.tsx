import Image from 'next/image'
import Link from 'next/link'

import { codewars, github, linkedin } from '~/icons'

import footerStyle from '@/styles/footer.module.scss'

export function Footer() {
  return (
    <footer className={footerStyle.container}>
      <p>Sebastian&nbsp;Remm ©&nbsp;2021&nbsp;-&nbsp;2025</p>
      <Link
        href="https://github.com/SebiBasti"
        target="_blank"
        data-alt="github"
      >
        <Image src={github} alt="github icon" fill />
      </Link>
      <Link
        href="https://www.linkedin.com/in/sebastian-remm/"
        target="_blank"
        data-alt="linkedin"
      >
        <Image src={linkedin} alt="linkedin icon" fill />
      </Link>
      <Link
        href="https://www.codewars.com/users/SebiBasti"
        target="_blank"
        data-alt="codewars"
      >
        <Image src={codewars} alt="codewars icon" fill />
      </Link>
    </footer>
  )
}
