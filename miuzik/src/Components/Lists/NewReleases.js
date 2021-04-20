import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import BlockList from '../BlockList/BlockList'

const spotifyApi = new SpotifyWebApi({
    clientId: '0adaf2a4ad6248869d5b1acf78494f58',
})

export default function Recommendations({ code }) {
    const accessToken = code;
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.getNewReleases({ limit: 10, offset: 0, country: 'IN' })
            .then(data => {
                // console.log(data.body.albums.items)
                setNewReleases(data.body.albums.items.map(track => {
                    // console.log(track)
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.images[1].url,
                    }
                }))
            }).catch((err) => {
                console.log("Something went wrong!", err);
            });

    }, [accessToken])
    return (
        <div>
            <BlockList data={{ title: "New Release", tracks: newReleases }}></BlockList>
        </div >
    )
}