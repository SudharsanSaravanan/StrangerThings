import React, { useState } from 'react'
import EpisodesList from './EpisodesList'

const WatchStrangerThings = () => {
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)

  const handleEpisodeSelect = (season, episode) => {
    setSelectedSeason(season)
    setSelectedEpisode(episode)
  }

  const iframeSrc = `https://www.vidking.net/embed/tv/${66732}/${selectedSeason}/${selectedEpisode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`

  return (
    <>
      <EpisodesList onEpisodeSelect={handleEpisodeSelect} />
      {/* Or toggle to show iframe after selection, e.g., via state */}
      <div className="mt-8">
        <iframe
          src={iframeSrc}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          title={`Stranger Things S${selectedSeason}E${selectedEpisode}`}
        />
      </div>
    </>
  )
}

export default WatchStrangerThings