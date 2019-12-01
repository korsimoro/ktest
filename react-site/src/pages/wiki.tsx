import React from 'react'
import Iframe from 'react-iframe'

export default () => (
  <Iframe url="../wiki.html"
          width="100%"
          height="1000"
          id="myId"
          className="myClassname"
          display="block"
          position="relative"/>
)
