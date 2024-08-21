import React from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { Input } from '../ui/input';
import { useRef } from 'react';

const GooglePlaces = () => {
  const inputRef = useRef()
  const ApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ApiKey!,
    libraries : ["places"]
  })

  const handleOnPlacesChanged = () => {
    if (inputRef.current) {
      const address = inputRef.current.getPlaces();
      console.log(address);
    }
  }

  return (
    <div>
      {isLoaded && 
      <StandaloneSearchBox
      onLoad={(ref) => inputRef.current = ref } 
      onPlacesChanged={handleOnPlacesChanged}

      >
        <Input
        type='text'
        placeholder='Enter Address'
        
        />
       </StandaloneSearchBox>
      }
    </div>
  )
}

export default GooglePlaces