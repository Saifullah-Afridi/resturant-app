import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 

const columnDefs = [{
    headerName: "Name", field: "name"
},{
    headerName: "Image", field: "image"
},{
    headerName:"Total dishes", field:"dishes"
},
{headerName:"Edit" ,field:"<button>Edit</button>" },
{headerName:"Delete" ,field:"<button>Delete</button>" }]
const CategoriesTable = ({categories}) => {


  return (<>
  
   <div className='ag-theme-quartz  h-[70vh]'>
    <AgGridReact columnDefs={columnDefs} rowData={categories} pagination={true} />
   </div>
  </>
  )
}

export default CategoriesTable