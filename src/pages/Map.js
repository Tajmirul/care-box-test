import React, { useContext, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { IoLocation } from 'react-icons/io5';
import { DataContext } from '../context';

const Map = () => {
    const { map } = useContext(DataContext);

    return (
        <>
            <h4 className="text-xl mb-4">Distance between the given points is: {map.distance} meter</h4>
            <div className='w-full aspect-[2/1.2]'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY }}
                    defaultCenter={map.coordinates[0]}
                    defaultZoom={12}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {map.coordinates.map((coordinate, index) => {
                        return (
                            <div
                                key={index}
                                lat={coordinate.lat}
                                lng={coordinate.lng}
                                style={{
                                    color: '#ff0000',
                                    // backgroundColor: '#ff0000',
                                    // height: '20px',
                                    // width: '20px',
                                    // borderRadius: '50%',
                                    // border: '1px solid #ff0000',
                                    textAlign: 'center',
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                <IoLocation />
                            </div>
                        );
                    })}
                </GoogleMapReact>
            </div>
        </>
    )
}

export default Map