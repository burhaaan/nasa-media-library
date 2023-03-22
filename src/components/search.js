import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, StylesProvider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Card,
} from '@mui/material'
import { useForm } from 'react-hook-form'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [yearStart, setYearStart] = useState('')
  const [yearEnd, setYearEnd] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    // API endpoint for searching NASA Media Library
    const url = `https://images-api.nasa.gov/search?q=${query}&year_start=${yearStart}&year_end=${yearEnd}&media_type=image`
    try {
      const response = await axios.get(url)
      setSearchResults(response.data.collection.items)
      if (response.data.collection.items.length <= 0)
        alert('No data found that matches your input criteria')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div style={{ margin: 'auto', width: '80%', padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="query"
            label="Query"
            type="text"
            value={query}
            {...register('query', {
              required: 'Please provide a query to search',
            })}
            style={{ width: 400, marginRight: 30 }}
            error={!!errors?.query}
            helperText={errors?.query ? errors.query.message : null}
            onChange={(e) => setQuery(e.target.value)}
          />
          <TextField
            id="year-start"
            label="Year Start"
            type="number"
            {...register('start', {
              required: 'Please provide a start year',
            })}
            error={!!errors?.start}
            helperText={errors?.start ? errors.start.message : null}
            style={{ width: 200, marginRight: 30 }}
            inputProps={{ min: 1000, max: 9999 }}
            value={yearStart}
            onChange={(e) => setYearStart(e.target.value)}
          />
          <TextField
            id="year-end"
            label="Year End"
            style={{ width: 200, marginRight: 30 }}
            type="number"
            inputProps={{ min: 1000, max: 9999 }}
            value={yearEnd}
            {...register('end', {
              required: 'Please provide an end year',
            })}
            error={!!errors?.end}
            helperText={errors?.end ? errors.end.message : null}
            onChange={(e) => setYearEnd(e.target.value)}
          />

          <Button
            className="button1"
            type="submit"
            style={{ marginTop: 10 }}
            variant="contained"
          >
            Search
          </Button>
        </form>
      </div>
      <div
        data-testid="searchResultsContent"
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          flexWrap: 'wrap',
        }}
      >
        {searchResults?.map((result, key) => (
          <Card
            key={key}
            style={{ marginRight: '1rem', marginBottom: '1rem' }}
            sx={{ maxWidth: 275 }}
          >
            <CardContent>
              <Typography variant="h7" component="div">
                {result.data[0].title}
              </Typography>
              <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
              >
                {result.data[0].location}
              </Typography>
              <CardMedia
                component="img"
                height="194"
                image={result.links[0].href}
                alt={result.data[0].title}
              />
              <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
              >
                {result.data[0].photographer}
              </Typography>
              <CardActions>
                <Button size="small">
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'gray',
                    }}
                    to="/show"
                    state={{ item: result }}
                  >
                    View Details
                  </Link>
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
