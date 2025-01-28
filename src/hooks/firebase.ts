"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limitToLast,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function convertTimestampToISO(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  return new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  ).toISOString();
}

const useFirebase = (requestId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'proxy', requestId, 'data');
        const q = query(collectionRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: convertTimestampToISO(data.createdAt),
            updatedAt: convertTimestampToISO(data.updatedAt),
          };
        });
        setData(requests);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  useEffect(() => {
    const collectionRef = collection(db, 'proxy', requestId, 'data');
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limitToLast(100)
    );
    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const updatedRequests = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: convertTimestampToISO(data.createdAt),
            updatedAt: convertTimestampToISO(data.updatedAt),
          };
        });
        setData(updatedRequests);
      },
      error: (err) => {
        setError(err as Error);
      },
    });

    return () => unsubscribe();
  }, [requestId]);

  return { isLoading, error, data };
};

export { useFirebase };
