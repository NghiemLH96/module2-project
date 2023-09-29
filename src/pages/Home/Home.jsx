import React from 'react'
import './home.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
      <div className='categories-byDevice'>
        <h2 className='categories-title'>Browse Popular Categories</h2>
        <div className='categories'>
          <Link to={"/laptops"} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator-helios-300-spatiallabs-edition-homepage-1?$responsive$" alt="" />
            <span className='categorie-text' >Laptops</span>
          </Link>
          <Link to={"/desktops"} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator-Orion-7000-Homepage-Photo?$responsive$" alt="" />
            <span className='categorie-text'>Desktops</span>
          </Link>
          <Link to={"/monitors"} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/XB3%20series?$responsive$" alt="" />
            <span className='categorie-text'>Monitors</span>
          </Link>
          <Link to={"/projectors"} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator_GD711-1?$responsive$" alt="" />
            <span className='categorie-text'>Projectors</span>
          </Link>
          <Link to={"/accessories"} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/product-Predator-Galea_350-3?$responsive$" alt="" />
            <span className='categorie-text'>Accessories</span>
          </Link>
        </div>
      </div>
      <div className='categories-byBrand'>
        <h2 className='categories-title'>Select your brand</h2>
        <div className='categories'>
          <Link to={"/predator"} className='categorie'>
            <img src="https://static.wixstatic.com/media/673167_0c3ee37cc1c44e6ca11f8e8c2c227c7b~mv2.gif/v1/fill/w_500,h_600,al_c/673167_0c3ee37cc1c44e6ca11f8e8c2c227c7b~mv2.gif" alt="" />
            <span className='categorie-text'>PREDATOR</span>
          </Link>
          <Link to={"/asus-tuf"} className='categorie'>
            <img src="https://images.pling.com/img/00/00/59/49/20/1452509/d8b43a82841eb4f0d60b9551de22605db9e18331f285dd1850c1917b03af26969a45.png" alt="" />
            <span className='categorie-text'>ASUS TUF</span>
          </Link>
          <Link to={"/asus-rog"} className='categorie'>
            <img src="https://www.pngmart.com/files/22/Republic-Of-Gamers-Logo-Transparent-PNG.png" alt="" />
            <span className='categorie-text'>ASUS ROG</span>
          </Link>
          <Link to={"/alienware"} className='categorie'>
            <img src="https://www.canitcash.com/wp-content/uploads/2020/12/Sell-Alienware-2.png" alt="" />
            <span className='categorie-text'>ALIENWARE</span>
          </Link>
          <Link to={"/gigabyte-AORUS"} className='categorie'>
            <img src="https://www.gigabyte.com/FileUpload/Global/GMicroSite/93/Activity/436/images/mb_aoruslogo.png" alt="" />
            <span className='categorie-text'>GIGABYTE AORUS</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
