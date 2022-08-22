import React from 'react';
import { AiOutlinePause } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';

const VideoController = ({ videoConfig, playVideo }) => {
    return (
        <div className="controls">
            <div>
                <button onClick={() => playVideo(!videoConfig.playing)}>
                    {videoConfig.playing ? <AiOutlinePause /> : <BsPlay />}
                </button>
            </div>
        </div>
    )
}

export default VideoController