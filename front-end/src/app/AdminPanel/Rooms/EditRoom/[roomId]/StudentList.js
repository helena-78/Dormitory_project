import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './EditRoom.css';

const StudentList = ({ students }) => {
    return (
    <div >
        <TableContainer component={Paper} sx={{margin: '0 auto 50px' }}>
            <Table sx={{ minWidth: 700, border: 'none'}} aria-label="customized table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell sx={{ width: 55 }}>#</TableCell>
                        <TableCell>Ім'я</TableCell>
                        <TableCell>Прізвище</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Контактний номер</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-body">
                    {students.map((student, index) => (
                        <TableRow key={student.room_id}>
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.surname}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.contact_number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default StudentList;