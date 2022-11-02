import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { InitModal } from "../components/InitModal";
import { Div, maxWidth } from "../styled";

const image = require(`../img/image.jpeg`)
const dog = require(`../img/dog.jpeg`)

let latitude = 37.4900016,
  longitude = 127.0050478,
  data = [{
    lat: latitude + 0.002, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.003, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.004, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.005, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.006, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.007, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.008, lon: longitude, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },

  {
    lat: latitude + 0.002, lon: longitude + 0.002, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.003, lon: longitude + 0.003, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.004, lon: longitude + 0.004, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.005, lon: longitude + 0.005, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.006, lon: longitude + 0.006, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.007, lon: longitude + 0.007, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  },
  {
    lat: latitude + 0.008, lon: longitude + 0.008, title: '강아지',
    icon: {
      content: `<img class='icon' src=${dog} />`,
    },
  }]


const { naver } = window;

export const ChurMap = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>("");
  const [modalInfo, setModalInfo] = useState<{ x: number; y: number; _lat: number; _lng: number }>()
  const [modal, setModal] = useState<boolean>(false)

  console.log(modalInfo)
  // 현재 위치가 변경되는 것을 mocking

  useEffect(() => {
    if (!naver) return;

    if (navigator.geolocation) {
      // navigator.geolocation.watchPosition(successPosition, errorPosition);
      navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  const successPosition = ({ coords }: any) => {
    setMyLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  useEffect(() => {
    if (typeof myLocation === 'string' || !naver) return
    if (!map || !marker) {
      centerPosition(myLocation)
    } else {
      const location = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude);
      marker.setPosition(location);
    }
  }, [myLocation])

  const centerPosition = (coords: any) => {
    if (!naver) return;

    const location = new naver.maps.LatLng(coords.latitude, coords.longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      // zoomControl: true,
    };
    const mapSet = new naver.maps.Map('mapElement', mapOptions);
    setMap(mapSet)


    data.map(item => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(item.lat, item.lon),
        map: mapSet,
        title: '나의 위치',
        icon: {
          content: `<img class='icon' src=${dog} />`,
        }
      })
      setMarker(marker)
    })

    const markerCenter = new naver.maps.Marker({
      position: location,
      map: mapSet,
      title: '신규위치',
    });
    setMarker(markerCenter);

    naver.maps.Event.addListener(mapSet, "click", (e) => {
      setModal(true)
      setModalInfo({
        ...e.coord
      })
      markerCenter.setPosition(e.coord)
    });

  }

  const errorPosition = () => {

  }

  return (<MapForm>
    {!map && <div>loading</div>}
    <Div id={'mapElement'} style={{ height: '100vh' }} />

    <InitModal setModal={setModal} motion={modal ? maxWidth < 500 ? 300 : 500 : 100} />
  </MapForm>
  );
}

const MapForm = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`