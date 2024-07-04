'use client'
import * as React from 'react' 
import { useState, useEffect } from 'react' 
import Box from '@mui/material/Box' 
import Grid from '@mui/material/Grid' 
import Button from '@mui/material/Button' 
import Typography from '@mui/material/Typography' 
import Table from '@mui/material/Table' 
import TableBody from '@mui/material/TableBody' 
import TableCell from '@mui/material/TableCell' 
import TableContainer from '@mui/material/TableContainer' 
import TableHead from '@mui/material/TableHead' 
import TableRow from '@mui/material/TableRow' 
import Paper from '@mui/material/Paper' 
import ClickList from "../../../../component/AdminPanel/List/ClickList" 
import AccountCircleIcon from '@mui/icons-material/AccountCircle' 

const zero_student = 
        {
            "student_id": ' ',
            "name": " ",
            "surname": " ",
            "email": " ",
            "contact_number": " ",
            "gender": " ",
            "room_id": " ",
            "application_id": " ",
            "password": " "
        }


export default function Page() {
    const [students, setStudents] = useState([])
    const [bills, setBills] = useState([])
    const [selectedStudent, setSelectedStudent] = useState(zero_student)

    const STUDENTS_API = 'http://127.0.0.1:8000/students/' 
    const BILLS_API = 'http://127.0.0.1:8000/api/bills/' 

    const STUDENTS_API_remote = 'http://174.129.65.133:8000/students/' 
    const BILLS_API_remote = 'http://174.129.65.133:8000/api/bills/' 

    
    const fakeStudentsData = [
        {
            "student_id": 1,
            "name": "Вася",
            "surname": "Іванов",
            "email": "sdasdsad@gmail.com",
            "contact_number": "+38065654412",
            "gender": "Male",
            "room_id": "1",
            "application_id": "1",
            "password": "dsadasfdas"
        },
        {
            "student_id": 2,
            "name": "Петя",
            "surname": "Коваленко",
            "email": "sdasdsad@i.ua",
            "contact_number": "+380645423374",
            "gender": "Male",
            "room_id": "2",
            "application_id": "2",
            "password": "adsadasfgfg"
        },
        {
            "student_id": 3,
            "name": "Маша",
            "surname": "Шевченко",
            "email": "masha@gmail.com",
            "contact_number": "+38065654412",
            "gender": "Female",
            "room_id": "3",
            "application_id": "3",
            "password": "weqrqewrter"
        }
    ] 

    const fakeDataset2 = [
        {
            "bill_id": 4,
            "student_id": 4,
            "dept": 1000,
        }
    ] 

    useEffect(() => {
        fetchStudents() 
        fetchBills() 
    }, []) 

    const fetchStudents = async () => {
        try {
            const response = await fetch(STUDENTS_API_remote) 
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json() 
            setStudents(data) 
        } catch (error) {
            console.error("Error fetching students, using fallback data", error) 
            setStudents(fakeStudentsData) 
        }
    } 

    const fetchBills = async () => {
        try {
            const response = await fetch(BILLS_API_remote) 
            if (!response.ok) {
                throw new Error('Network response was not ok') 
            }
            const data = await response.json() 
            setBills(data) 
        } catch (error) {
            console.error("Error fetching bills, using fallback data", error) 
            setBills(fakeDataset2) 
        }
    } 

    const dismissBill = async (billId) => {
        try {
            const response = await fetch(`${BILLS_API}${billId}/`, {
                method: 'DELETE',
            }) 
            if (!response.ok) {
                throw new Error('Network response was not ok') 
            }
            // Remove the dismissed bill from the state
            setBills(bills.filter(bill => bill.bill_id !== billId)) 
            setSelectedStudent(zero_student) 
        } catch (error) {
            console.error("Error dismissing bill", error) 
        }
    } 

    // Filter students with bills
    const studentsWithBills = students.filter(student => 
        bills.some(bill => bill.student_id === student.student_id)
    ) 

    // Handle list item click
    const handleItemClick = (studentId) => {
        const student = students.find(student => student.student_id === studentId) 
        const bill = bills.find(bill => bill.student_id === studentId) 
        setSelectedStudent({ ...student, dept: bill.dept, bill_id: bill.bill_id }) 
    } 

    return (
        <Box sx={{ paddingTop: '10%', paddingLeft: '10%', paddingRight: '10%' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <ClickList
                        icon={<AccountCircleIcon sx={{ color: '#FFFFFF', transform: 'scale(1.9)' }} />}
                        items={studentsWithBills.map((student) => `${student.name} ${student.surname} Id:${student.student_id}`)}
                        data={studentsWithBills}
                        title={"студентів"}
                        itemName={"Студент "}
                        onItemClick={handleItemClick}
                    />
                </Grid>
                <Grid item xs={6}>
                {selectedStudent && (
                    <Box sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Деталі студента</Typography>
    <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid lightgrey' }}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Ім'я</TableCell>
                    <TableCell>{selectedStudent.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Прізвище</TableCell>
                    <TableCell>{selectedStudent.surname}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Електронна пошта</TableCell>
                    <TableCell>{selectedStudent.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Контактний номер</TableCell>
                    <TableCell>{selectedStudent.contact_number}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Стать</TableCell>
                    <TableCell>{selectedStudent.gender}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID кімнати</TableCell>
                    <TableCell>{selectedStudent.room_id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Заборгованість</TableCell>
                    <TableCell>{selectedStudent.dept}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    <Button
        variant="contained"
        color="primary"
        onClick={() => dismissBill(selectedStudent.bill_id)}
        sx={{ mt: 2 }}
    >
        Видалити Борг
    </Button>
</Box>

                    )}
                </Grid>
            </Grid>
        </Box>
    ) 
}
