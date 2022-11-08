import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { Axios } from "../api/api";
import { LOCATION } from "../api/url";
import { InitModal } from "../components/InitModal";
import { Div, maxWidth } from "../styled";
import { defaultImage } from "../ts/export";
import { IGetLocation, ILatLon } from "../ts/interface";

const { naver } = window;

export const ChurMap = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>("");
  const [modalInfo, setModalInfo] = useState<ILatLon | naver.maps.LatLng | null>(null)
  const [viewInfo, setViewInfo] = useState<IGetLocation | null>(null)
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

  const getData = (mapSet: any) => {
    const getClickHandler = (item: any) => {
      setViewInfo(item)
    }

    Axios.get(LOCATION).then((data: { data: { data: IGetLocation[] } }) => {
      data.data.data.map((item: any) => {
        const image = require(`../img/type_${item.type_id}.svg`)
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(item.lat, item.lon),
          map: mapSet,
          title: '고양이',
          icon: {
            content: `<img class='icon' src=${image} />`,
          }
        })
        setMarker(marker)
        naver.maps.Event.addListener(marker, "click", () => getClickHandler(item))
      })
    })
  }

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

    setModalInfo(location)

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      // zoomControl: true,
    };
    const mapSet = new naver.maps.Map('mapElement', mapOptions);
    setMap(mapSet)

    getData(mapSet)

    const move = require(`../img/move.svg`).default
    const markerCenter = new naver.maps.Marker({
      position: location,
      map: mapSet,
      title: '신규위치',
      icon: {
        content: `<img class='moveIcon' src=${move} />`,
      }
    });
    setMarker(markerCenter);

    naver.maps.Event.addListener(mapSet, "click", (e) => {
      setViewInfo(null)
      setModalInfo({
        ...e.coord
      })
      markerCenter.setPosition(e.coord)
    });

  }

  const errorPosition = () => {

  }

  const footer = useCallback(() => {
    if (modalInfo) return <InitModal viewInfo={viewInfo} modalInfo={modalInfo} setViewInfo={setViewInfo} map={map} setMarker={setMarker} />
  }, [modalInfo, viewInfo])

  return (<MapForm>
    {!map && <div>loading</div>}
    <Div id={'mapElement'} style={{ height: '100%' }} />
    {footer()}
  </MapForm>
  );
}

const MapForm = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  overflow: hidden;
`