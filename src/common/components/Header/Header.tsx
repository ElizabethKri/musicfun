import { NavLink } from 'react-router'
import { Path } from '@/common/routing/Routing'
import s from './Header.module.css'



export const Header = () => {
    const navItems = [
        { path: Path.Main, label: 'Main' },
        { path: Path.Playlists, label: 'Playlists' },
        { path: Path.Tracks, label: 'Tracks' },
        { path: Path.Profile, label: 'Profile' },
    ]
    return (
        <header className={s.container}>
            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}