import { useEffect , useState } from "react"
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import UserDietPlanDetails from  '../components/UserDietPlanDetails'
import DietPlanForm from "../components/DietPlanForm"
import '../../public/css/DietPlanHome.css'





const UserDietPlan = () => {


    const [dietPlans , setDietPlans] = useState(null)
    const [generateReport, setGenerateReport] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() =>{
        const fetchUserDetails = async() =>{
          console.log('Data retrive initiated phase 2')
          const response = await fetch('/api/accountdetails')
          const json = await response.json()
    
          if(response.ok){
              setUserDetails(json)
            
          }
        }
        fetchUserDetails()
      })
      
    useEffect(() =>{
        const fetchDietPlans = async() => {
            const response = await fetch('/api/dietPlan')
            const json =  await response.json()

            if(response.ok){

                setDietPlans(json)
                 
            }
        }
        fetchDietPlans()
    },[])

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
            backgroundColor: 'red', // Add this line to set the background color to red
            color: 'black', // Optionally, add this line to set the text color to white
            padding: 10, // Optionally, add this line to add padding to the title
          },
          title: {
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: 'black',
            color: 'red',
            textAlign: 'center',
            marginBottom: 10,
            padding: 10
          },
          table: {
            width: '100%',
            border: '1 solid red',
            marginTop: 10,
          },
          tableRow: {
            flexDirection: 'row',
          },
          tableHeaderCell: {
            width: '40%',
            textAlign: 'center',
            padding: 5,
            border: '3 solid red',
            fontWeight: 'bold',
            fontSize:'15'
          },
          tableCell: {
            width: '40%',
            textAlign: 'center',
            padding: 5,
            border: '2 solid red',
            fontSize1: '12'
          },
          footer: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'black',
            height: 100, // Increase this value to increase the height of the footer
            paddingHorizontal: 10, // Adjust the horizontal padding as needed
            flexDirection: 'row', // Align the content in a row
          },
          footerText: {
            color: 'red',
            fontSize: 16, // Adjust the font size as needed
            //alignSelf: 'flex-start', // Align the text to start from where the footer starts
            flex: 1, // Take up available space in the footer
            textAlign:'right',
            fontWeight:'extrabold',
            
  
          },
          address: {
            color: 'white',
            flex: 1,
            textAlign: 'center',
            fontSize: 14, // Adjust the font size as needed
            marginTop: 10, // Add margin space between footerText and address
  
          }
  
  
        });
  
  
        return (
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.container}>
              <Text style={styles.title1}> Dream Fitness</Text>
                <Text style={styles.title}> Diet Plan Report</Text> 
                <Text>Name: {userDetails?.userName}</Text>
                <Text>Age: {userDetails?.age}</Text>
                
  
                <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeaderCell}>Food Name</Text>
                <Text style={styles.tableHeaderCell}>Potion</Text>
                <Text style={styles.tableHeaderCell}>Description</Text>
              </View>
              {dietPlans && dietPlans.map((dietPlan) => (
                <View key={dietPlan._id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{dietPlan.title}</Text>
                  <Text style={styles.tableCell}>{dietPlan.gram}</Text>
                  <Text style={styles.tableCell}>{dietPlan.description}</Text>
                </View>
                
                ))}
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

      

    return(
        <div>
            <br/>
            <h3 className="DPpageTitle"> Manage User Diet Plan </h3>
            <p className="desdeitpara">Welcome to our diet plan webpage! We understand that maintaining a healthy diet is crucial for overall well-being. Our customized diet plans are designed to help you achieve your health and fitness goals. Whether you're looking to lose weight, improve energy levels, or simply adopt a more balanced lifestyle, our team of experts is here to guide you. With a focus on nutrient-rich foods and portion control, our diet plans are both effective and sustainable. Start your journey towards a healthier you today and discover the benefits of a well-balanced diet.</p>
                {dietPlans && dietPlans.map((dietPlan) =>(
                    <UserDietPlanDetails key ={dietPlan._id} dietPlan = {dietPlan} />

                ))} 


        <div className="generate-report">
            <button onClick={handleGenerateReport}>Generate Report</button>
        </div>

            {generateReport && (
            <PDFViewer width="100%" height={600}>
            {generatePDFReport()}
            </PDFViewer>
             )}

           
        </div>
    )
}

export default UserDietPlan