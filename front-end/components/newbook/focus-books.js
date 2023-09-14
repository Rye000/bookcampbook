import React, { useState, useEffect } from 'react';
import FrontTitle from '@/components/share/front-title';
import styles from '@/components/newbook/focus-books.module.css';
import Link from 'next/link';

export default function FocusBooks() {
  const booksData = [
    {
      title: 'React 學習手冊 第二版',
      description: '本書將傳授您如何快速高效的React應用。',
      image: 'http://localhost:3002/public/img/oldbookimgs/jo12m8jE.png',
      link: '/newbook/459',
    },
    {
      title: '原子習慣',
      description:
        '每天都進步1%一年後你會進步37倍每天都退步1%一年後你會弱化到趨近於0你的一點小改變..',
      image: 'http://localhost:3002/public/img/oldbookimgs/31.png',
      link: '/newbook/106',
    },
    {
      title: '網頁應用程序設計：使用Node和Express(第二版)',
      description:
        'Express在穩健的框架和完全不使用框架之間取得巧妙的平衡',
      image: 'http://localhost:3002/public/img/oldbookimgs/getI141mage.png',
      link: '/newbook/460',
    },
  ]

  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setCurrentBookIndex((prevIndex) =>
        prevIndex === 0 ? booksData.length - 1 : prevIndex - 1
      );
    } else if (direction === 'right') {
      setCurrentBookIndex((prevIndex) =>
        prevIndex === booksData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <div className='newbook-top'>
      <FrontTitle icon='fa-solid fa-expand me-2' title='焦點書籍' />
      <div className='row px-3'>
        {isMobile ? (
          <>
            {/* <div className='col-1 '>
              <button
                className='back-btn'
                type='button'
                onClick={() => handleArrowClick('left')}
              >
                <img src='/img/icon-pixel/diamond.svg' />
              </button>
            </div> */}
            <div className={`${styles.leftbton} col-12 col-md-4`}>
              <SingleBookDisplay book={booksData[currentBookIndex]} />
              <button
                className='back-btn'
                type='button'
                onClick={() => handleArrowClick('left')}
              >
                <img src='/img/icon-pixel/diamond.svg' />
              </button>
              <button
                className='next-btn'
                type='button'
                onClick={() => handleArrowClick('right')}
              >
                <img src='/img/icon-pixel/diamond.svg' />
              </button>
            </div>
          
            {/* <div className='col-1 '>
              <button
                className='next-btn'
                type='button'
                onClick={() => handleArrowClick('right')}
              >
                <img src='/img/icon-pixel/diamond.svg' />
              </button>
            </div> */}
          </>
        ) : (
          booksData.map((book, index) => (
            <div className='col-4' key={index}>
              <SingleBookDisplay book={book} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SingleBookDisplay({ book }) {
  return (
    <div className='position-relative'>
      <div className={styles.focusBook}>
        <img src={book.image} />
      </div>
      <div className={styles.imgSpace}></div>
      <div className={`${styles.goBtnPosition} more-btn`}>
        <Link href={book.link}>
          <button className='fw-bold'>
            前往了解
            <i className='fa-solid fa-arrow-right-long ms-2'></i>
          </button>
        </Link>
      </div>
      <div className={styles.focusContent}>
        <h5 className='fw-bold mb-2'>{book.title}</h5>
        <span>{book.description}</span>
      </div>
    </div>
  );
}
