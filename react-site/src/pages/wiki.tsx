import React from 'react'
import Iframe from 'react-iframe'

export default () => (
  <Iframe url="http://127.0.0.1:8080"
          width="100%"
          height="1000"
          id="myId"
          className="myClassname"
          display="block"
          position="relative"/>
)
