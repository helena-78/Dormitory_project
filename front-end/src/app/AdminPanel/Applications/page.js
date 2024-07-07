'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import styles from './Application.css'
import {useContext, useEffect, useState} from "react";
import {AlertContext} from "../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../component/Loading/LoadingContext";
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from "@mui/material/Grid";
import DynamicClickList from "../../../../component/AdminPanel/List/DynamicClickList";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

const remote_url = process.env.NEXT_PUBLIC_API_URL;
const applicationsENDPOINT = '/applications';
const applicationENDPOINT = '/applications/';
const roomsENDPOINT = '/rooms/';
const studentsENDPOINT = '/students/';
const bookingsENDPOINT = '/bookings/create/';
const applicationsUrl = `${remote_url}${applicationsENDPOINT}`;
const applicationUrl = `${remote_url}${applicationENDPOINT}`;
const roomUrl = `${remote_url}${roomsENDPOINT}`;
const studentUrl = `${remote_url}${studentsENDPOINT}`;
const initialApplicationsDataState = [];
const initialApplicationDataState = {
    application_id: "",
    status: "",
    application_date: "",
    student: "",
    room: ""
};
const initialRoomDataState = {
    room_id: "",
    number: "",
    available_places: "",
    floor: ""
};
const initialStudentDataState = {
    student_id: "",
    name: "",
    surname: ""
};

export default function Page() {
    const [applicationsData, setApplicationsData] = useState(initialApplicationsDataState);
    const [applicationData, setApplicationData] = useState(initialApplicationDataState);
    const [roomData, setRoomData] = useState(initialRoomDataState);
    const [studentData, setStudentData] = useState(initialStudentDataState);
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);

    const fetchApplicationsData = async () => {
        const result = await fetch(applicationsUrl)
            .then(response => response.json())
            .finally(() => changeLoadingProcessState(false))
            .catch((reason) => {
                showErrorAlert();
                console.log(reason);
            });

        setApplicationsData(getValidApplications(result));
        console.log(applicationsData);
    }

    const fetchStudentData = async (id) => {
        const result = await fetch(studentUrl + id)
            .then(response => response.json())
            .catch((reason) => {
                showErrorAlert();
                console.log(reason);
            });

        setStudentData(result);
    }

    const fetchRoomData = async (id) => {
        const result = await fetch(roomUrl + id)
            .then(response => response.json())
            .catch((reason) => {
                showErrorAlert();
                console.log(reason);
            });

        setRoomData(result);
    }

    const fetchApplicationData = async (id) => {
        const result = await fetch(applicationUrl + id)
            .then(response => response.json())
            .catch((reason) => {
                showErrorAlert();
                console.log(reason);
            });

        setApplicationData(result);
    }


    const deleteApplication = async () => {
        const url = `${remote_url}/applications/${applicationData.application_id}/delete/`;
        let result = await fetch(url, {method: 'DELETE'});

        return result;
    }

    const createBooking = async () => {
        const url = `${remote_url}${bookingsENDPOINT}`;
        let bookingData = JSON.stringify({
            confirmation_status: "Pending",
            room: roomData.room_id,
            student: studentData.student_id
        });

        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bookingData
        });

        return result;
    }

    useEffect(() => {
        changeLoadingProcessState(true);
        fetchApplicationsData()
    }, []);

    return (
        <Box sx={{paddingTop: '10%', paddingLeft: '10%', paddingRight: '10%'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <DynamicClickList
                        icon={<DescriptionIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}/>}
                        items={applicationsData.map((application) => `ID:${application.application_id} Кімната ID: ${application.room}`)}
                        data={applicationsData}
                        title={"заяв"}
                        itemName={"Заява "}
                        itemIDs={applicationsData.map((application) => application.application_id)}
                        onItemClick={handleItemClick}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{p: 2}}>
                        <Typography variant="h6" sx={{mb: 2}}>Деталі заяви:</Typography>
                        <TableContainer component={Paper} sx={{borderRadius: 2, border: '1px solid lightgrey'}}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Заява ID:</TableCell>
                                        <TableCell>{applicationData.application_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Дата створення:</TableCell>
                                        <TableCell>{applicationData.application_date.substring(0, 10)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Студент: </TableCell>
                                        <TableCell>{studentData.name + "" + studentData.surname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ID студента:</TableCell>
                                        <TableCell>{studentData.student_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ID кімнати:</TableCell>
                                        <TableCell>{roomData.room_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Поверх кімнати:</TableCell>
                                        <TableCell>{roomData.floor}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Номер кімнати:</TableCell>
                                        <TableCell>{roomData.number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Вільних місць:</TableCell>
                                        <TableCell>{roomData.available_places}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleButtonApproveClick}
                                sx={{mt: 2, bgcolor: 'green'}}
                                disabled={isApplicationSelected()}
                            >
                                Підтвердити
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleButtonRejectClick}
                                sx={{mt: 2, bgcolor: 'red'}}
                                disabled={isApplicationSelected()}
                            >
                                Відхилити
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

    function handleItemClick(e) {
        for (const element of applicationsData) {
            if (element.application_id == parseInt(e.currentTarget.id)) {
                displayApplication(element);
            }
        }
    }

    function handleButtonApproveClick() {
        try {
            createBooking().then((response) => {
                    if (response.ok) {
                        deleteApplication().then((response) => {
                            if (response.ok) {
                            }
                            showSuccessfulAlert();
                            changeLoadingProcessState(true);
                            refreshPage().finally(() => changeLoadingProcessState(false));
                        })
                    } else {
                        showErrorAlert();
                    }
                }
            )
        } catch (e) {
            console.log(e);
            showErrorAlert();
        }
    }

    function handleButtonRejectClick() {
        try {
            deleteApplication().then((response) => {
                if (response.ok) {
                    showSuccessfulAlert()
                    changeLoadingProcessState(true);
                    refreshPage().finally(() => changeLoadingProcessState(false));

                } else {
                    showErrorAlert();
                }
            })
        } catch (e) {
            console.log(e);
            showErrorAlert();
        }
    }

    async function displayApplication(application) {
        await Promise.all([fetchApplicationData(application.application_id), fetchRoomData(application.room), fetchStudentData(application.student)]);
    }

    function isApplicationSelected() {
        if (JSON.stringify(applicationData) != JSON.stringify({
            application_id: "",
            status: "",
            application_date: "",
            student: "",
            room: ""
        })) {
            return false;
        } else {
            return true;
        }
    }

    async function nullApplicationTable() {
        await Promise.all([setApplicationData(initialApplicationDataState), setRoomData(initialRoomDataState)
            , setStudentData(initialStudentDataState)]);
    }

    async function refreshPage() {
        await Promise.all([fetchApplicationsData(), nullApplicationTable()])
    }

    function getValidApplications(applications) {
        let validApplications = [];

        applications.map(function (application) {
            if (application.room != null && application.student != null) {
                validApplications.push(application);
            }
        })

        return validApplications;
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

