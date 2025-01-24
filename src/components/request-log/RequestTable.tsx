'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, limitToLast } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ViewButton } from './ViewButton';
import { RequestLogViewer } from './RequestLogViewer';
import { RequestCount } from './RequestCount';

interface RequestTableProps {
  requestId: string;
  initialRequests: any[];
}

function convertTimestampToISO(timestamp: { seconds: number; nanoseconds: number }) {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString();
}

export function RequestTable({ requestId, initialRequests }: RequestTableProps) {
  const [requests, setRequests] = useState(initialRequests);

  useEffect(() => {
    const collectionRef = collection(db, requestId);
    const q = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      limitToLast(100) // Limit the number of requests to improve performance
    );

    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const updatedRequests = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: convertTimestampToISO(data.createdAt),
            updatedAt: convertTimestampToISO(data.updatedAt)
          };
        });
        setRequests(updatedRequests);
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      }
    });

    return () => unsubscribe();
  }, [requestId]);

  return (
    <>
      <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-800">
        <RequestCount count={requests.length} />
      </div>
      
      <div className="overflow-x-auto">
        {/* Table code remains the same */}
        <table className="w-full border-collapse">
          {/* ... existing table head ... */}
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="group">
                {/* ... existing table row content ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {requests.map((request) => (
          <div 
            key={request.id}
            id={`request-${request.id}`}
            className="p-6 bg-gray-50 dark:bg-gray-800/50"
          >
            <RequestLogViewer log={request} />
          </div>
        ))}
      </div>
    </>
  );
}