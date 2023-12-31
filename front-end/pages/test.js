import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function test() {
  // 印JSON檔案用
  const [city, setCity] = useState([])
  const [town, setTown] = useState([])
  const [road, setRoad] = useState([])

  // 紀錄選擇的檔案
  const [list, setList] = useState({
    commandid: 'SearchStore',
    city: '',
    town: '',
    roadname: '',
  })
  const [cityCH, setCityCH] = useState([])
  const [townCH, setTownCH] = useState([])
  const [roadCH, setRoadCH] = useState([])

  // 第一步驟 - 抓 city Json
  useEffect(() => {
    fetch('/json/cityid.json')
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city)
      })
      .catch((error) => {
        console.error('Error loading JSON:', error)
      })
  }, [])

  // 選擇了city - 抓 town Json
  const handleCity = async (e) => {
    setCityCH(e.currentTarget.selectedIndex)

    //設定要的LIST
    setList((prevList) => ({
      ...prevList,
      city: e.target.value,
    }))
  }
  useEffect(() => {
    try {
      fetch('/json/cityid.json')
        .then((res) => res.json())
        .then((data) => {
          setTown(data.city[cityCH - 1].town)
        })
        .catch((error) => {
          console.error('Error loading JSON:', error)
        })
    } catch (error) {
      console.error('錯誤了', error)
    }
  }, [cityCH])
  // 選擇了town - 抓 Road Json
  const handleTown = async (e) => {
    setTownCH(e.currentTarget.selectedIndex)
    //設定要的LIST
    setList((prevList) => ({
      ...prevList,
      town: e.target.value,
    }))

    const mychoose = {
      commandid: 'SearchRoad',
      city: list.city,
      town: e.target.value,
    }

    try {
      await axios
        .post(
          'http://localhost:3002/delivery',
          { mychoose },
          {
            Headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          console.log(res.data)
          setRoad(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {}
  }

  // 選擇了Road - 抓 所有檔案
  // 選完才顯示
  const [showBox, setShowBox] = useState(false)
  const [allData, setAllData] = useState([])
  const handleRoad = async (e) => {
    setRoadCH(e.currentTarget.selectedIndex)
    //設定要的LIST
    setList((prevList) => ({
      ...prevList,
      roadname: e.target.value,
    }))
    setShowBox(true)
  }
  useEffect(() => {
    try {
      axios
        .post('http://localhost:3002/delivery/address', list, {
          Headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setAllData(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.error('Error receiving coupon:', error)
    }
  }, [roadCH])

  return (
    <>
      {/* 選擇區 */}
      <div className='bg-white'>
        <div>
          {/* 選擇縣市 */}
          <select
            defaultValue='0'
            onChange={(e) => {
              handleCity(e)
            }}
          >
            <option value='0' disabled>
              請選擇
            </option>
            {city.map((v) => {
              return (
                <option key={v.areaID} value={v.area}>
                  {v.area}
                </option>
              )
            })}
          </select>
          {/* 選擇鄉鎮 */}
          <select
            defaultValue='0'
            onChange={(e) => {
              handleTown(e)
            }}
          >
            <option value='0' disabled>
              請選擇
            </option>
            {town.map((v) => {
              return (
                <option key={v.TownID} value={v.TownName}>
                  {v.TownName}
                </option>
              )
            })}
          </select>
          {/* 選擇街道 */}
          <select
            defaultValue='0'
            onChange={(e) => {
              handleRoad(e)
            }}
          >
            <option value='0' disabled>
              請選擇
            </option>
            {road.map((v, i) => {
              return (
                <option key={i} value={v.road}>
                  {v.road}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      {/* 顯示區 */}
      {showBox == false
        ? ''
        : allData.map((v) => {
            return (
                <div key={v.id} className='row pixel-font-chinese text-yellow m-bg-purple my-3'>
                  <div  className='col-10'>
                    <div>店號：{v.id}</div>
                    <div>店名：{v.storeName}</div>
                    <div>電話：{v.phone}</div>
                    <div>地址：{v.address}</div>
                  </div>
                  <div className='col-2'>地圖</div>
                </div>
            )
          })}
    </>
  )
}
