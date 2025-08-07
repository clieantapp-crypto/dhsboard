import {
    collection,
    getDocs,
    query,
    orderBy,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase";
  import type { Order, Product, Customer } from "@/lib/definitions";
import { MainDashboard } from "@/components/maindashbord";
  
  // Helper function to safely serialize Firestore Timestamps
  const serializeTimestamps = (data: any[]) => {
    return data.map(item => {
      const newItem = { ...item };
      for (const key in newItem) {
        if (newItem[key] instanceof Timestamp) {
          newItem[key] = newItem[key].toDate().toISOString();
        }
      }
      return newItem;
    });
  };
  
  async function getDashboardData() {
    // Use Promise.all for efficient, parallel data fetching
    const [ordersSnapshot, customersSnapshot, productsSnapshot] = await Promise.all([
      getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc"))),
      getDocs(collection(db, "customers")),
      getDocs(collection(db, "products"))
    ]);
  
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
    const customers = customersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Customer[];
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  
    return {
      initialOrders: serializeTimestamps(orders),
      initialCustomers: serializeTimestamps(customers),
      initialProducts: serializeTimestamps(products),
    };
  }
  
  export default async function DashboardPage() {
    const data = await getDashboardData();
    return <MainDashboard {...data} />;
  }
  