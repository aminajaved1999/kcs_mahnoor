import React from 'react'
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputMask } from 'primereact/inputmask';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import saveConsignment from './models/saveConsignment';

function Main() {
    let navigate=useNavigate();
    const[authToken,setAuthToken]=useState('');
    const[userid,setuserid]=useState('');
  

    useEffect(() => {
            const username = 'abc';
            const cookieData = Cookies.get('name');
            if (cookieData) {
              const parsedData = JSON.parse(cookieData); 
              const authToken = parsedData.Auth_Token; 
              const userid=parsedData.UserId
              if(userid){setuserid(userid)};
              if (authToken) {
                setAuthToken(authToken);
                //request to get cities names
                axios.get('http://testv6.truckdestino.com/api/Catalogue/KcsGetCities', {
                        headers: {
                          'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
                        }
                      })
                    .then(response => {
                        debugger;
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
                //request to get categories names
                 axios.get('http://testv6.truckdestino.com/api/Catalogue/KcsGetShipmentCatagoriesWithGoods',{
                     headers :{
                        'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
                        }
                      })
                    .then(response=>{
                        if(response.data.Message==='OK'){
                            setCategoriesData(response.data.Data);
                            const categories=response.data.Data.map(catagory=>catagory.CatagoryName);
                            setCategories(categories);
                        }
                       
                    })
                    .catch(error=>{
                        if(error.response.status===401){
                            console.error('Error fetching data:', error.response.data);
                            navigate('/');
                        }
                       
                    })
                axios.get('http://testv6.truckdestino.com/api/Catalogue/KcsGetPackingTypes',{
                    headers :{
                        'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
                        }

                    })
                    .then(response=>{
                        if(response.data.Message==='OK'){
                            const packings=response.data.Data.map(packing=>packing.PackingName);
                            setPackingTypes(packings);
                        }
                    })
                    .catch(error=>{
                        if(error.response.status===401){
                            console.error('Error fetching data:',error.response);
                            navigate('/');
                        }
                       
                    })
              }
             
            }
          }, [])

            const[selectedcity, setSelectedcity] = useState('');
            const[selectOrigin,setSelectOrigin]=useState('');
            const[selectOriginCps,setSelectedOriginCps]=useState('');
            const[selectTerminalCps,setSelectedTerminalCps]=useState('');
            const[category, setCategory] = useState('');
            const[goodsType, setGoodsType] = useState('');
            const[packingType, setPackingType] = useState('');
            const[qty,setQty]=useState('');
            const[weight,setWeight]=useState('');
            const[cash,setCash]=useState('');
            const[received,setReceived]=useState('');
            const[Sendername,setSendername]=useState('');
            const[SenderMob,setSenderMob]=useState('');
            const[ReceiverName,setReceiverName]=useState('');
            const[ReceiverMob,setReceiverMob]=useState('');
            const[show,setShow]=useState(false);
            const[declaredvalue,setDeclaredvalue]=useState('');
            const[cities,setCities]=useState([]);
            const[originCps,setOriginCps]=useState([]);
            const[destinationCps,setDestinationCps]=useState([]);
            const[data,setData]=useState([]);
            const[categoriesData,setCategoriesData]=useState([]);
            const[selectedCategoryId,setSelectedCategoryId]=useState('');
            const[showGoods,setShowGoods]=useState([]);
            const[categories,setCategories]=useState([]);
            const[packingTypes,setPackingTypes]=useState([]);
            const[row, setRows] = useState([]);
            const[errorMsg,setErrorMsg]=useState('');

           
    // for dropdown events

     //dropdown for origin city
     const handleoriginSelect = (event) => {
        setSelectOrigin(event.target.value);
        setSelectedOriginCps('');
        setOriginCps([]);
    };
    useEffect(() => {
        debugger;
        console.log(selectOrigin);
        if(selectOrigin){ const selectedCity = data.find((city) => city.Name === selectOrigin);
            if (selectedCity) {
              const selectedCityId = selectedCity.Id;
              console.log(selectedCityId);
              getCollectionPoints(selectedCityId);
            } else {
              console.error('Selected city not found:', selectOrigin);
            }}
      
       
      }, [selectOrigin]);  
      
    //dropdown for terminal city
    const handlecitySelect = (event) => {
        setSelectedcity(event.target.value);    
        setSelectedTerminalCps('');
        setDestinationCps([]);
    };
    useEffect(()=>{
        console.log(selectedcity);
        // console.log(data);
        if(selectedcity){const selectedterminalCity = data.find((city) => city.Name === selectedcity);
            if (selectedterminalCity) {
              const selectedterminalCityId = selectedterminalCity.Id;
              console.log(selectedterminalCityId);
              getTerminalPoints(selectedterminalCityId);
            } else {
              console.error('Selected city not found:', selectedcity);
            }  }
        

    },[selectedcity])
  
    const handleoriginCps = (event) => {
        setSelectedOriginCps(event.target.value);
    };
    const handleTerminalCps = (event) => {
        setSelectedTerminalCps(event.target.value);
    };

    const handleCategorySelect = (event) => {
        setCategory(event.target.value);
    };
    //getting the id of selected category
    useEffect(()=>{
        //debugger;
        const selectedCategory=categoriesData.find((cat)=>cat.CatagoryName===category);
        if(selectedCategory){
            setSelectedCategoryId(selectedCategory.CatagoryId);
            console.log(selectedCategoryId);
            
        }
    },[category])

    //validate numeric values
    const validateNumericInput = (event) => {
      const { value } = event.target;
      const isValid = /^\d+$/.test(value);
  
      if (!isValid) {
        setErrorMsg('Only numeric values are allowed.');
      } else {
        setErrorMsg('');
      }
    };


    const handleGoodsTypeSelect = (event) => {
        setGoodsType(event.target.value);
    };
    const handleqty = (event) => {
      const { value } = event.target;
      const numericValue = value.replace(/[^0-9]/g, '');
      setQty(numericValue);
      if(errorMsg!=''){
        alert(errorMsg);
      }
    };
    const handleweight = (event) => {
      const { value } = event.target;
      const numericValue = value.replace(/[^0-9]/g, '');
      setWeight(numericValue);
    };
    const handledeclaredvalue = (event) => {
      const { value } = event.target;
      const numericValue = value.replace(/[^0-9]/g, '');
      setDeclaredvalue(numericValue);
    };
    const handlecash = (event) => {
        setCash(event.target.value);
    };
    const handlereceived = (event) => {
        setReceived(event.target.value);
    };
    const handleSenderName = (event) => {
        setSendername(event.target.value);
    };
    const handleSenderMob = (event) => {
        setSenderMob(event.target.value);
    };
    const handleReceiverName = (event) => {
        setReceiverName(event.target.value);
    };
    const handleReceiverMob = (event) => {
        setReceiverMob(event.target.value);
    };


    

    useEffect(()=>{
        debugger;
        if(selectedCategoryId){
            const selectedGoods= categoriesData.filter((id)=>id.CatagoryId===selectedCategoryId)
            const Sgoods=selectedGoods[0].Goods
            const goodsTypeNames = Sgoods.map((goods) => goods.TypeName);
                 setShowGoods(goodsTypeNames);
                 console.log(showGoods);
        
        }

    },[selectedCategoryId])

    const handlePackingTypeSelect = (event) => {
        setPackingType(event.target.value);
    };

    //Add new Rows
    const handleAddRow=()=>{
        const newrow={
            category:category,
            goodsType:goodsType,
            packingType:packingType,
            qty:qty,
            weight:weight,
            declaredvalue:declaredvalue,
        };
        setRows([...row,newrow]);
        setCategory('');
        setGoodsType('');
        setPackingType('');
        setQty('');
        setWeight('');
        setDeclaredvalue('');
        setShow(true);
        console.log('shutup');
        console.log(row);
    }

    const deleteRow = (rowData) => {
        const updatedRows = row.filter((row) => row !== rowData);
        setRows(updatedRows);
        if(row.length===1){
            setShow(false);
        }
      };
      

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

    //api request to get Collection Points
   
    function getCollectionPoints(cityId) {
        debugger;
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
                const CollectionPoints = response.data.Data.map(c=>c.Name);
                setOriginCps(CollectionPoints);
            }
          
          })
          .catch(error => {
            if(error.response.status===401){
                console.error('Error fetching data:', error.response.data);
                navigate('/');
            }
           
          });
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

      //api request to save data
      function saveData(){
            console.log('API working');
            const username = 'abc';
            const body=new saveConsignment();
            axios.post('http://testv6.truckdestino.com/api/Consigment/SaveConsigment', body
            , {
              headers: {
                'Authorization': `Basic ${btoa(`${username}:${authToken}`)}`
              }
            })
              .then(response => {
                console.log(response.data);
                alert('hogaya');
              
            })
              .catch(error => {
                console.error(error);
               
            });   
      }

    return (
        <div className='container-fluid mt-4 ' style={{ 'borderRadius': '4px', 'width': '95%' }}>
            <nav className="navbar navbar-expand-sm shadow p-2">
                <div className="container-fluid">
                    <span className="navbar-text">Booking Details</span>
                    <div id='DateTime' className='navbar-text'>helooo</div>
                </div>
            </nav>
            <div className='row  container-fluid p-3'>
                <div className='col'>
                    <select className="form-select mini shadow p-1" value={selectOrigin} onChange={handleoriginSelect}>
                    <option value="" disabled hidden>Origin Terminal</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                        {city}
                        </option>
                        ))}
                        </select>
                </div>
                <div className='col'>
                    <select className="form-select mini shadow p-1" value={selectOriginCps} onChange={handleoriginCps}>
                    <option value="" disabled hidden>Origin CCP</option>
                    {originCps.map((ccp, index) => (
                        <option key={index} value={ccp}>
                        {ccp}
                        </option>
                        ))}
                        </select>
                
                </div>
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
            </div>
            <div className='container-fluid' ><input className='mini shadow p-1' placeholder='Remarks' style={{ 'height': '100px', 'width': '98%' }}></input></div>

            {/* BOXES */}

            <div className='row'>
                <div className='col mt-4 shadow p-1 box'>
                    <nav className='navbar small'>
                        <span className='navbar-text'>Sender Details</span>
                    </nav>
                    <div>
                        <input className='input1 shadow p-1 mt-2' placeholder='Name' value={Sendername} onChange={handleSenderName}></input>
                    </div>
                    <div>
                         <InputMask className='input2 shadow p-1 mt-2' mask="(+92)-999-9999999" placeholder='Mob #' value={SenderMob} onChange={handleSenderMob}></InputMask>
                    </div>
                    <div>
                        <InputMask className='input3 shadow p-1 mt-2' mask='99999-9999999-9' placeholder='CNIC'></InputMask>
                    </div>
                </div>
                <div className='col mt-4 shadow p-1 box'>
                    <nav className='navbar small'>
                        <span className='navbar-text'>Reciever Details</span>
                    </nav>
                    <div>
                        <input className='input1 shadow p-1 mt-2' placeholder='Name' value={ReceiverName} onChange={handleReceiverName}></input>
                    </div>
                    <div>
                        <InputMask className='input2 shadow p-1 mt-2' mask="(+92)-999-9999999" unmask="(+92" placeholder='Mob #' value={ReceiverMob} onChange={handleReceiverMob}></InputMask>
                    </div>
                    <div>
                        <InputMask className='input3 shadow p-1 mt-2' mask='99999-9999999-9' placeholder='CNIC'></InputMask>
                    </div>
                </div>
                <div className='col mt-4 shadow p-1 box'>
                    <nav className='navbar small'>
                        <span className='navbar-text'>Calculate Amount</span>
                        <button className='cal'><FontAwesomeIcon icon="fa-solid fa-calculator" size="2x" /></button>
                    </nav>
                    <div>
                        <input className='input1 shadow p-1 mt-2' placeholder='Cash' value={cash} onChange={handlecash}></input>
                    </div>
                    <div>
                        <input className='input2 shadow p-1 mt-2' placeholder='Recievable'></input>
                    </div>
                    <div>
                        <input className='input3 shadow p-1 mt-2' placeholder='Recieved' value={received} onChange={handlereceived}></input>
                    </div>
                </div>
            </div>

            {/* shipment box */}
            <div className='col mt-4 mb-3 shadow p-1 box' style={{ 'height': 'auto' }}>
                <nav className='navbar small'>
                    <span className='navbar-text'>Shipment Details</span>
                    <button className='save'onClick={handleAddRow}><FontAwesomeIcon icon="fa-solid fa-plus" size='2x' /></button>
                    <button className='del' onClick={()=>saveData()}><FontAwesomeIcon icon="fa-solid fa-save" size="2x" /></button>
                </nav>
                <div className='row  container-fluid p-3'>

                    <div className='col'>
                        <select className="form-select mini shadow p-1" value={category} onChange={handleCategorySelect}>
                        <option value="" disabled hidden>Category</option>
                        {categories.map((cate, index) => (
                            <option key={index} value={cate}>
                            {cate}
                            </option>
                            ))}
                            </select>
                    </div>
                    <div className='col'>
                        <select className="form-select mini shadow p-1" value={goodsType} onChange={handleGoodsTypeSelect}>
                        <option value="" disabled hidden>Goods Type</option>
                            {showGoods.map((good,index) => (
                            <option key={index} value={good}>
                            {good}
                            </option>
                            ))}
                            </select>
                    </div>
                    <div className='col'>
                        <select className="form-select mini shadow p-1" value={packingType} onChange={handlePackingTypeSelect}>
                        <option value="" disabled hidden>Packing Type</option>
                            {packingTypes.map((pack,index) => (
                            <option key={index} value={pack}>
                            {pack}
                            </option>
                            ))}
                            </select>

                    </div>
                </div>

                <div className='row container-fluid p-3'>
                    <div className='col'><input className='mini shadow p-1' placeholder='Quantity' value={qty} onChange={handleqty}  onBlur={validateNumericInput}></input></div>
                    <div className='col'><input className='mini shadow p-1' placeholder='Total Weight' value={weight} onChange={handleweight}  onBlur={validateNumericInput}></input></div>
                    <div className='col'><input className='mini shadow p-1' placeholder='Declared value' value={declaredvalue} onChange={handledeclaredvalue}  onBlur={validateNumericInput}></input></div>
                </div>
                {show && 
                     <div className='row container-fluid p-3'>
                     <DataTable value={row} tableStyle={{ minWidth: '50rem' }}>
                     <Column field='category' header='Category' />
                     <Column field='goodsType' header='Goods Type' />
                     <Column field='packingType' header='Packing Type' />
                     <Column field='qty' header='Quantity' />
                     <Column field='weight' header='Total Weight' />
                     <Column field='declaredvalue' header='Declared Value' />
                     <Column
                         field="<button>"
                         header="Delete order"
                         body={(rowData) => (
                             <Button
                             icon="pi pi-trash"
                             className="p-button-danger"
                             onClick={() => deleteRow(rowData)}
                             />
                         )}
                         />
 
                     </DataTable>
                 </div>}
               

            </div>



        </div>

    )
}

export default Main