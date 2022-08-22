import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { DataContext } from '../context';
import VideoController from './VideoController';

const VideoPlayer = () => {
    const [videoConfig, setVideoConfig] = useState({
        width: '100%',
        height: '100%',
        playing: false,
        volume: 0.8,
        played: 0,
        loaded: 0,
        duration: 0,
        muted: false,
        playbackRate: 1.0,
        seeking: false,
        buffer: true,
    })
    const { selectedVideo } = useContext(DataContext);
    let player = null;
    useEffect(() => {
        setVideoConfig({
            ...videoConfig,
            loaded: 0,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVideo.id]);

    const onReady = () => {
        setVideoConfig({
            ...videoConfig,
            buffer: false,
        })
    }

    const handleVolumeChange = (e) => {
        setVideoConfig({
            ...videoConfig,
            volume: parseFloat(e.target.value)
        })
    }
    const handleToggleMuted = () => {
        setVideoConfig({
            ...videoConfig,
            muted: !videoConfig.muted
        })
    }

    const handlePlayPause = (play) => {
        setVideoConfig({
            ...videoConfig,
            playing: play,
        })
    }
    const handleSeekMouseDown = e => {
        setVideoConfig({
            ...videoConfig,
            seeking: true
        })
    }

    const handleSeekChange = e => {
        setVideoConfig({
            ...videoConfig,
            played: parseFloat(e.target.value)
        })
    }

    const handleSeekMouseUp = e => {
        setVideoConfig({
            ...videoConfig,
            seeking: false
        })
        player.seekTo(parseFloat(e.target.value))
    }

    // show loading spinner when video is loading
    const handleBuffer = (buffer) => {
        setVideoConfig({
            ...videoConfig,
            buffer
        })
    }
    const skip = (seconds) => {
        player.seekTo(player.getCurrentTime() + seconds)
    }

    const handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!state.seeking) {
            setVideoConfig({
                ...videoConfig,
                ...state,
            })
        }
    }

    const ref = plr => {
        player = plr;
    }

    const controlButtonClasses = 'bg-gray-100 px-5 py-2 rounded transition-all';

    return (
        <>
            <div className='video-player'>
                <ReactPlayer
                    className='react-player'
                    ref={ref}
                    url={selectedVideo?.link}
                    width={videoConfig.width}
                    height={videoConfig.height}
                    playing={videoConfig.playing}
                    progressInterval={1000}
                    volume={videoConfig.volume}
                    muted={videoConfig.muted}
                    onReady={onReady}
                    onBuffer={() => handleBuffer(true)}
                    onBufferEnd={() => handleBuffer(false)}
                    onProgress={handleProgress}
                />
                {videoConfig.buffer && <div className='loading absolute top-0 left-0 w-full h-full bg-gray-100/50 flex items-center justify-center text-4xl'>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>}
            </div>

            <div className='space-y-4'>
                <div className="controls flex justify-center gap-4 mt-4">
                    <button className={controlButtonClasses} onClick={() => handlePlayPause(true)}>Play</button>
                    <button className={controlButtonClasses} onClick={() => handlePlayPause(false)}>Pause</button>
                    <button className={controlButtonClasses} onClick={() => skip(-10)}><BsFillSkipBackwardFill /></button>
                    <button className={controlButtonClasses} onClick={() => skip(10)}><BsFillSkipForwardFill /></button>
                </div>

                <div className='flex flex-col gap-2'>
                    <span>Seek</span>
                    <input
                        type='range' min={0} max={0.999999} step='any'
                        value={videoConfig.played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span>Volume</span>
                    <input type='range' min={0} max={1} step='any' value={videoConfig.volume} onChange={handleVolumeChange} />
                </div>
                <div className='flex gap-2'>
                    <span>Mute</span>
                    <input id='muted' type='checkbox' checked={videoConfig.muted} onChange={handleToggleMuted} />
                </div>
            </div>
        </>
    )
}

export default VideoPlayer