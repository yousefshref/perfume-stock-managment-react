import React from 'react'
import Navbar from '../components/Navbar'
import SaleSection from '../components/SaleSection'
import { isEnglish } from '../utlis/isEnglish'

const SalesPage = () => {
  return (
    <div className="container-cc">
    {/* navbar */}
    <Navbar />

    {/* content */}
    <div className={isEnglish ? "content-container ms-auto" : "content-container me-auto"}>
      <SaleSection />
    </div>
  </div>
  )
}

export default SalesPage
