import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';

export default function DownloadPDF() {

    const prop = JSON.parse(localStorage.getItem('propUser'));

    const [generateReport, setGenerateReport] = useState(false);
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {



        setUserDetails(prop)
        handleGenerateReport()
    }, [])

    const handleGenerateReport = () => {
        setGenerateReport(true);
    };

    const generatePDFReport = () => {

        const styles = StyleSheet.create({
            page: {
                padding: 20,
            },
            container: {
                flex: 1,
                marginBottom: 0,
            },
            title1: {
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
                backgroundColor: 'black',
                color: 'white',
                padding: 10,
                borderRadius: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            },
            title: {
                fontSize: 18,
                fontWeight: 'bold',
                backgroundColor: 'red',
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
                padding: 10,
                borderRadius: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            },
            table: {
                width: '100%',
                borderWidth: 1,
                borderColor: 'red',
                marginTop: 50,
            },
            tableRow: {
                flexDirection: 'row',
                marginTop: 5
            },
            tableHeaderCell: {
                width: '100%',
                textAlign: 'center',
                padding: 5,
                borderWidth: 3,
                borderColor: 'red',
                fontWeight: 'bold',
                fontSize: 15,
                backgroundColor: 'lightgray',
            },
            tableCell: {
                width: '40%',
                textAlign: 'center',
                padding: 5,
                borderWidth: 2,
                borderColor: 'red',
                fontSize: 12,
            },
            footer: {
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                backgroundColor: 'black',
                height: 120,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            footerText: {
                color: 'red',
                fontSize: 16,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                textAlign: 'right',
            },
            address: {
                color: 'white',
                textAlign: 'center',
                fontSize: 14,
                marginTop: 10,
            },
        });


        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>
                        <Text style={styles.title1}> Dream Fitness</Text>
                        <Text style={styles.title}> {userDetails.userName} details Report</Text>

                        <Text>UserID: {userDetails?._id}</Text>


                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>User Name : {userDetails.userName}</Text>
                                <Text style={styles.tableHeaderCell}>First Name : {userDetails.fName}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Last Name : {userDetails.lName}</Text>
                                <Text style={styles.tableHeaderCell}>Date of birth : {userDetails.DOB}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Gender : {userDetails.gender}</Text>
                                <Text style={styles.tableHeaderCell}>Nationa Identity Card No : {userDetails.NIC}</Text>

                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Age : {userDetails.age}</Text>
                                <Text style={styles.tableHeaderCell}>Height : {userDetails.height}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Weight : {userDetails.weight}</Text>
                                <Text style={styles.tableHeaderCell}>Total Fat Percentage : {userDetails.TFP}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Body Mass Index : {userDetails.BMI}</Text>
                                <Text style={styles.tableHeaderCell}>User fitness goal : {userDetails.goal}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Email : {userDetails.email}</Text>
                                <Text style={styles.tableHeaderCell}>Contact No : {userDetails.contactNo}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Emergency Contact No : {userDetails.emergencyContact}</Text>
                                <Text style={styles.tableHeaderCell}>Address : {userDetails.address}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Fitness Plan : {userDetails.myFitnessPlan}</Text>
                                <Text style={styles.tableHeaderCell}>Payment Method : {userDetails.paymentMethod}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Payment Status : {userDetails.paymentStatus}</Text>
                                <Text style={styles.tableHeaderCell}>Plan started date : {userDetails.planStartedDate}</Text>

                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Account Status : {userDetails.accountStatus}%</Text>
                                <Text style={styles.tableHeaderCell}>Account created date : {userDetails.accountCreatedDate}</Text>

                            </View>

                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Dream Fitness</Text>
                            <Text style={styles.address}>No. 101/3,New Kandy Rd, Kaduwela,10640</Text>
                            
                        </View>
                    </View>
                </Page>
            </Document>
        );
    };


    return (
        <div>

            {generateReport && (
                <PDFViewer width="100%" height={600}>
                    {generatePDFReport()}
                </PDFViewer>
            )}
        </div>

    )
}