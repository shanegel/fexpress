import React, { useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/uiSlice';
import axios from 'axios';

function Navbar() {
  const dispatch = useDispatch();
  const sidebarShown = useSelector((state) => state.ui.showSideBar);
  const cartNum = useSelector((state) => state.cart.totalQuantity);
  const cart = useSelector((state) => state.cart);

  const sideBarToggle = () => {
    dispatch(uiActions.toggleSideBar());
    document.body.style.overflow = 'hidden';
  };
  useEffect(() => {
    async function setData() {
      await axios.put(
        `https://groovy-groove-268003.firebaseio.com/FEcart.json`,
        cart
      );
    }
    setData();
  }, [cart]);
  return (
    <motion.nav
      className='w-full mx-auto'
      initial={{
        y: 0,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        dumping: 300,
      }}>
      <div className='flex justify-between items-center'>
        <Link to={'/'}>
          <h1 className='md:pl-20 lg:pt-10 ml-8 font-bold lg:text-3xl text-xl text-red-500'>
            Food/<span className='text-zinc-700'>Express</span>
          </h1>
        </Link>
      </div>
      <div className='lg:py-5 pt-2 w-screen mx-auto'>
        <div className='flex my-6 lg:space-x-[40%]'>
          {/* Logo image here 
      <img src={logo} alt="" className="w-32 h-auto ml-10" />*/}
          <Link to={'/'}>
            <h1 className='lg:ml-20 ml-8 font-bold lg:text-3xl text-xl text-red-500'>
              Food/<span className='mt-3 text-zinc-700'>Express</span>
            </h1>
          </Link>
        </div>
        <div className='lg:hidden'>
          {!sidebarShown && (
            <FontAwesomeIcon
              icon={faBars}
              size='lg'
              className='m-8'
              onClick={sideBarToggle}
            />
          )}
          {sidebarShown && <SideBar />}
        </div>
        <div className='lg:block hidden pr-6'>
          <ul className='flex space-x-10 text-zinc-700 font-semibold text-lg'>
            <Link to={'/'}>
              <motion.li
                className='hover:wiggle py-2 hover:text-red-500 text-red-500'
                whileHover={{
                  scale: 1.1,
                }}>
                Home
              </motion.li>
            </Link>

            <Link to={'/menu'}>
              <li className='py-2 hover:text-red-500'>Menu</li>
            </Link>

            <Link to={'/packages'}>
              <li className='py-2 hover:text-red-500'>Packages</li>
            </Link>

            <Link to={'/about'}>
              <li className='py-2 hover:text-red-500'>About</li>
            </Link>

            <Link to={'/cart'}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                fillRule='currentColor'
                className='bi bi-cart3'
                viewBox='0 0 16 16'
                id='IconChangeColor'>
                {' '}
                <path
                  d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'
                  id='mainIconPathAttribute'
                  fillRule='#000000'></path>
              </svg>
            </Link>
            <p>{cartNum}</p>

            <Link to={'/register'}>
              <motion.button
                className='flex bg-red-500 rounded-xl py-2 pr-3 text-white'
                whileTap={{
                  scale: 0.9,
                }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fillRule='currentColor'
                  className='bi bi-box-arrow-in-right mt-1 mx-2'
                  viewBox='0 0 16 16'
                  id='IconChangeColor'>
                  {' '}
                  <path
                    fillRule='evenodd'
                    d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'
                    id='mainIconPathAttribute'
                    fill='#ffff'></path>
                  <path
                    fillRule='evenodd'
                    d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                    id='mainIconPathAttribute'
                    fill='#ffff'></path>
                </svg>
                Register
              </motion.button>
            </Link>
          </ul>
        </div>
        <SideBar />
      </div>
    </motion.nav>
  );
}

export default Navbar;
