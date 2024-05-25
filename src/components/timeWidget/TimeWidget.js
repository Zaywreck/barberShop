import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import AppContext from '../../context/AppContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TimeWidget = ({ setSelectedHour, selectedDate }) => {
    const { shopInfo, firestore } = useContext(AppContext);
    const [hours, setHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedHour, setSelectedHourState] = useState(null);
    const [bookedHours, setBookedHours] = useState([]);

    useEffect(() => {
        const fetchWorkingHours = () => {
            if (shopInfo && shopInfo.workingHours) {
                const { open, close } = shopInfo.workingHours;
                console.log("Working Hours:", shopInfo.workingHours);

                const openHour = parseInt(open, 10);
                const closeHour = parseInt(close, 10);
                const hoursArray = [];

                for (let i = openHour; i < closeHour; i++) {
                    const hourString = `${i.toString().padStart(2, '0')}:00`;
                    hoursArray.push(hourString);
                }

                setHours(hoursArray);
                setIsLoading(false);  // Set loading to false after data is fetched
            } else {
                console.error("No working hours found in shopInfo");
                setIsLoading(false);
            }
        };

        fetchWorkingHours();
    }, [shopInfo]);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true); // Start loading state
        
            try {
                const appointmentsRef = collection(firestore, `appointments/${selectedDate.toISOString().split('T')[0]}/appointments`);
                const querySnapshot = await getDocs(appointmentsRef);
                const booked = [];
        
                querySnapshot.forEach((doc) => {
                    booked.push(doc.data().hour);
                });
        
                console.log("Booked Hours:", booked);
                setBookedHours(booked);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
            setIsLoading(false); // End loading state
        };
        
        

        if (selectedDate) {
            fetchAppointments();
        }
    }, [selectedDate, firestore]);

    const handleHourPress = (hour) => {
        if (!bookedHours.includes(hour)) {
            setSelectedHour(hour);
            setSelectedHourState(hour);
            console.log("Selected Hour:", hour);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color={colors.primary500} style={styles.loadingIndicator} />;
    }

    return (
        <FlatList
            data={hours}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.hourBox,
                        selectedHour === item && styles.selectedHourBox,
                        bookedHours.includes(item) && styles.bookedHourBox
                    ]}
                    onPress={() => handleHourPress(item)}
                    disabled={bookedHours.includes(item)}
                >
                    <Text style={[
                        styles.hourText,
                        selectedHour === item && styles.selectedHourText,
                        bookedHours.includes(item) && styles.bookedHourText
                    ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            numColumns={3}
            contentContainerStyle={styles.hoursContainer}
        />
    );
};

const styles = StyleSheet.create({
    hoursContainer: {
        alignItems: 'stretch',
    },
    hourBox: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: colors.primary500,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedHourBox: {
        backgroundColor: colors.primary300,
    },
    bookedHourBox: {
        backgroundColor: 'red', // Change to the desired color for booked hours
    },
    hourText: {
        color: colors.white,
    },
    selectedHourText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    bookedHourText: {
        color: colors.white,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default TimeWidget;
