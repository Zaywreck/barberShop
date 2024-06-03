import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [shopInfo, setShopInfo] = useState(null);
    const [services, setServices] = useState([]);
    const [location, setLocation] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [user, setUser] = useState(null);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shopDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'shop');
                const shopDocSnap = await getDoc(shopDocRef);
                if (shopDocSnap.exists()) {
                    setShopInfo(shopDocSnap.data());
                } else {
                    console.log('No shop document!');
                }

                const servicesDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'services');
                const servicesDocSnap = await getDoc(servicesDocRef);
                if (servicesDocSnap.exists()) {
                    setServices(servicesDocSnap.data());
                } else {
                    console.log('No services document!');
                }

                const locationDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'location');
                const locationDocSnap = await getDoc(locationDocRef);
                if (locationDocSnap.exists()) {
                    setLocation(locationDocSnap.data());
                } else {
                    console.log('No location document!');
                }

                const barbersCollectionRef = collection(firestore, 'config', 'senanureren0058@gmail.com', 'barbers');
                const barbersSnapshot = await getDocs(barbersCollectionRef);
                const barbersList = barbersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBarbers(barbersList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [firestore]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            getUserInfo().then(setUser).catch(console.error);
        }
    }, [auth]);

    const fetchAppointments = async (date) => {
        try {
            const dateStr = date.toISOString().split('T')[0];
            const appointmentsRef = collection(firestore, 'appointments', dateStr, 'appointments');
            const appointmentsSnapshot = await getDocs(appointmentsRef);

            const fetchedAppointments = [];
            appointmentsSnapshot.forEach(doc => {
                fetchedAppointments.push({ ...doc.data(), id: doc.id });
            });

            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchAppointmentsForDate = async (date) => {
        try {
            const dateStr = date.toISOString().split('T')[0];
            const appointmentsRef = collection(firestore, 'appointments', dateStr, 'appointments');
            const appointmentsSnapshot = await getDocs(appointmentsRef);

            const fetchedAppointments = [];
            appointmentsSnapshot.forEach(doc => {
                fetchedAppointments.push(doc.data());
            });

            return fetchedAppointments;
        } catch (error) {
            console.error('Error fetching appointments for date:', error);
            return [];
        }
    };

    const getUserInfo = async () => {
        const userEmail = auth.currentUser?.email;
        if (userEmail) {
            const userDocRef = doc(firestore, 'users', userEmail);
            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    return { ...userData, email: userEmail }; // Include email in the returned data
                } else {
                    return null;
                }
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    };

    const createBarberAccount = async (email, fullName) => {
        const password = fullName.replace(/\s+/g, ''); // Simplified password based on full name
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(firestore, 'users', email), {
                fullName: fullName,
                role: 'barber',
            });

            await setDoc(doc(firestore, 'config', 'senanureren0058@gmail.com', 'barbers', user.uid), {
                fullName: fullName,
                email: email,
            });

            Alert.alert('Success', 'Barber added successfully');
        } catch (error) {
            console.error('Error adding barber:', error);
            Alert.alert('Error', 'Error adding barber');
        }
    };

    const deleteBarberAccount = async (barberId, email) => {
        try {
            // Remove barber from Firestore
            await deleteDoc(doc(firestore, 'users', email));
            await deleteDoc(doc(firestore, 'config', 'senanureren0058@gmail.com', 'barbers', barberId));

            Alert.alert('Success', 'Barber deleted successfully');
        } catch (error) {
            console.error('Error deleting barber:', error);
            Alert.alert('Error', 'Error deleting barber');
        }
    };

    const updateBarberAccount = async (barberId, email, fullName) => {
        try {
            await setDoc(doc(firestore, 'users', email), {
                fullName: fullName,
                role: 'barber',
            });

            await setDoc(doc(firestore, 'config', 'senanureren0058@gmail.com', 'barbers', barberId), {
                fullName: fullName,
                email: email,
            });

            Alert.alert('Success', 'Barber updated successfully');
        } catch (error) {
            console.error('Error updating barber:', error);
            Alert.alert('Error', 'Error updating barber');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Reset current user
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const values = {
        shopInfo,
        services,
        location,
        appointments,
        barbers,
        fetchAppointments,
        fetchAppointmentsForDate,
        app,
        auth,
        firestore,
        user,
        getUserInfo,
        createBarberAccount,
        deleteBarberAccount,
        updateBarberAccount,
        logout,
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContext;
