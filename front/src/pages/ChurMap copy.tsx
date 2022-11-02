import React, { useCallback, useEffect, useRef, useState } from "react";
const image = require('../image.jpeg')
const dog = require('../dog.jpeg')

interface IIcon {
  lat: number,
  lng: number,
  text: string
}

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
  const mapElement = useRef(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  // const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [curLocation, setCurLocation] = useState<naver.maps.LatLng | null>(
    null
  );

  // 현재 위치가 변경되는 것을 mocking
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    navigator.geolocation.getCurrentPosition(centerPosition, errorPosition);

    // 실시간 위치 체크
    // navigator.geolocation.watchPosition(successPosition, errorPosition);

    // 한번만 위치 체크
    // navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
  }, []);

  const centerPosition = ({ coords }: any) => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(coords.latitude, coords.longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const mapSet = new naver.maps.Map(mapElement.current, mapOptions);

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
    console.log(mapSet)
    setMap(mapSet)

    // const marker = new naver.maps.Marker({
    //   position: location,
    //   map: mapSet,
    //   title: '나의 위치',
    //   icon: {
    //     content: `<img class='icon' src=${image} />`,
    //   },
    // });
    // setMarker(marker);

    console.log(map)

    navigator.geolocation.watchPosition(({ coords }) => successPosition({ coords }, mapSet), errorPosition);
  }

  const successPosition = ({ coords }: any, mapSet: any) => {
    const location = new naver.maps.LatLng(coords.latitude, coords.longitude);
    const marker = new naver.maps.Marker({
      position: location,
      map: mapSet,
      title: '나의 위치',
      icon: {
        content: `<img class='icon' src=${image} />`,
      },
    });
    setMarker(marker);
  }

  const errorPosition = () => {

  }

  const btn = () => {
    // latitude -= 0.001
    // longitude -= 0.001
    latitude += 0.001
    // longitude -= 0.001
    setCurLocation(new naver.maps.LatLng(latitude, longitude));
  }

  useEffect(() => {
    if (!map || !marker || !curLocation) return;
    // console.log(map, marker, curLocation)

    console.log(marker)

    map.setCenter(curLocation);
    marker.setPosition(curLocation);
  }, [curLocation, map, marker]);

  return (<>
    <div ref={mapElement} style={{ minHeight: '90vh' }} />
    <button onClick={btn}>button</button>
  </>
  );

}