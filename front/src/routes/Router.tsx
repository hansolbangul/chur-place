import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { ChurMap } from '../pages/ChurMap';
import { Mobile } from '../styled';
import { maxWidth } from '../styled';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

function Router() {

  return (
    <BrowserRouter>
      <Mobile>
        <Header />
        <Routes>
          <Route path="/nmap" element={<ChurMap />}></Route>
        </Routes>
        <ToastAlert position="top-center" />
      </Mobile>
    </BrowserRouter>
  );
}

export default Router;

const ToastAlert = styled(ToastContainer)`
  

  @media screen and (max-width: 500px) {
    width: ${maxWidth < 500 && 300}px;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0)
  }
`
