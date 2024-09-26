import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const About = props => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    const fetchData = () => {
        axios
          .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
          .then(response => {
            // axios bundles up all response data in response.data property
            setName(response.data.name)
            setBio(response.data.bio)
            setImgUrl(response.data.imgUrl)
          })
          .catch(err => {
            const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
            setError(errMsg)
          })
          .finally(() => {
            // the response has been received, so remove the loading icon
            setLoaded(true)
          })
    }
    // set up loading data from server when the component first loads
    useEffect(() => {
        // fetch messages this once
        fetchData()
    }, [])

    return (
        <>
            <h1>{name}</h1>
            <div className='about-bio'>
                <p>{bio}</p>
            </div>
            <img src={imgUrl} alt="{name}'s picture" />
        </>
  )
}

// make this component available to be imported into any other file
export default About
