import { Fragment } from 'react';

import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
interface Props {
  children: React.ReactNode;
}
 
const Layout : React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
