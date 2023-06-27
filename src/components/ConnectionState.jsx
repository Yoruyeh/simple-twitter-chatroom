import React from 'react';
import { useSocketContext } from '../context/SocketContext';

export function ConnectionState() {
  const { isConnected } = useSocketContext()

  return <p>State: { '' + isConnected }</p>;
}