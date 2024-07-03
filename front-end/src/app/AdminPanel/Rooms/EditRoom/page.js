'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {Input, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from "react";
import './EditRoom.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from "@mui/material/styles";
import {AlertContext} from "../../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../../component/Loading/LoadingContext";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/rooms/';
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
let startData;

export default function EditRoom() {
    const roomId = useSearchParams().get('id');
    const url = `${BASE_URL}${ENDPOINT}` + roomId;
    const [currentData, setCurrentData] = useState([]);
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);
    const router = useRouter();

    const fetchData = async () => {
        const result = await fetch(url)
            .then(response => response.json())
            .finally(() => changeLoadingProcessState(false))
            .catch((reason) => {
                console.log(reason);
                showErrorAlert();
            });'data:image/jpeg;base64,'

        setCurrentData({...result, images: 'data:image/jpeg;base64,'+result.images});
        startData = result;
        console.log(result)
    }

    useEffect(() => {
            changeLoadingProcessState(true)
            fetchData();
        },
        []);

    return (
        <div style={{paddingTop: '15vh'}}>
            {generateRoomFields()}
        </div>
    );

    function generateRoomFields() {
        return (
            <div className={'formContainer'}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{textAlign: 'center'}}>Редагування кімнати</h2>
                    <div style={{display:'flex', flexDirection:"row"}}>
                    <div className={"roomFieldsContainer"}>
                        <div className={"roomField"}>
                            Id: <span style={{fontWeight: 'normal'}}>{currentData.room_id}</span>
                        </div>
                        {generateFloorSelect()}
                        <div className={"roomField"}>
                            Номер кімнати:
                            <Input
                                id="roomNumberInput"
                                style={{marginLeft: '1vw'}}
                                className={"Input"} required type={'number'}
                                value={currentData.number}
                                onChange={validateInputNumber}/>
                        </div>
                        <div className={"roomField"}>
                            Ціна:
                            <Input
                                id="roomPriceInput"
                                style={{marginLeft: '1vw'}}
                                type={'number'} required className={"Input"}
                                value={currentData.price}
                                onChange={validateInputNumber}
                            />
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
                                value={currentData.available_places}
                                onChange={validateInputNumber}
                            />
                        </div>
                    </div>
                    </div>
                        {generateImageBlock()}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10vw', paddingTop:'2vh'}}>
                        <div style={{paddingRight: '2vw'}}>
                            <Button variant="outlined" onClick={handleDeleteButtonClick} sx={{color: 'red'}}
                                    startIcon={<DeleteIcon/>}>
                                Видалити кімнату
                            </Button>
                        </div>
                        <div>
                            <Button type={'submit'} disabled={isDataEqual()} variant="contained" color="primary">
                                Зберегти
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

   

    function handleSubmit(e) {
        e.preventDefault();
        const url = `${BASE_URL}${ENDPOINT}` + roomId + '/';

        const patchData = async () => {
            try {
                await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentData)
                }).then((response) => {
                    if (response.ok) {
                        showSuccessfulAlert();
                    }else {
                        showErrorAlert();
                    }
                });
                await fetchData();
            } catch (error) {
                showErrorAlert();
            }
        }
        console.log(JSON.stringify(currentData))
        patchData();
    }

    function handleDeleteButtonClick(e) {
        const url = `${BASE_URL}${ENDPOINT}` + roomId + '//';

        const deleteData = async () => {
            try {
                await fetch(url, {
                    method: 'DELETE',
                }).then((response) => {
                    if (response.ok) {
                        showSuccessfulAlert();
                        router.push('/AdminPanel/Rooms')
                    }else {
                        showErrorAlert();
                    }
                });
            } catch (error) {
                console.log(error)
                showErrorAlert();
            }
        }

        deleteData();
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
                    value={currentData.floor || 0}
                    sx={{width: '7vw', paddingTop: '3vh', marginLeft: '1vw'}}
                    variant="standard"
                    id="demo-simple-select-standard"
                    onChange={(e) => {
                        setCurrentData((prevState) => {
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
                    value={currentData.gender || ''}
                    sx={{width: '5vw'}}
                    onChange={(e) => {
                        setCurrentData((prevState) => {
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

    function generateImageBlock() {
        let image;

        if (currentData.images !== null) {
            image = <Image src={currentData.images} alt={""} height={"400"} width={"400"}/>;
        }

        return (
            <div className={"roomField"} style={{paddingLeft:'10vw'}}>
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
                        startIcon={<CloudUploadIcon />}
                    >
                        Завантажити
                        <VisuallyHiddenInput onChange={handleImageUpload} type="file"/>
                    </Button>
                </div>
            </div>
        );
    }

    function handleImageUpload(e) {
        let reader = new FileReader();

        reader.onloadend = function () {
            setCurrentData((prevState) => {
                return {...prevState, images: reader.result}
            })
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    function validateInputNumber(e) {
        if (e.target.value > 0 || e.target.value === "") {
            setCurrentData((prevState) => {
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

    function isDataEqual() {
        return JSON.stringify(startData) == JSON.stringify(currentData);
    }

    function showErrorAlert() {
        alertContext.setErrorOccurredState();
    }

    function showSuccessfulAlert() {
        alertContext.setSuccessState();
    }

    function changeLoadingProcessState(state) {
        loadingContext.setLoadingState(state);
    }
}