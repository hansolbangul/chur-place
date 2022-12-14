import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Router from './routes/Router';
import 'swiper/swiper.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from './atoms';
import { Axios } from './api/api';
import { AUTH } from './api/url';
import { success_notify, warning_notify } from './ts/export';

const GlobalStyle = createGlobalStyle`
  @font-face {
     font-family: 'S-CoreDream-4Regular';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  @font-face {
     font-family: 'S-CoreDream-6Bold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  body{
    margin: 0;
    display: flex;
    /* justify-content: center; */
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, input, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    font-family: S-CoreDream-4Regular;
    font-size: 12px;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .icon{
    width: 25px;
    height: 25px;
  }
  .moveIcon{
    width: 30px;
    height: 30px;
  }
`

function App() {
  const [isToken, setIsToken] = useRecoilState(isLoginAtom)

  // 모바일 환경 아래 툴바 같은게 있는데, 해당 툴바 계산
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }

  useEffect(() => {
    if (isToken && isToken !== '') {
      Axios.defaults.headers.common['Authorization'] = `Bearer ${isToken}`
      tokenAccess()
    }

    setScreenSize();
    // 리사이징때마다 툴바 계산
    window.addEventListener('resize', () => setScreenSize());
  }, []);

  const tokenAccess = async () => {
    const { data } = await Axios.post(`${AUTH}/me`)
    // 토큰 만로 || 토큰 이상? 시 리프레시
    if (data.result) {
      success_notify(data.data.name + ' 님 재방문 환영합니다.')
    } else {
      const { data: refresh } = await Axios.post(`${AUTH}/refresh`)
      console.log(refresh)
      if (refresh.result) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${refresh.data.token}`
        setIsToken(refresh.data.token)
      } else {
        warning_notify('리프레시 실패..')
        setIsToken('')
        Axios.defaults.headers.common['Authorization'] = `Bearer `
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;