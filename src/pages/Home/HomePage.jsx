import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.scss'

export default function HomePage() {
  const navigate = useNavigate();
  

  return (
    <div className='homepage-container'>
      <div className='banner-container'>
        <video autoPlay loop className='banner-video' src="https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/videos%2FPredator.mp4?alt=media&token=1560de4c-2321-4a0c-af88-4d0ca1b3a7f1&_gl=1*14wspv8*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NTg5OTQ4OC4zLjEuMTY5NTkwMTc3OC4zNC4wLjA."></video>
        <div className='banner-title'>
            <p>PREDATOR BIFROST Intel<sup>®</sup> Arc™ A750 OC</p>
            <h1>SUPERCHARGED GAMING LIES WITHIN</h1>
            <span onClick={()=>{navigate("/predator")}} className='banner-explore'>Explore</span>
        </div>
      </div>
      <div className='categories-byDevice'>
        <h2 className='categories-title'>Browse Popular Categories</h2>
        <div className='categories'>
          <div onClick={()=>{navigate("/all-products/laptops")}} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator-helios-300-spatiallabs-edition-homepage-1?$responsive$" alt="" />
            <span className='categorie-text' >Laptops</span>
          </div>
          <div  onClick={()=>{navigate("/all-products/desktops")}} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator-Orion-7000-Homepage-Photo?$responsive$" alt="" />
            <span className='categorie-text'>Desktops</span>
          </div>
          <div onClick={()=>{navigate("/all-products/monitors")}} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/XB3%20series?$responsive$" alt="" />
            <span className='categorie-text'>Monitors</span>
          </div>
          <div onClick={()=>{navigate("/all-products/projectors")}} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/Predator_GD711-1?$responsive$" alt="" />
            <span className='categorie-text'>Projectors</span>
          </div>
          <div onClick={()=>{navigate("/all-products/accessories")}} className='categorie'>
            <img src="https://images.acer.com/is/image/acer/product-Predator-Galea_350-3?$responsive$" alt="" />
            <span className='categorie-text'>Accessories</span>
          </div>
        </div>
      </div>
      <div className='categories-byBrand'>
        <h2 className='categories-title'>Select your brand</h2>
        <div className='categories'>
          <div onClick={()=>{navigate("/all-products/predator")}} className='categorie'>
            <img src="https://static.wixstatic.com/media/673167_0c3ee37cc1c44e6ca11f8e8c2c227c7b~mv2.gif/v1/fill/w_500,h_600,al_c/673167_0c3ee37cc1c44e6ca11f8e8c2c227c7b~mv2.gif" alt="" />
            <span className='categorie-text'>PREDATOR</span>
          </div>
          <div onClick={()=>{navigate("/all-products/asus-tuf")}} className='categorie'>
            <img src="https://images.pling.com/img/00/00/59/49/20/1452509/d8b43a82841eb4f0d60b9551de22605db9e18331f285dd1850c1917b03af26969a45.png" alt="" />
            <span className='categorie-text'>ASUS TUF</span>
          </div>
          <div onClick={()=>{navigate("/all-products/asus-rog")}} className='categorie'>
            <img src="https://www.pngmart.com/files/22/Republic-Of-Gamers-Logo-Transparent-PNG.png" alt="" />
            <span className='categorie-text'>ASUS ROG</span>
          </div>
          <div onClick={()=>{navigate("/all-products/alienware")}} className='categorie'>
            <img src="https://www.canitcash.com/wp-content/uploads/2020/12/Sell-Alienware-2.png" alt="" />
            <span className='categorie-text'>ALIENWARE</span>
          </div>
          <div onClick={()=>{navigate("/all-products/gigabyte-AORUS")}} className='categorie'>
            <img src="https://www.gigabyte.com/FileUpload/Global/GMicroSite/93/Activity/436/images/mb_aoruslogo.png" alt="" />
            <span className='categorie-text'>GIGABYTE AORUS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
