import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function VehicleCard({ vehicle }) {
  const { make, model, year } = vehicle;
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {year} {make} {model}
        </Typography>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
            secondaryAction={
              <>
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary="Last oil change" secondary={<input value="19,768" />} />
          </ListItem>
          <ListItem
            secondaryAction={
              <>
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary="Oil change interval" secondary="5000m" />
          </ListItem>
          <ListItem
            secondaryAction={
              <>
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary="Oil type" secondary="10w 30" />
          </ListItem>
          <ListItem
            secondaryAction={
              <>
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary="Filter type" secondary="STP 2341" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
