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

export default function DynamicList(props) {
    let listItems = generateListItems(props);
    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div" align="center">
                <b> Список {props.title}: </b>
            </Typography>
            <div>
                <List>
                    <Divider sx={{borderColor: '#333333'}}></Divider>
                    {listItems}
                </List>
            </div>
        </Grid>
    );
}

function generateListItems(props) {
    let listItemsArray = [];

    for (let i = 0; i < props.data.length; i++) {
        listItemsArray[i] =
            <div  key={i} className="listElement">
                <ListItem
                    secondaryAction={
                        <IconButton edge="end">
                            <BorderColorIcon sx={{color: '#1976d2'}}></BorderColorIcon>
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar sx={{backgroundColor: '#1976d2'}}>
                            {props.icon}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.itemName + props.items[i]}
                    />
                </ListItem>
            </div>
    }

    return listItemsArray;
}



