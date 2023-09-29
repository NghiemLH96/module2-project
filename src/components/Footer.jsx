import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <section className='footer-container'>
      <div className='footer-top'>
        <button onClick={()=>{
          scrollTo({
            top:0,
            behavior:'smooth'
          })
        }}>Back to top</button>
      </div>
      <div className='footer-middle'>
        <ul>
          Products
          <Link className='footer-links'>Laptops</Link>
          <Link className='footer-links'>Desktops</Link>
          <Link className='footer-links'>Monitors</Link>
          <Link className='footer-links'>Accessories</Link>
          <Link className='footer-links'>Graphic Cards</Link>
          <Link className='footer-links'>Networking</Link>
        </ul>
        <ul>
          Support
          <Link className='footer-links'>BetaGear ID</Link>
          <Link className='footer-links'>Register an Account</Link>
          <Link className='footer-links'>Beta Community</Link>
          <Link className='footer-links'>Driver and Manuals</Link>
          <Link className='footer-links'>Beta Answers</Link>
          <Link className='footer-links'>Contact Support</Link>
        </ul>
        <ul>
          About
          <Link className='footer-links'>Contact Us</Link>
          <Link className='footer-links'>Event</Link>
          <Link className='footer-links'>Awards</Link>
          <Link className='footer-links'>Beta Corner</Link>
        </ul>
        <ul>
          Policy
          <Link className='footer-links'>Private Policy</Link>
          <Link className='footer-links'>Cookie Policy</Link>
          <Link className='footer-links'>Accessibility Policy</Link>
          <Link className='footer-links'>Cookie Setting</Link>
        </ul>
      </div>
      <div className='footer-bottom'>
        <div>
          <p>Address: 4449 Nguyễn Cửu Phú str. Tân Tạo A ward Bình Tân distrist Hồ Chí Minh city Việt Nam</p>
          <p>Email:isaacisc01022014@gmail.com</p>
          <p>Hotline: 0767552364</p>
          <p>Open Hours: 07:00AM ~ 09:00PM</p>
        </div>
        <div>
          <p><sup>©</sup> 2023 Acer Inc.</p>
        </div>
      </div>
    </section>
  )
}
