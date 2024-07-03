'use client'

import {styled} from "@mui/material/styles";
import {useContext, useState} from "react";
import {Input, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import styles from '@/app/AdminPanel/Rooms/EditRoom/EditRoom.css'
import {AlertContext} from "../../../../../component/AdminPanel/Alerts/AlertContext";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/rooms';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AddRoom() {
    const url = `${BASE_URL}${ENDPOINT}`;
    const [data, setData] = useState({
        number: '',
        floor: 1,
        available_places: 3,
        images: null,
        price: "",
        gender: "Female"
    });
    const alertContext = useContext(AlertContext);

    return (
        <div style={{paddingTop: '15vh'}}>
            {generateRoomFields()}
        </div>
    );

    function generateRoomFields() {
        return (
            <div className={'formContainer'}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{textAlign: 'center'}}>Створення кімнати</h2>
                    <div className={"roomFieldsContainer"}>
                        {generateFloorSelect()}
                        <div className={"roomField"}>
                            Номер кімнати:
                            <Input
                                id="roomNumberInput"
                                style={{marginLeft: '1vw'}}
                                className={"Input"} required type={'number'}
                                value={data.number}
                                onChange={validateInputNumber}/>
                        </div>
                        <div className={"roomField"}>
                            Ціна:
                            <Input
                                id="roomPriceInput"
                                style={{marginLeft: '1vw'}}
                                type={'number'} required className={"Input"}
                                value={data.price}
                                onChange={validateInputNumber}
                            />
                        </div>
                        {generateRadioGroup()}
                        <div className={"roomField"}>
                            Кількість вільних місць:
                            <Input
                                id="availablePlacesInput"
                                style={{marginLeft: '1vw'}}
                                className={"Input"}
                                type={'number'}
                                required sx={{width: '3vw'}}
                                aria-valuemin={0}
                                value={data.available_places}
                                onChange={validateInputNumber}
                            />
                        </div>
                        {generateImageBlock()}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10vw'}}>
                        <Button type={'submit'} variant="contained" color="primary">
                            Створити кімнату
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data)
        const postData = async () => {
            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json());

                showSuccessfulAlert();
            } catch (error) {
                showErrorAlert();
            }
        }
        console.log(data);
        postData();
    }

    function generateFloorSelect() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignContent: 'center',
                width: '20%'
            }}>
                <div className={"roomField"}>
                    Поверх:
                </div>
                <Select
                    sx={{width: '7vw', paddingTop: '3vh', marginLeft: '1vw'}}
                    variant="standard"
                    id="demo-simple-select-standard"
                    defaultValue={data.floor}
                    onChange={(e) => {
                        setData((prevState) => {
                            return {...prevState, floor: parseInt(e.target.value)}
                        })
                    }}
                >
                    <MenuItem value={1}>Перший</MenuItem>
                    <MenuItem value={2}>Другий</MenuItem>
                    <MenuItem value={3}>Третій</MenuItem>
                </Select>
            </div>
        );
    }

    function generateImageBlock() {
        let image;

        if (data.images !== null) {
            image = <Image src={data.images} alt={""} height={"400"} width={"400"}/>;
        }

        return (
            <div className={"roomField"}>
                Зображення:
                <div style={{paddingTop: "2vh"}}>
                    {image}
                </div>
                <div style={{paddingTop: '3vh'}}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                    >
                        Завантажити
                        <VisuallyHiddenInput accept={".jpg, .png"} onChange={handleImageUpload} type="file"/>
                    </Button>
                </div>
            </div>
        );

        function handleImageUpload(e) {
            let reader = new FileReader();

            reader.onloadend = function () {
                setData((prevState) => {
                    return {...prevState, images: reader.result}
                })
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function generateRadioGroup() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}
                 className={"roomField"}>
                <div style={{marginRight: '1vw'}}>
                    <div style={{paddingTop: '1vh'}}>
                        Тип кімнати:
                    </div>
                </div>
                <RadioGroup
                    defaultValue={data.gender}
                    sx={{width: '5vw'}}
                    onChange={(e) => {
                        setData((prevState) => {
                            return {...prevState, gender: e.target.value}
                        })
                    }}
                >
                    <FormControlLabel value="Female" control={<Radio/>} label="Жіноча"/>
                    <FormControlLabel value="Male" control={<Radio/>} label="Чоловіча"/>
                </RadioGroup>
            </div>
        );
    }

    function validateInputNumber(e) {
        if (e.target.value > 0 || e.target.value === "") {
            setData((prevState) => {
                switch (e.target.id) {
                    case 'roomNumberInput':
                        return {...prevState, number: parseInt(e.target.value)}
                        break;
                    case "roomPriceInput":
                        return {...prevState, price: e.target.value};
                        break;
                    case "availablePlacesInput":
                        return {...prevState, available_places: parseInt(e.target.value)}
                        break;
                }
            })
        }
    }

    function showErrorAlert() {
        alertContext.setErrorOccurredState();
    }

    function showSuccessfulAlert() {
        alertContext.setSuccessState();
    }
}
