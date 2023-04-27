import { ref, watch } from 'vue';

export function createUUID(){
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const ran = Math.random() * 16;
    const ranDT = (dt + ran);
    const ranDTMod = ranDT%16 | 0;
    
    dt = Math.floor(dt/16);
    
    return (c==='x' ? ranDTMod :  (ranDTMod&0x3|0x8)).toString(16);
  });
}

export function toCurrency(value: number, locales = 'en-US', currency = 'USD') {
  return value.toLocaleString(locales, {
    style: 'currency',
    currency
  });
}

export function useElementSize(element: any) {
  const width = ref(0);
  const height = ref(0);

  let observer: ResizeObserver | null = null;

  function disconnect() {
    if (observer !== null) {
      observer.disconnect();
      observer = null;
    }
  }

  function connect(element: any) {
    disconnect();

    observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;

      if (rect) {
        width.value = rect.width;
        height.value = rect.height;
      }
    });

    observer.observe(element);
  }

  watch(
    element,
    (el) => {
      disconnect();

      if (el) {
        connect(el);
      }
    }
  );

  return {
    width,
    height
  };
}

