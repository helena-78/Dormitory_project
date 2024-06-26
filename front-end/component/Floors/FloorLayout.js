import React, { useEffect, useState} from 'react';
import { Box, Button, Grid, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

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
  }
];

const fakeDataSet3 = [
  {
    "room_id": 5,
    "number": "301",
    "available_places": "0",
    "image": "awwwww",
    "price": "3000",
    "gender": "M"
  },
  {
    "room_id": 6,
    "number": "302",
    "available_places": "2",
    "image": "awwwww",
    "price": "3500",
    "gender": "F"
  }
];

const addUndefinedItems = (data) => {
  if (data.length < 26) {
    const missingItems = 26 - data.length;
    const undefinedItem = {
      room_id: "undefined",
      number: "undefined",
      available_places: "undefined",
      image: "undefined",
      price: "undefined",
      gender: "undefined"
    };
    return data.concat(Array(missingItems).fill(undefinedItem));
  } else if (data.length > 26) {
    return data.slice(0, 26);
  }
  return data;
};

const FloorLayout = () => {
  const [contentIndex, setContentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchItems = async (index) => {
    try {
      let data;
      switch (index) {
        case 0:
          data = fakeDataSet1;
          break;
        case 1:
          data = fakeDataSet2;
          break;
        case 2:
          data = fakeDataSet3;
          break;
        default:
          data = fakeDataSet1;
      }
      setItems(addUndefinedItems(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(contentIndex);
  }, [contentIndex]);

  const handleButtonClick = (index) => {
    setLoading(true);
    setContentIndex(index);
  };

  const handleItemClick = (item) => {
    const floor = contentIndex + 1; // Assuming floor is 1-based index

    const params = new URLSearchParams({
      room_id: item.room_id.toString(),
      number: item.number,
      available_places: item.available_places,
      price: item.price,
      gender: item.gender,
      floor: floor.toString()
    });

    router.push(`/order/booking_detail?${params.toString()}`);
  };

  const renderContent = () => {
    const firstRowItems = items.slice(0, 13);
    const secondRowItems = items.slice(13, 26);

    const getContentStyle = () => ({
      border: '1px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    if (loading) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <Grid container spacing={2} columns={13}>
          {firstRowItems.map((item, idx) => (
            <Grid item xs={1} key={item.room_id + idx} sx={getContentStyle()} onClick={() => handleItemClick(item)}>
              <Box>
                <div>{`Room № ${item.number}`}</div>
                <div>{`Places left: ${item.available_places}`}</div>
                <div>{`price: ${item.price}`}</div>
                <div>{`Gender: ${item.gender}`}</div>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ height: 50 }} /> {/* Empty gap between the two rows */}
        <Grid container spacing={2} columns={13}>
          {secondRowItems.map((item, idx) => (
            <Grid item xs={1} key={item.room_id + idx} sx={getContentStyle()} onClick={() => handleItemClick(item)}>
              <Box>
                <div>{`Room № ${item.number}`}</div>
                <div>{`Places left: ${item.available_places}`}</div>
                <div>{`price: ${item.price}`}</div>
                <div>{`Gender: ${item.gender}`}</div>
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
        <Button variant="contained" onClick={() => handleButtonClick(0)} sx={{ marginRight: 1 }}>
          Поверх 1
        </Button>
        <Button variant="contained" onClick={() => handleButtonClick(1)} sx={{ marginRight: 1 }}>
          Поверх 2
        </Button>
        <Button variant="contained" onClick={() => handleButtonClick(2)}>
          Поверх 3
        </Button>
      </Box>
      <Box>{renderContent()}</Box>
    </Box>
  );
};

export default FloorLayout;
