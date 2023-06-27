import React from 'react';
import { useSocketContext } from '../context/SocketContext';

export function Events() {
  const { fooEvents } = useSocketContext()

  return (
    <ul>
    {fooEvents &&
      fooEvents.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}