'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Alert, CircularProgress, Input, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
import * as React from "react";
import './EditRoom.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from "@mui/material/styles";

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
    const [errorOccurredState, setErrorOccurredState] = useState(false);
    const [loading, setLoading] = useState('');
    const [successfulPatchState, setSuccessfulPatchState] = useState('');

    const fetchData = async () => {
        const result = await fetch(url)
            .then(response => response.json())
            .finally(() => setLoading(false))
            .catch((reason) => {
                console.log(reason);
                setErrorOccurredState(true);
            });

        //    console.log(result);
        setCurrentData(result);
        startData = result;
    }

    useEffect(() => {
            setLoading(true);
            fetchData();
        },
        []);

    if (errorOccurredState === true) {
        return (
            <div className={'animated'}
                 style={{position: 'fixed', zIndex: 2, top: '90vh', height: '10vh', marginRight: '3vw', left: '75%'}}>
                <Alert sx={{width: '20vw'}} severity="error">Виникла помилка</Alert>
            </div>
        )
    }

    return (
        <div style={{paddingTop: '15vh'}}>
            {generateRoomFields()}
        </div>
    );

    function generateRoomFields() {
        if (loading === true) {
            return <CircularProgress/>;
        }

        return (
            <div className={'formContainer'}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{textAlign: 'center'}}>Редагування кімнати</h2>
                    <div className={"roomFieldsContainer"}>
                        <div className={"roomField"}>
                            Id: {currentData.room_id}
                        </div>
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
                            {generateFloorSelect()}
                        </div>
                        <div className={"roomField"}>
                            Номер кімнати:
                            <Input
                                style={{marginLeft: '1vw'}}
                                className={"Input"} required type={'number'}
                                value={currentData.number}
                                onChange={
                                    (e) => {
                                        if (e.target.value > 0 || e.target.value === "") {
                                            setCurrentData((prevState) => {
                                                return {...prevState, number: parseInt(e.target.value)};
                                            })
                                        }
                                    }}/>
                        </div>
                        <div className={"roomField"}>
                            Ціна:
                            <Input
                                style={{marginLeft: '1vw'}}
                                type={'number'} required className={"Input"}
                                value={currentData.price}
                                onChange={
                                    (e) => {
                                        if (e.target.value > 0 || e.target.value === "") {
                                            setCurrentData((prevState) => {
                                                return {...prevState, price: e.target.value};
                                            })
                                        }
                                    }}
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}
                             className={"roomField"}>
                            <div style={{marginRight: '1vw'}}>
                                <div style={{paddingTop: '1vh'}}>
                                    Тип кімнати:
                                </div>
                            </div>
                            <RadioGroup
                                defaultValue={currentData.gender}
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
                        <div className={"roomField"}>
                            Кількість вільних місць:
                            <Input
                                style={{marginLeft: '1vw'}}
                                className={"Input"}
                                type={'number'}
                                required sx={{width: '3vw'}}
                                aria-valuemin={0}
                                value={currentData.available_places} onChange={
                                (e) => {
                                    if (e.target.value > 0 || e.target.value === "") {
                                        setCurrentData((prevState) => {
                                            return {...prevState, available_places: parseInt(e.target.value)};
                                        })
                                    }
                                }}
                            />
                        </div>
                        <div className={"roomField"}>
                            Зображення:
                            {generateImages()}
                            <div style={{paddingTop: '3vh'}}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Завантажити
                                    <VisuallyHiddenInput type="file"/>
                                </Button>{currentData.images}
                                {generateImages()}
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10vw'}}>
                        <Button type={'submit'} disabled={isDataEqual()} variant="contained" color="primary">
                            Зберегти
                        </Button>
                    </div>
                </form>
                {appearSuccessfulAlert()}
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
                }).then(response => response.json());

                setSuccessfulPatchState(true);
                await fetchData();
                setTimeout(() => {
                    setSuccessfulPatchState(false)
                }, 3000)

            } catch (error) {
                setErrorOccurredState(true);
            }
        }

        patchData();
    }

    function generateFloorSelect() {
        return (
            <Select
                sx={{width: '7vw', paddingTop: '3vh', marginLeft: '1vw'}}
                variant="standard"
                id="demo-simple-select-standard"
                defaultValue={currentData.floor}
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
        );
    }

    function appearSuccessfulAlert() {
        if (successfulPatchState === true) {
            return (
                <div className={'animated'} style={{
                    position: 'fixed',
                    zIndex: 2,
                    top: '90vh',
                    height: '10vh',
                    marginRight: '3vw',
                    left: '75%'
                }}>
                    <Alert sx={{width: '20vw'}} severity="success">Дані успішно збережені</Alert>
                </div>
            );
        } else {
            return null;
        }
    }

    function generateImages() {
        let images;

        for (let i = 0; i < currentData.images?.length; i++) {
            images[i] = <Image src={""}/>
        }

        return images;
    }

    function isDataEqual() {
        return JSON.stringify(startData) == JSON.stringify(currentData);
    }
}