import { useEffect , useState } from "react"
import AdminDietPlanDetails from  '../components/AdminDietPlanDetails'
import DietPlanForm from "../components/DietPlanForm"
import '../../public/css/DietPlanHome.css'





const AdminDietPlan = () => {


    const [dietPlans , setDietPlans] = useState(null)

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
    return(
        <div>
            <DietPlanForm/>
            <br/>
            <br/>
            <br/>
            <br/>
                <h3 className="DPpageTitle"> Manage User Diet Plan </h3>

                {dietPlans && dietPlans.map((dietPlan) =>(
                    <AdminDietPlanDetails key ={dietPlan._id} dietPlan = {dietPlan} />

                ))} 


        </div>

        
    )
}

export default AdminDietPlan