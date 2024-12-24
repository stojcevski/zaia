'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';

interface MapTypes {
  mapContainerClassName?: string;
}

const options = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

export default function MapView({ mapContainerClassName }: MapTypes) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  });

  if (!isLoaded) {
    return <span>Loading...</span>;
  }

  const Marker = (props: { lat: number; lng: number; position: { lat: number; lng: number; }, text: string; desc?: string; link?: string; logo?: string }) => (
    <div
      onClick={() => {
        if (props.desc)
          window.open(!props.link ? `https://www.google.com/maps/?ll=${props.lat},${props.lng}` : props.link, "#blank");
      }}
      className="h-full w-full origin-center flex items-center justify-center"
    >
      <div className="h-4 w-4 bg-black rounded-full self-center"></div>
      <div className="scale-[60%] sm:scale-100 origin-right absolute right-1/3 top-2/3 -translate-y-[40%] cursor-pointer hover:scale-105 hover:shadow-2xl bg-white flex items-center p-6 pl-4 w-fit h-fit rounded-2xl shadow-xl bezier-transition">
        <div className="w-[8rem] flex flex-col">
          <span className="text-sm font-bold w-full text-left">{props.text}</span>
          <span className="text-left w-full opacity-60">{props.desc}</span>
        </div>
        <img className="p-3" alt="zaia" src={props.logo ?? "/images/zaia.ico"} width={58} height={58} />
      </div>
    </div>
  );

  return (
    <GoogleMap
      mapContainerClassName={mapContainerClassName}
      center={{
        lat: 36.0236,
        lng: 27.9252,
      }
      }
      zoom={15}
      options={options}
    >
      <Marker
        position={{ lat: 36.0213, lng: 27.9214 }}
        lat={36.0213}
        lng={27.9214}
        text="Zaia Suites & Living"
        desc="Gennadi, Rhodes"
        link='https://maps.app.goo.gl/xucuBDqs3NFMzrUG7'
      />
    </GoogleMap >
  );
}
