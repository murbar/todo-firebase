import { useEffect } from 'react';
import config from 'config';

export default function useLogging(data, label = 'Data') {
  useEffect(() => {
    if (config.env === 'development') {
      console.log(label, data);
    }
  }, [data, label]);
}
