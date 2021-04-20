import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import BlockList from '../BlockList/BlockList'

const spotifyApi = new SpotifyWebApi({
    clientId: '0adaf2a4ad6248869d5b1acf78494f58',
})

export default function Recommendations({ code }) {
    const accessToken = code;
    const [recommendation, setRecommendation] = useState([]);

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
            min_popularity: 50
        }).then(data => {
            setRecommendation(data.body.tracks.map(track => {
                // console.log(track)
                return {
                    artist: track.album.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[1].url,
                }
            }))
        }).catch((err) => {
            console.log("Something went wrong!", err);
        });

    }, [accessToken])
    return (
        <div>
            <BlockList data={{ title: "Recommendation", tracks: recommendation }}></BlockList>
        </div >
    )
}