import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'

const ShowPage = () => {
  const loc = useLocation()
  const { item } = loc.state
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/')
  }

  const {
    title,
    location,
    photographer,
    description,
    date_created,
    keywords,
  } = item.data[0]

  return (
    <>
      <Button
        style={{ marginLeft: '2rem', marginTop: '1rem' }}
        variant="contained"
        onClick={goBack}
      >
        Back
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '5rem',
        }}
      >
        {item.links?.map((result) => (
          <Card style={{ width: '50%' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography color="textSecondary">{location}</Typography>
              <CardMedia
                // height="194"
                component="img"
                image={result.href}
                title={title}
              />
              <Typography color="textSecondary">{photographer}</Typography>
              <Typography variant="caption" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {date_created}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {keywords.join(', ')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default ShowPage
