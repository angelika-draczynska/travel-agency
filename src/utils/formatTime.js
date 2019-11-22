export const formatTime = argument => {
  if (typeof argument !== 'number') {
    return null;
  }

  if (argument < 0) {
    return null;
  }

  const seconds = Math.floor(argument % 60).toString().padStart(2, '0');
  const minutes = Math.floor((argument / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(argument / 3600).toString().padStart(2, '0');

  const formattedTime = hours + ':' + minutes + ':' + seconds; 

  return formattedTime;

};
