import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import logoutHandler from '../utils/functions/logout-handler';
import { ErrorModal, Loader  } from 'mv-shared-components/dist';
import Header from '../components/header/header';
import HomeComponent from './home';

const Home: NextPage = () => {
  const context = useWeb3React();
  const dispatch = useDispatch();
  const router = useRouter();

  const [errorString, setErrorString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutLoader, setLogoutLoader] = useState(false);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  }
  useEffect(() => {
    window?.ethereum?.on('accountsChanged', async (account: any) => {
      if (account?.length < 1) {
        logoutHandler(dispatch, router, context, "/", setErrorString, setIsModalOpen, setLogoutLoader);
      }
    });
  }, [])

  return (
    <div>
      <ErrorModal modalIsOpen={isModalOpen} closeModal={closeModalHandler} stringToShow={errorString} />
      <Script id="xml-script">
        {`
        if(XMLHttpRequest.prototype.open !== newOpen){
          XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
          
            var newOpen = function (_, url) {
              var original = this.originalOpen.apply(this, arguments);
                if (url.indexOf('https://dev-services.wrld.xyz/') === 0) {
                  this.withCredentials = true;
                }
    
              return original;
              
              }
              XMLHttpRequest.prototype.open = newOpen;
          }   
      `}
      </Script>
      {logoutLoader ? <Loader /> :
        <>
          <HomeComponent />
        </>
      }
    </div>
  )
}

export default Home
