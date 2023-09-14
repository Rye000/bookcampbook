import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2'
import { useCollect } from '@/hooks/collectContext';
import styles from './bot.module.css'

function LinkComponent(props) {
  const { collect, setCollect } = useCollect();

  const handleDeleteAllCollects = async () => {
    if (collect.length === 0) {
      Swal.fire({
        position: 'center',
        imageUrl: '/img/dead.png',
        imageWidth: 150,
        imageHeight: 150,
        title: '您沒有任何收藏',
        timer: 1000,
        customClass: {
          confirmButton: 'alert-btn pixel-border-purple', //按鈕樣式變更
          popup: 'm-bg-yellow pixel-border-yellow rounded-0', //背景樣式變更
          title: 'alert-title pixel-font-chinese', //標題樣式變更
        },
        buttonsStyling: false,
      })
      return; // 退出函數，不進行任何其他操作
    }
    try {
      const response = await axios.delete('http://localhost:3002/collect/Alloldcollect', {
        withCredentials: true
      });

      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          imageUrl: '/img/sad-face.png',
          imageWidth: 150,
          imageHeight: 150,
          title: '已取消所有收藏',
          timer: 1000,
          customClass: {
            confirmButton: 'alert-btn pixel-border-purple', //按鈕樣式變更
            popup: 'm-bg-yellow pixel-border-yellow rounded-0', //背景樣式變更
            title: 'alert-title pixel-font-chinese', //標題樣式變更
          },
          buttonsStyling: false,
        }).then(() => {
          setCollect([]); // 清空所有收藏
        });
      } else {
        alert('錯誤: ' + response.data.message);
      }
    } catch (error) {
      console.error('API 請求失敗:', error);
      alert('API 請求失敗');
    }
  };

  return <button className={styles['learning-option-button']} onClick={handleDeleteAllCollects} target="_blank" rel="noopener noreferrer">刪除所有收藏</button>;
}

export default LinkComponent;
