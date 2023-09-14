import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Cancel() {
    useEffect(() => {
        Swal
            .fire({
                icon: 'error',
                title: '交易失敗',
                text: '您將返回購物車...',
                customClass: {
                    confirmButton: 'alert-btn pixel-border-purple me-5', //按鈕樣式變更
                    cancelButton: 'alert-btn-cancle pixel-border-grey',
                    popup: 'm-bg-yellow pixel-border-yellow rounded-0', //背景樣式變更
                    title: 'alert-title pixel-font-chinese', //標題樣式變更
                  },
            })
            .then(() => {
                window.location.href = "/cart"
            })
    },[])
    return (
        <>
            
        </>
    )
}
