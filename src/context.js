import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getDistance } from 'geolib';

const DataContext = createContext();
const DataConsumer = DataContext.Consumer;

// store all endpoints in one place
const endpoints = {
    fetchVideos: 'https://care-box-backend.herokuapp.com/api/v1/applicant_test/get_video_link/',
    postDistance: 'https://care-box-backend.herokuapp.com/api/v1/applicant_test/post_distance/',
}

const initialState = {
    isLoading: true,
    videos: [],
    selectedVideo: null,
    map: {
        coordinates: [
            {
                lat: 23.760553125947684,
                lng: 90.38927467742258,
            },
            {
                lat: 23.813676977644572,
                lng: 90.42413504023418,
            },
        ],
    },
}

const DataProvider = ({ children }) => {
    // set initial state
    const [data, setData] = useState(initialState);

    // fetch videos from server
    const fetchVideos = async () => {
        const res = await axios.get(endpoints.fetchVideos);
        setData({
            ...data,
            isLoading: false,
            videos: res.data,
            selectedVideo: res.data[0] || null,
        });
    }

    // select an video
    const selectVideo = (video) => {
        setData({
            ...data,
            selectedVideo: video,
        });
    };

    // post distance to server and update the state
    const postDistance = async (distance) => {
        await axios.post(endpoints.postDistance, {
            Distance: distance,
        }, {
            headers: {
                'APIToken': 'tasmirolislam@gmail.com',
            },
        });
        // setData({
        //     ...data,
        //     map: {
        //         ...data.map,
        //         distance: 3000,
        //     },
        // });
    }

    useEffect(() => {
        fetchVideos();

        // get distance between two points
        const distance = getDistance({
            latitude: data.map.coordinates[0].lat,
            longitude: data.map.coordinates[0].lng,
        }, {
            latitude: data.map.coordinates[1].lat,
            longitude: data.map.coordinates[1].lng,
        })
        postDistance(distance);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DataContext.Provider value={{
            ...data,
            postDistance,
            selectVideo,
        }}>
            {children}
        </DataContext.Provider>
    )
};

export {
    DataContext,
    DataConsumer,
    DataProvider,
}
