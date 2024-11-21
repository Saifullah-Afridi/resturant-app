  import { AgGridReact } from 'ag-grid-react';
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from 'react';
import EditDishModal from './EditDishModal';
  
  const DishesAdminTable = ({dishes}) => {

const [openEditModal,setOpenEditModal] = useState(false)

  const columnDefs = [
    {
      headerName: "Dish Name",
      field:"name",
      flex:1,
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center"
      }
    },
    {
      headerName: "Image",
      cellRenderer:(params)=>{
        return <img src={params?.data?.image?.url} alt="Dish image" width="60px" height="60px" />
      },
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center",
        padding: "30px 0",
      } ,
      sortable:false,
      width:150
    },
    {
      headerName:"Category",
      field:"category",
      width:150,
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center"
      }
    },
    {
      headerName: "Price",
      field: "price",
      valueFormatter:(params)=>{
        return `${params?.value} $`
      },
      width:150,
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center"
      }

    },
    {
      headerName:"Edit",
      cellRenderer:(params)=><button onClick={()=>setOpenEditModal(true)} className='bg-amber-500 w-full rounded-md hover:bg-amber-600'>Edit</button>,

      width:150,
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center"
      }
    },
    {
      headerName: "Delete",
      cellRenderer:(params)=><button 
      className='bg-red-600 w-full rounded-md hover:bg-red-500' 
      >Delete</button>,
      cellStyle:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center"
      },
      width:150  ,
      
      
    }  
  ]
    return (
      <>
      <div className='ag-theme-quartz h-[500px] mt-6 w-[100%]'>
        <AgGridReact columnDefs={columnDefs} rowData={dishes}  
        domLayout="autoHeight"
        suppressHorizontalScroll={false}
        rowHeight={60}
        
        />
      </div>
      {openEditModal && <EditDishModal setOpenEditModal={setOpenEditModal}/>}
        </>
    )
  }

  export default DishesAdminTable