import React from 'react';
import LoadTracklist from "../components/loadTracklist"

export default function Tracks() {
  return (
    <div>
      <h1>Tracks</h1>
      <span>select songs to listen</span>
      <LoadTracklist/>
    </div>
  )
}
