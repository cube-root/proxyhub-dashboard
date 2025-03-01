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
import CryptoJS from 'crypto-js';

function convertTimestampToISO(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  return new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  ).toISOString();
}
const decrypt = (cipherText: string, secretKey: string) => {
  try {
    const [ivBase64, encryptedData] = cipherText.split(":");
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const key = CryptoJS.SHA256(secretKey);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    throw new Error("Failed to decrypt data");
  }
};

const useFirebase = (requestId: string, key: string) => {
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
          const decryptedRequest = decrypt(data.request, key);
          const decryptResponse = decrypt(data.response, key);
          return {
            id: doc.id,
            ...data,
            request: decryptedRequest,
            response: decryptResponse,
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
          const decryptedRequest = decrypt(data.request, key);
          const decryptResponse = decrypt(data.response, key);
          return {
            id: doc.id,
            ...data,
            request: decryptedRequest,
            response: decryptResponse,
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
