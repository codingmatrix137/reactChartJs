import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Charts</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/barchart' className={navData => navData.isActive ? classes.active : '' }>
              Bar Charts
            </NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
