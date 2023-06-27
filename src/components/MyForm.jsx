// import React, { useState } from 'react';
// import { socket } from '../socket';

// export function MyForm() {
//   const [value, setValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   function onSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);

//     socket.timeout(100).emit('foo', value, () => {
//       setValue('')
//       setIsLoading(false);
//     });
//   }

//   return (
//     <form onSubmit={ onSubmit }>
//       <input value={value} onChange={ e => setValue(e.target.value) } />

//       <button type="submit" disabled={ isLoading }>Submit</button>
//     </form>
//   );
// }