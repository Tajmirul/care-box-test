import React from 'react'
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';

const VideosPage = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
            <div className='md:col-span-8'>
                <VideoPlayer />
            </div>

            <div className='md:col-span-4'>
                <VideoList />
            </div>
        </div>
    )
}

export default VideosPage;