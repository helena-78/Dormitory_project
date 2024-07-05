'use client'
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import styles from './DynamicList.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Height, Padding } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const getTableHead = (title) => {
    if (title === 'кімнат') {
        return (
            <TableRow>
                <TableCell sx={{width: 55}}>#</TableCell>
                <TableCell>Номер Кімнати</TableCell>
                <TableCell>Доступних місць</TableCell>
                <TableCell>Студенти</TableCell>
                <TableCell>Ціна</TableCell>
                <TableCell>Стать</TableCell>
                <TableCell>Дії</TableCell>
            </TableRow>
        );
    }
    else if (title === 'студентів') {
        return (
            <TableRow>
                <TableCell sx={{width: 55}}>#</TableCell>
                <TableCell>Ім'я</TableCell>
                <TableCell>Прізвище</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Контактний номер</TableCell>
                <TableCell>Id кімнати</TableCell>
                <TableCell>Id аплікації</TableCell>
                <TableCell>Дії</TableCell>
            </TableRow>
        )
    }
    else if (title === 'заяв') {
        return (
            <TableRow>
                <TableCell sx={{width: 55}}>#</TableCell>
                <TableCell>Студент</TableCell>
                <TableCell>Номер кімнати</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата аплікації</TableCell>
                <TableCell>Бажані сусіди по кімнаті</TableCell>
                <TableCell>Дії</TableCell>
            </TableRow>
        )
    }
}

export default function DynamicList(props) {
    let listItems = generateListItems(props, props.title);
    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div" align="center">
                <b> Список {props.title}: </b>
            </Typography>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, border: 'none' }} aria-label="customized table">
                        <TableHead className="table-head">
                            {getTableHead(props.title)}
                        </TableHead>
                        <TableBody className="table-body">
                            {listItems}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
       </Grid>
   );
}

function generateListItems(props, title) {
    const router = useRouter()

    // const getEditData = (room_id) => {
    //     router.push({
    //         pathname: '/AdminPanel/Rooms/EditRoom',
    //         query: { id: {room_id}},
    //     })
    // }
    let listItemsArray = [];
    console.log(props)
    if(title === 'кімнат') {
        for (let i = 0; i < props.dataLength; i++) {
            listItemsArray[i] =
                <TableRow key={props.items[i].room_id}>
                    <TableCell component="th" scope="row">{ i + 1}</TableCell>
                    <TableCell >
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar sx={{backgroundColor: '#1976d2', marginRight: '8px'}}>                
                                {props.icon}            
                            </Avatar>
                            {props.itemName + props.items[i].number}
                        </div>
                    </TableCell>
                    <TableCell>{props.items[i].available_places}</TableCell>
                    <TableCell>{props.student[i]}</TableCell>
                    <TableCell>{props.items[i].price}</TableCell>
                    <TableCell>{props.items[i].gender}</TableCell>
                    <TableCell>
                        <IconButton edge="end"  onClick={() => {router.push(`/AdminPanel/Rooms/EditRoom/${props.items[i].room_id}`)}}>               
                            <BorderColorIcon sx={{color: '#1976d2'}} ></BorderColorIcon>          
                        </IconButton>
                    </TableCell>
                </TableRow>
            // <div  key={i} className="listElement">
            //     <ListItem
            //         secondaryAction={
            //             <IconButton edge="end">
            //                 <BorderColorIcon sx={{color: '#1976d2'}}></BorderColorIcon>
            //             </IconButton>
            //         }
            //     >
            //         <ListItemAvatar>
            //             <Avatar sx={{backgroundColor: '#1976d2'}}>
            //                 {props.icon}
            //             </Avatar>
            //         </ListItemAvatar>
            //         <ListItemText
            //             primary={props.itemName + props.items[i].number}
            //         />
            //     </ListItem>
            // </div>
        }
    }
    else if(title === 'студентів') {
        for (let i = 0; i < props.dataLength; i++) {
            listItemsArray[i] =
                <TableRow key={props.items[i].student_id}>
                    <TableCell component="th" scope="row">{ i + 1}</TableCell>
                    <TableCell >
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar sx={{backgroundColor: '#1976d2', marginRight: '8px'}}>                
                                {props.icon}            
                            </Avatar>
                            {props.itemName + props.items[i].name}
                        </div>
                    </TableCell>
                    <TableCell>{props.items[i].surname}</TableCell>
                    <TableCell>{props.items[i].email}</TableCell>
                    <TableCell>{props.items[i].contact_number}</TableCell>
                    <TableCell>{props.items[i].room_id}</TableCell>
                    <TableCell>{props.items[i].application_id}</TableCell>
                    <TableCell>
                        <IconButton edge="end" onClick={() => {router.push(`/AdminPanel/Students/EditStudent/${props.items[i].student_id}`)}}>               
                            <BorderColorIcon sx={{color: '#1976d2'}}></BorderColorIcon>          
                        </IconButton>
                    </TableCell>
                </TableRow>
        }
    }
    else if(title === 'заяв') {
        for (let i = 0; i < props.data.length; i++) {
            listItemsArray[i] =
                <TableRow key={props.data[i].application_id}>
                    <TableCell component="th" scope="row">{ i + 1}</TableCell>
                    <TableCell >
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar sx={{backgroundColor: '#1976d2', marginRight: '8px'}}>                
                                {props.icon}            
                            </Avatar>
                            {props.student[i]}
                        </div>
                    </TableCell>
                    <TableCell>{props.room[i]}</TableCell>
                    <TableCell>{props.data[i].status}</TableCell>
                    <TableCell>{props.data[i].application_date}</TableCell>
                    <TableCell>{props.data[i].desired_roommates}</TableCell>
                    <TableCell>
                        <IconButton edge="end">               
                            <BorderColorIcon sx={{color: '#1976d2'}}></BorderColorIcon>          
                        </IconButton>
                    </TableCell>
                </TableRow>
        }
    }
    return listItemsArray;

    function sortList(listItem1, listItem2){
        return parseInt(listItem1.props.id) - parseInt(listItem2.props.id);
    }
}





