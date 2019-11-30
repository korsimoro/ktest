import React from 'react'
import { Link } from '@reach/router'

export default () => (
  <ol>
    <li><Link to="/organization">Organization</Link></li>
    <li><Link to="/event">Event</Link></li>
    <li><Link to="/project-or-product">Project Or Product</Link></li>
    <li><Link to="/publication">Publication</Link></li>
    <li><Link to="/person">Person</Link></li>
    <li><Link to="/working-group">Working Group</Link></li>
  </ol>
)
