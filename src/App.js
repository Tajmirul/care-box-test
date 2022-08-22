import { useContext } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { DataContext } from './context';
import Map from './pages/Map';
import VideosPage from './pages/VideosPage';

function App() {
    const { isLoading } = useContext(DataContext);
    const NavLinkActive = ({ isActive }) => {
        return `bg-gray-100 px-3 py-2 rounded transition-all ${isActive ? 'bg-blue-500 text-gray-100' : ''}`;
    }

    if (isLoading) {
        return <div className='text-4xl text-center mt-5'>Loading...</div>
    }

    return (
        <div className="container py-5">
            <div className='navbar flex justify-center gap-3 mb-10'>
                <NavLink to={'/video-player'} className={NavLinkActive}>Video Player</NavLink>
                <NavLink to={'/map'} className={NavLinkActive}>Video Player</NavLink>
            </div>

            <Routes>
                {/* element={<Navigate to='/video-player' replace />} */}
                {/* <Route path="/" element={<h1 className='text-4xl text-center'>Welcome To The App</h1>}></Route> */}
                <Route path="/" element={<Navigate to='/video-player' replace />}></Route>
                <Route path="video-player" element={<VideosPage />}></Route>
                <Route path="map" element={<Map />}></Route>
                <Route path="*" element={<h2 className='text-xl'>Page Not found</h2>} />
            </Routes>
        </div>
    );
}

export default App;
