import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import {Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId:'cdace6993b424756957af483bdf47c9f'
})
const Dashboard = ({code}) => {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(()=>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
      },[accessToken])

      useEffect(()=>{
        if(!search) return setSearchResults([])
        if(!accessToken) return
        spotifyApi.searchTracks(search).then(res=>{
          console.log(res)
        })
      },[search, accessToken])

  return ( 
    <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
        <Form.Control type="search" placeholder="Search Song/Artist" value={search}
        onChange={e => setSearch(e.target.value)} />
        <div className="flex-grow my-2" style={{overflowY:"auto"}}>
          Songs
        </div> 
        <div>Bottom</div>
    </Container>      
)

}

export default Dashboard