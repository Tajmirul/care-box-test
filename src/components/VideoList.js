import React, { useContext } from 'react'
import { DataContext } from '../context';

const VideoList = () => {
    const { videos, selectedVideo, selectVideo } = useContext(DataContext);

    return (
        <div>
            <h4 className='text-xl mb-4'>List Of Videos</h4>
            <div className='divide-y-2 divide-gray-200 border-2 border-gray-200 flex flex-col'>
                {videos.map(video => (
                    <button key={video.id} onClick={() => selectVideo(video)} className={`py-2 px-5 block w-full text-left ${selectedVideo.id === video.id && 'bg-gray-100'}`}>Stream Link {video.id}</button>
                ))}
            </div>
        </div>
    )
}

export default VideoList