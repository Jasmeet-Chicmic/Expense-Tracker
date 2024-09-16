import AdditionButtons from "./DashboardHomePageComponents/AdditionButtons"
import OverView from "./DashboardHomePageComponents/OverView"
import SpendFrequency from "./DashboardHomePageComponents/SpendFrequency"
import TransactionSection from "./DashboardHomePageComponents/TransactionSection"

const DashboardHomePage = () => {
  return (
    <div className="flex flex-col h-screen text-white">
        <div className="text-3xl font-bold h-[80px] flex p-4 justify-between items-center">
            <div>Dashboard</div>
           <AdditionButtons></AdditionButtons>
         
        </div>

        <div className="flex  gap-4 p-4 h-5/6">
            <div className="flex flex-col flex-1 gap-4">
               <OverView></OverView>
               <SpendFrequency></SpendFrequency>
            </div>
            <TransactionSection></TransactionSection>
            
        </div>
    </div>
  )
}

export default DashboardHomePage