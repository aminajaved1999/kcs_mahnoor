import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Cookies from 'js-cookie';

function Dispatch() {
    let navigate=useNavigate();

    const[authToken,setAuthToken]=useState('');
    const[selectedcity, setSelectedcity] = useState('');
    const[selectTerminalCps,setSelectedTerminalCps]=useState('');
    const[dispatchMode,setDispatchMode]=useState('');
    const[vehicle,setVehicle]=useState('');
    const[driver,setDriver]=useState('');
    const[datetime,setDatetime]=useState('');
    const[destinationCps,setDestinationCps]=useState([]);
    const[cities,setCities]=useState([]);
    const[data,setData]=useState([]);
    const[consignmentData,setConsignmentData]=useState([]);
    const[barcode,setBarcode]=useState([]);
    const[totalWeight,setTotalWeight]=useState([]);
    const[totalQty,setTotalQty]=useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    


     //display current date and time
     function getCurrentDateTime() {
        var now = new Date();
        var date = now.toDateString();
        var time = now.toLocaleTimeString();

        return date + ' ' + time;
    }
    function updateCurrentDateTime() {
        var currentDateTimeElement = document.getElementById('DateTime');
        if (currentDateTimeElement != null)
            currentDateTimeElement.innerHTML = getCurrentDateTime();
    }
    updateCurrentDateTime();
    setInterval(updateCurrentDateTime, 1000);


    useEffect(() => {
        const username = 'abc';
        const cookieData = Cookies.get('name');
        if (cookieData) {
          const parsedData = JSON.parse(cookieData); 
          const authToken = parsedData.Auth_Token; 
        //   const userid=parsedData.UserId
        //   if(userid){setuserid(userid)};
          if (authToken) {
            setAuthToken(authToken);
            //request to get cities names
            axios.get('http://testv6.truckdestino.com/api/Catalogue/KcsGetCities', {
                    headers: {
                      'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
                    }
                  })
                .then(response => {
                    if(response.data.Message==='OK'){setData(response.data.Data);
                        const cityNames = response.data.Data.map(city => city.Name);
                        setCities(cityNames); }
                })

                .catch(error => {
                    if(error.response.status===401){
                    console.error('Error fetching data:', error.response.data);
                    navigate('/');
                    }
                });
               
            }
        }
      }, [])

     //dropdown for terminal city
     const handlecitySelect = (event) => {
        setSelectedcity(event.target.value);    
        setSelectedTerminalCps('');
        setDestinationCps([]);
    };
    useEffect(()=>{
        console.log(selectedcity);
        if(selectedcity){const selectedterminalCity = data.find((city) => city.Name === selectedcity);
            if (selectedterminalCity) {
              const selectedterminalCityId = selectedterminalCity.Id;
              console.log(selectedterminalCityId);
              getTerminalPoints(selectedterminalCityId);
            } else {
              console.error('Selected city not found:', selectedcity);
            }  }
        

    },[selectedcity])

    const handleTerminalCps = (event) => {
        setSelectedTerminalCps(event.target.value);
    };

    const handleDispatchMode = (event) => {
        setDispatchMode(event.target.value);
    };
    const handledriver = (event) => {
        setDriver(event.target.value);
    };
    const handleVehicle = (event) => {
        setVehicle(event.target.value);
    };
    const handleDate = (event) => {
        setDatetime(event.target.value);
    };
    function getConsignmentsByCity(){
        const username='abc';
        axios.post('http://testv6.truckdestino.com/api/Dispatch/GetConsignmentBoxForShipmentByCity',{
            "CarrierIds": [
                1
              ],
            "CityTerminalId": 1
        },{
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
            } 
        })
        .then(response=>{
            debugger;
            const bookingId = response.data.Data.map(con => con.ConsigmentNo);
            setConsignmentData(bookingId);
            const weight = response.data.Data.map(w => w.TotalWeight);
            setTotalWeight(weight);
            const qty = response.data.Data.map(q => q.TotalBox);
            setTotalQty(qty);
            const bar=response.data.Data.map(i=>i.BoxForShipmentList);
            setBarcode(bar);
            console.log('hoja print kya masla hai');
            console.log(barcode);
        })
        .catch(error=>{
            console.error(error);
        })
    }

    function getTerminalPoints(cityId) {
        const username = 'abc';
        axios.post('http://testv6.truckdestino.com/api/Catalogue/KcsGetCargoCollectionPoints', {
          value: cityId
        }, {
          headers: {
            'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
          }
        })
          .then(response => {
            if(response.data.Message==='OK'){
                const terminalPoints = response.data.Data.map(c=>c.Name);
                setDestinationCps(terminalPoints);
            }   
          })
          .catch(error => {
            if(error.response.status===401){
                console.error('Error fetching data:', error.response.data);
                navigate('/');
            }
          
          });
      }
      //to fill the booking list table
      const mergedData = consignmentData.map((item, index) => ({
        ConsignmentNo: item,
        Weight: totalWeight[index],
        Quantity: totalQty[index],
        destCCP: selectTerminalCps
      }));

      //further details
      const boxForShipmentList = barcode && barcode.BoxForShipmentList
      ? barcode.BoxForShipmentList.map((item) => ({
          Id: item.Id,
          GoodsTypeName: item.GoodsTypeName,
          PackingTypeName: item.PackingTypeName,
        }))
      : [];
      

      const handleDetailsClick = (rowData) => {
        setExpandedRow(rowData.ConsignmentNo);
      };

    //   const renderCheckbox = (rowData) => {
        // Implement your checkbox logic here
        // You can use state or props to manage the checked state of the checkboxes
        // Example: You can have an array of selectedRowIds and update it based on checkbox selection
        // const handleCheckboxChange = (event, rowData) => {
        //   // Update selectedRowIds state or perform any other desired logic
        // };
    
        // Example Checkbox implementation:
        // Replace 'selectedRowIds' and 'handleCheckboxChange' with your actual state and handler
    //     return (
    //       <input
    //         type="checkbox"
    //         checked={selectedRowIds.includes(rowData.helo)}
    //         onChange={(event) => handleCheckboxChange(event, rowData)}
    //       />
    //     );
    //   };
    

      const renderDetailsTable = (rowData) => {
        return (
          <DataTable value={boxForShipmentList}>
            <Column field='Id' header='Barcode' />
            <Column field='GoodsTypeName' header='Goods Type' />
            <Column field='PackingTypeName' header='Packing' />
          </DataTable>
        );
      };


  


  return (
    <div className='container-fluid mt-4 '>
        <nav className="navbar navbar-expand-sm shadow p-2">
            <div className="container-fluid">
                <span className="navbar-text">Dispatch Details</span>
                <div id='DateTime' className='navbar-text'>helooo</div>
            </div>
        </nav>
        <div className='row  container-fluid p-3'>
                <div className='col'>
                <select className="form-select mini shadow p-1" value={selectedcity} onChange={handlecitySelect}>
                    <option value="" disabled hidden>Destination Terminal</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                        {city}
                        </option>
                        ))}
                </select>
                </div>
                <div className='col'>
                <select className="form-select mini shadow p-1" value={selectTerminalCps} onChange={handleTerminalCps}>
                    <option value="" disabled hidden>Terminal CCP</option>
                    {destinationCps.map((ccp, index) => (
                        <option key={index} value={ccp}>
                        {ccp}
                        </option>
                        ))}
                        </select>
                </div>
                <div className='col'>
                <select className="form-select mini shadow p-1" value={dispatchMode} onChange={handleDispatchMode} >
                    <option value='' disabled hidden>Dispatch Mode</option>
                        <option>Bus</option>
                        <option>Mazda</option>
                        <option>Pickup</option>
                    </select>
                </div>
            </div>
            <div className='row  container-fluid p-3'>
            <button onClick={()=>getConsignmentsByCity()}>get</button>
                <div className='col'><input className='mini shadow p-1' placeholder='Vehicle' value={vehicle} onChange={handleVehicle}  ></input></div>
                <div className='col'><Calendar  className='mini shadow p-1' dateFormat="dd/mm/yy" value={datetime} onChange={handleDate} placeholder='Departure Date/Time'
                showIcon></Calendar></div>
 
                {/* <div className='col'><input className='mini shadow p-1' placeholder='Departure Date/Time'  ></input></div> */}
                <div className='col'><input className='mini shadow p-1' placeholder='Declared value' value={driver} onChange={handledriver}  ></input></div>
            </div>
            <div className='row container-fluid p-3'>
                <input className='mini shadow p-1' placeholder='Remarks' style={{ 'height': '100px', 'width': '99%' }}></input>
            </div>
            <div className='row container-fluid p-3'>
                <div className='col shadow p-1 box'>
                    <nav className='navbar small'>
                        <span className='navbar-text'>List of Bookings</span>
                    </nav>
                    <div className='container-fluid p-3'></div>
                    <DataTable  value={mergedData} tableStyle={{ minWidth: '50rem' }}>
                     
                     <Column field='ConsignmentNo' header='Booking ID' />
                     <Column field='destCCP' header='Destination CCP' />
                     <Column field='Weight' header='Total Weight' />
                     <Column field='Quantity' header='Total Quantity' />
                     <Column header='Further Details'body={(rowData) => (
                    <div>
                    <select onClick={() => handleDetailsClick(rowData)}>Details</select>
                    {expandedRow === rowData.ConsignmentNo && renderDetailsTable(rowData)}
                    </div>
                    )}
                    />
  
                    </DataTable>
                </div>
                {/* <div className='col'>
                    <nav className='navbar small'>
                        <span className='navbar-text'>Selected Bookings</span>
                    </nav>
                </div> */}
            </div>
           
    </div>
  )
}

export default Dispatch