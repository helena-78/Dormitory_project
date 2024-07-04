import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './floorlayout.css';

const LegendLabel = (props) => {

    return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, bgcolor: `${props.color}`, borderRadius: '50%', marginRight: 1 }}></Box>
        <Typography className='label'>{props.label}</Typography>
    </Box>
    )
}

export default LegendLabel