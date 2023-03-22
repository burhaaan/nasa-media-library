import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import SearchPage from '../components/search'

afterEach(() => {
  cleanup
})

test('renders search page with required input fields', () => {
  render(<SearchPage />)
  const queryInput = screen.getByLabelText('Query')
  const yearStartInput = screen.getByLabelText('Year Start')
  const yearEndInput = screen.getByLabelText('Year End')
  const searchButton = screen.getByRole('button', { name: 'Search' })
  expect(queryInput).toBeInTheDocument()
  expect(yearStartInput).toBeInTheDocument()
  expect(yearEndInput).toBeInTheDocument()
  expect(searchButton).toBeInTheDocument()
})

test('displays search results after successful search', async () => {
  render(<SearchPage />)
  const queryInput = screen.getByLabelText('Query')
  const yearStartInput = screen.getByLabelText('Year Start')
  const yearEndInput = screen.getByLabelText('Year End')
  const searchButton = screen.getByRole('button', { name: 'Search' })
  fireEvent.change(queryInput, { target: { value: 'moon' } })
  fireEvent.change(yearStartInput, { target: { value: '2018' } })
  fireEvent.change(yearEndInput, { target: { value: '2019' } })
  await act(async () => {
    fireEvent.click(searchButton)
  })
  const searchResultsContent = screen.getByTestId('searchResultsContent')
  expect(searchResultsContent).toBeInTheDocument()
})
