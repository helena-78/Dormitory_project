'use client'
import Room from 'component/Room/Room';
import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, CircularProgress } from '@mui/material'
import { BorderBottom } from '@mui/icons-material'
import LegendLabel from 'component/Floors/LegendLabel';
import '@fontsource/inter';
import './floorlayout.css';

const fakeDataSet1 = [
  {
    "room_id": 2,
    "number": "101",
    "available_places": "2",
    "image": "awwwww",
    "price": "2032",
    "gender": "F"
  },
  {
    "room_id": 1,
    "number": "102",
    "available_places": "0",
    "image": "awwwww",
    "price": "19999",
    "gender": "M"
  }
];

const fakeDataSet2 = [
  {
    "room_id": 3,
    "number": "201",
    "available_places": "1",
    "image": "awwwww",
    "price": "1500",
    "gender": "M"
  },
  {
    "room_id": 4,
    "number": "202",
    "available_places": "3",
    "image": "awwwww",
    "price": "2500",
    "gender": "F"
  },
  {
    "room_id": 2,
    "number": "203",
    "available_places": "2",
    "image": "awwwww",
    "price": "2032",
    "gender": "F"
  },
  {
    "room_id": 1,
    "number": "204",
    "available_places": "0",
    "image": "awwwww",
    "price": "19999",
    "gender": "M"
  },
  {
    "room_id": 2,
    "number": "205",
    "available_places": "2",
    "image": "awwwww",
    "price": "2032",
    "gender": "F"
  },
  {
    "room_id": 1,
    "number": "206",
    "available_places": "0",
    "image": "awwwww",
    "price": "19999",
    "gender": "M"
  },
  {
    "room_id": 1,
    "number": "207",
    "available_places": "0",
    "image": "awwwww",
    "price": "19999",
    "gender": "M"
  }
];

const fakeDataSet3 = [
];

const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/rooms/floor';
const QUERY_PARAM = 'floor';

const addUndefinedItems = (data) => {
  const undefinedItem = {
    room_id: "undefined",
    number: "undefined",
    floor: 0,
    available_places: "undefined",
    image: "undefined",
    price: "undefined",
    gender: "undefined"
  };
  if (data.length < 2) {
    const missingItems = 2 - data.length;
    return data.concat(Array(missingItems).fill(undefinedItem));
  }
  else if (data.length > 26) {
    return data.slice(0, 26);
  }
  return data;
};

const FloorLayout = () => {
  const [contentIndex, setContentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async (index) => {
    const url = `${BASE_URL}${ENDPOINT}/?${QUERY_PARAM}=${index + 1}`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => setItems(addUndefinedItems(data)))
      .finally(() => {setLoading(false)})
      // let data;
      // switch (index) {
      //   case 0:
      //     data = fakeDataSet1;
      //     break;
      //   case 1:
      //     data = fakeDataSet2;
      //     break;
      //   case 2:
      //     data = fakeDataSet3;
      //     break;
      //   default:
      //     data = fakeDataSet1;
      // }
      // setItems(addUndefinedItems(data));
      
  };

  const divideArray = (items) => {
    const midIndex = Math.ceil(items.length / 2); // Round up to ensure the first array gets the extra item if the length is odd
    const firstRowItems = items.slice(0, midIndex);
    let secondRowItems = items.slice(midIndex).reverse();
    
    return { firstRowItems, secondRowItems };
  };

  useEffect(() => {
    fetchItems(contentIndex);
  }, [contentIndex]);

  const handleButtonClick = (index) => {
    if(index !== contentIndex)
    {
      setLoading(true);
      setContentIndex(index);
    }
  };

  const renderContent = () => {
    const {firstRowItems, secondRowItems} = divideArray(items);


    const getContentStyle = (isLast) => ({
      borderTop: '4px solid black',
      borderLeft: '4px solid black',
      borderBottom: '4px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(isLast && { borderRight: '4px solid black' }),
    });

    if (loading) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <Grid container spacing={2} columns={firstRowItems.length} sx={{}}>
          {firstRowItems.map((item, idx) => (
            <Grid item xs={1} key={item.room_id + idx} sx={getContentStyle(idx === firstRowItems.length - 1)}>
              <Box sx ={{ width: '100%', height: '220px',paddingRight : '6px',paddingBottom : '6px',paddingLeft : '3px',paddingTop : '3px'  }}>
                <Room item ={item}/>
                {/* <div>{`Room № ${item.number}`}</div>
                <div>{`Places left: ${item.available_places}`}</div>
                <div>{`price: ${item.price}`}</div>
                <div>{`Gender: ${item.gender}`}</div> */}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ height: 50, }} /> {/* Empty gap between the two rows */}
        <Grid container spacing={2} columns={secondRowItems.length}>
          {secondRowItems.map((item, idx) => (
            <Grid item xs={1} key={item.room_id + idx} sx={getContentStyle(idx === secondRowItems.length - 1)}>
              <Box sx ={{ width: '100%', height: '220px',paddingRight : '6px',paddingBottom : '6px',paddingLeft : '3px',paddingTop : '3px' }}>
                <Room item ={item}/>
                {/* <div>{`Room № ${item.number}`}</div>
                <div>{`Places left: ${item.available_places}`}</div>
                <div>{`price: ${item.price}`}</div>
                <div>{`Gender: ${item.gender}`}</div> */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ paddingTop: '10%', paddingLeft: '10%', paddingRight: '10%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginRight: 2, paddingBottom: '5vh' }}>
        <Button variant="outlined" onClick={() => handleButtonClick(0)} sx={{ marginRight:10 }}>
          Поверх 1
        </Button>
        <Button variant="outlined" onClick={() => handleButtonClick(1)} sx={{ marginRight: 10 }}>
          Поверх 2
        </Button>
        <Button variant="outlined" onClick={() => handleButtonClick(2)}>
          Поверх 3
        </Button>
      </Box>
      <Box>{renderContent()}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 4 }}>
      <LegendLabel color="#39b8f7" label="Кімната вільна"/>
      <LegendLabel color="#575afa" label="Кімната має мешканців"/>
      <LegendLabel color="#7300ff" label="Кімната заповнена"/>
      <LegendLabel color="#525252" label="Кімната недоступна"/>
    </Box>
    </Box>
  );
};

export default FloorLayout;
