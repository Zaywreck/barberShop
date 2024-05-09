import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
// implement later
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [shopInfo, setShopInfo] = useState(null); // State to store shop info
    const [services, setServices] = useState([]); // State to store services
    const [location, setLocation] = useState(null); // State to store location

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // use this after package installation
    // const auth = initializeAuth(app, {
    //     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    //   });
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shopDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'shop');
                const shopDocSnap = await getDoc(shopDocRef);
                if (shopDocSnap.exists()) {
                    const shopData = shopDocSnap.data();
                    setShopInfo(shopData); // Update shopInfo state with fetched data
                } else {
                    console.log('No shop document!');
                }

                const servicesDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'services');
                const servicesDocSnap = await getDoc(servicesDocRef);
                if (servicesDocSnap.exists()) {
                    const servicesData = servicesDocSnap.data();
                    setServices(servicesData); // Update services state with fetched data
                } else {
                    console.log('No services document!');
                }

                const locationDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'location');
                const locationDocSnap = await getDoc(locationDocRef);
                if (locationDocSnap.exists()) {
                    const locationData = locationDocSnap.data();
                    setLocation(locationData); // Update location state with fetched data
                } else {
                    console.log('No location document!');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup code if needed
        };
    }, []);

    const values = {
        shopInfo: shopInfo,
        services: services,
        location: location,
        app: app,
        auth: auth,
        firestore: firestore,
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContext;
