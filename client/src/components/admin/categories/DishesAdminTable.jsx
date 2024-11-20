import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
const DishesAdminTable = ({dishes}) => {

const columnDefs = [
  {
    headerName: "Dish Name",
    field:"name",
  },
   {
    headerName: "Image",
    cellRenderer:(params)=>{
      return <img src={params?.data?.image?.url} alt="Dish image" width="60px" height="60px" />
    },
    sortable:false
  },
  {
    headerName:"Category",
    field:"category",
  },
  {
    headerName: "Price",
    field: "price",
    valueFormatter:(params)=>{
      return `${params?.value} $`
    },

  },
  {
    headerName:"Edit",
    cellRenderer:(params)=><button>Edit</button>
  },
  {
    headerName: "Delete",
    cellRenderer:(params)=><button>Delete</button>  
  }  
]
  return (
    <div className='ag-theme-quartz h-[500px] mt-6 '>
      <AgGridReact columnDefs={columnDefs} rowData={dishes} />
    </div>
  )
}

export default DishesAdminTable