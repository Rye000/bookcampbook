import React, { useState,useEffect } from 'react'
// import NewbookHome from '@/components/newbook/index'
// import axios from 'axios'
import Breadcrumb2 from '@/components/share/guide-pagination'
import NewBookTopAd from '@/components/newbook/newbook-top-ad'
import FloatCoupon from '@/components/member/coupon/float-coupon'
import NewBookList from '@/components/newbook/newbook-list'
import RankBookBlock from '@/components/newbook/rankbookblock'
import FocusBooks from '@/components/newbook/focus-books'
import AllNewBook from '@/components/newbook/all-newbook'
import PageInation from '@/components/share/pageination'
import Link from 'next/link'

export default function NewBook() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const columnClass = windowWidth < 500 ? 'col-12' : 'col-9';
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
}, []);
  return (
    <>
      <div className='row flex-column'>
        {/* <div className='col-9 mx-auto'>
          <Breadcrumb2 />
          麵包穴
        </div> */}
        <div className='col p-0 '>
          <NewBookTopAd />
          {/* 輪播圖 */}
        </div>
      </div>
      <div className='d-flex'>
      {windowWidth >= 500 && (
          <div className='col'>
            <NewBookList />
            {/* 書籍分類 */}
            <FloatCoupon />
            {/* 優惠卷 */}
          </div>
        )}
        <div className={`${columnClass} d-flex flex-column px-3 mt-5`}>
        {windowWidth >= 500 && (
          <RankBookBlock />
          //熱銷排行
        )}
        
          <FocusBooks />
          {/* 焦點書籍 */}
          <AllNewBook />
          {/* 書 */}
          {/* <div className='px-4'>
            <PageInation />
          </div> */}
            {/* 分頁 */}
        </div>
        {windowWidth >= 500 && (
          <div className='col'>
          
          </div>
        )}
      </div>
      {/* <NewbookHome /> */}
    </>
  )
}
