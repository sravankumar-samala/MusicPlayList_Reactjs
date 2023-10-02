import {useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

export default function MusicPlaylist({playlist}) {
  const [searchValue, setSearchValue] = useState('')
  const [songsList, setSongsList] = useState(playlist)

  const handleSearch = e => {
    const {value} = e.target
    setSearchValue(value)

    if (value === '') {
      setSongsList(playlist)
    } else {
      // Filter the playlist based on the search query
      const searchedList = songsList.filter(song =>
        song.name.toLowerCase().includes(value.toLowerCase()),
      )
      setSongsList(searchedList)
    }
  }

  const handleDeleteSong = id => {
    const filteredSongsList = songsList.filter(each => each.id !== id)
    setSongsList(filteredSongsList)
  }

  return (
    <div className="main-container">
      <div className="cover-photo-container">
        <h1>Ed Sheeran</h1>
        <p>Singer</p>
      </div>
      <div className="playlist-container">
        <div className="playlist-header">
          <h2>Songs Playlist</h2>
          <div className="search-container">
            <input
              type="search"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search"
            />
            <div className="search-icon">
              <BiSearch />
            </div>
          </div>
        </div>
        {songsList.length !== 0 ? (
          <ul className="songs-list-container">
            {songsList.map(eachSong => (
              <SongItem
                key={eachSong.id}
                deleteSong={handleDeleteSong}
                songObj={eachSong}
              />
            ))}
          </ul>
        ) : (
          <div className="no-songs-container">
            <p>No Songs Found</p>
          </div>
        )}
      </div>
    </div>
  )
}

const SongItem = ({songObj, deleteSong}) => {
  const {id, name, genre, duration, imageUrl} = songObj

  const handleDeleteSong = () => deleteSong(id)

  return (
    <li className="song-item">
      <div className="img-container">
        <img src={imageUrl} alt="track" />
      </div>
      <div className="track-content-container">
        <div className="track-header">
          <p>{name}</p>
          <p>{genre}</p>
        </div>
        <div className="track-footer">
          <p>{duration}</p>
          <button type="button" onClick={handleDeleteSong} data-testid="delete">
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </li>
  )
}
