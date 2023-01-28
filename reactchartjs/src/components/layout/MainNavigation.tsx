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
              Bar
            </NavLink>
          </li>
            <li>
            <NavLink to='/linechart' className={navData => navData.isActive ? classes.active : '' }>
            Line
            </NavLink>
          </li>
          <li>
            <NavLink to='/piechart' className={navData => navData.isActive ? classes.active : '' }>
              Pie
            </NavLink>
          </li>
          <li>
            <NavLink to='/doughnutchart' className={navData => navData.isActive ? classes.active : '' }>
              Doughnut
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
