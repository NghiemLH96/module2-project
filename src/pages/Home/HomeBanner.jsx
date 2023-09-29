import React from 'react'
import './home.scss'
import Link from 'antd/es/typography/Link'

export default function HomeBanner() {
  return (
    <div className='banner-container'>
        <video autoPlay loop className='banner-video' src="https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/videos%2FPredator.mp4?alt=media&token=1560de4c-2321-4a0c-af88-4d0ca1b3a7f1&_gl=1*14wspv8*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NTg5OTQ4OC4zLjEuMTY5NTkwMTc3OC4zNC4wLjA."></video>
        <div className='banner-title'>
            <p>PREDATOR BIFROST Intel<sup>®</sup> Arc™ A750 OC</p>
            <h1>SUPERCHARGED GAMING LIES WITHIN</h1>
            <Link className='banner-explore'>Explore</Link>
        </div>
    </div>
  )
}
