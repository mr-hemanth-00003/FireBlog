
'use client';

import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// A simple UUID generator
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = generateUUID();
        localStorage.setItem('visitorId', visitorId);
      }
      
      try {
        await addDoc(collection(db, 'visitors'), {
          visitorId: visitorId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          path: window.location.pathname,
        });
      } catch (error) {
        console.error("Error logging visitor: ", error);
      }
    };

    trackVisitor();
  }, []);

  return null;
}
