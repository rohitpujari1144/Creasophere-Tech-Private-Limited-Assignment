import React from 'react'
import './form.css'

function Form() {
    const projectData=[
        {
            city:'Pune',
            location:'Khadki',
            projectName:'Sun Shine Green',
            coordinates1:18.56639775919182,
            coordinates2:73.83851296931093
        },
        {
            city:'Pune',
            location:'Khadki',
            projectName:'Mont Vert',
            coordinates1:18.56448825647721,
            coordinates2:73.83767986997688
        },
        {
            city:'Pune',
            location:'Pimple Saudagar',
            projectName:'Bhoomi Allium',
            coordinates1:18.59941482022125,
            coordinates2:73.79228913953241
        },
        {
            city:'Pune',
            location:'Khadki',
            projectName:'Satin Brick',
            coordinates1:18.564528299860857,
            coordinates2:73.95034719553216
        },
        {
            city:'Pune',
            location:'Hinjewadi',
            projectName:'Eon Homes',
            coordinates1:18.579354440961446,
            coordinates2:73.68963942242554
        },
    ]

    function citySelectValidate(){
        const citySelect=document.getElementById('citySelect')
        const citySelectError=document.getElementById('citySelectError')
        if(citySelect.value==="choose"){
            citySelectError.innerText="*Please select city"
        }
        else{
            citySelectError.innerText=""
        }
    }

    function locationSelectValidate(){
        const locationSelect=document.getElementById('locationSelect')
        const longitudeError=document.getElementById('longitudeError')
        const latitude=document.getElementById('latitude')
        const longitude=document.getElementById('longitude')

        if(locationSelect.value==="choose"){
            longitudeError.innerText="*Please select location or enter longitude and latitude"
            latitude.removeAttribute('disabled')
            longitude.removeAttribute('disabled')
        }
        else{
            longitudeError.innerText=""
            latitude.setAttribute('disabled', true)
            longitude.setAttribute('disabled', true)
        }
    }

    function latitudeValidate(){
        const longitudeError=document.getElementById('longitudeError')
        const locationSelect=document.getElementById('locationSelect')
        const longitude=document.getElementById('longitude')
        const latitude=document.getElementById('latitude')
        if(longitude.value==="" || latitude.value===""){
            longitudeError.innerText='*Please select location or enter longitude and latitude'
            locationSelect.removeAttribute('disabled')

        }
        else if(longitude.value==="" && latitude.value===""){
            locationSelect.removeAttribute('disabled')

        }
        else{
            longitudeError.innerText=""
            locationSelect.setAttribute('disabled', true)

        }
    }

    function submitClick(e){
        e.preventDefault()
        var latValue
        var langValue
        var srcLink
        const citySelect=document.getElementById('citySelect')
        const citySelectError=document.getElementById('citySelectError')
        const locationSelect=document.getElementById('locationSelect')
        const latitude=document.getElementById('latitude')
        const longitude=document.getElementById('longitude')
        const longitudeError=document.getElementById('longitudeError')

        if(citySelect.value==="choose"){
            citySelectError.innerText="*Please select city"
        }
        else{
            citySelectError.innerText=""
        }
        if((latitude.value==="" && longitude.value==="" && locationSelect.value==="choose")){
            longitudeError.innerText='*Please select location or enter longitude and latitude'
        }
        else{
            longitudeError.innerText=""
        }
        if(longitudeError.innerText==="" && citySelectError.innerText===""){
            const mapIframe=document.getElementById('mapIframe')
            if(locationSelect.value!=="choose"){
            let locationData=projectData.filter((e)=>e.projectName===locationSelect.value)
            latValue=locationData[0].coordinates1
            langValue=locationData[0].coordinates2
            srcLink=`https://maps.google.com/maps?q=${latValue},${langValue}&hl=es;&output=embed`
            mapIframe.src=srcLink
        }
        else if(locationSelect.value==="choose"){
            document.getElementById('locationSelect').setAttribute('disabled', true)
            latValue=latitude.value
            langValue=longitude.value
            srcLink=`https://maps.google.com/maps?q=${latValue},${langValue}&hl=es;&output=embed`
            mapIframe.src=srcLink
            console.log(latValue);
            console.log(langValue);
        }
            
        }
    }

    function resetForm(){
        document.getElementById('citySelect').value="choose"
        document.getElementById('locationSelect').value="choose"
        document.getElementById('locationSelect').removeAttribute('disabled')
        document.getElementById('latitude').value=""
        document.getElementById('longitude').value=""
        document.getElementById('latitude').removeAttribute('disabled')
        document.getElementById('longitude').removeAttribute('disabled')
    }
  return (
    <>
        <div className='mt-5 d-flex justify-content-evenly'>
            <div className=" col-4 shadow rounded-3">
                <div className='p-3'>
                    <h4 className=''>Enter Details</h4>
                    <div className='mt-3'>
                        <label htmlFor="citySelect" className="form-label">City</label>
                        <select className="form-select" id="citySelect" defaultValue={"choose"} onClick={()=>{citySelectValidate()}}>
                            <option value="choose" >Choose...</option>
                            <option value="pune">Pune</option>
                        </select>
                        <span id='citySelectError' className='text-danger'></span>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="locationSelect" className="form-label m-0">Select Location</label>
                        <p className='m-0'>*for which micromarket analysis is required</p>
                        <select className="form-select" id="locationSelect" defaultValue={"choose"} onChange={()=>{locationSelectValidate()}}>
                            <option value="choose" >Choose...</option>
                            <option value="Sun Shine Green">Khadki (Sun Shine Green)</option>
                            <option value="Mont Vert">Khadki (Mont Vert)</option>
                            <option value="Bhoomi Allium">Pimple Saudagar (Bhoomi Allium)</option>
                            <option value="Satin Brick">Khadadi (Satin Brick)</option>
                            <option value="Eon Homes">Hinjewadi (Eon Homes)</option>
                        </select>
                        <span id='locationSelectError' className='text-danger'></span>
                    </div>
                    <h5 className='text-center mt-3'>OR</h5>
                    <div className='d-flex justify-content-between mt-2'>
                        <div style={{width:''}}>
                            <label htmlFor="latitude" className="form-label">Latitude</label>
                            <input type="number" className="form-control" id="latitude" aria-describedby="emailHelp" onChange={()=>{latitudeValidate()}}/>
                        </div>
                        <div style={{width:''}}>
                            <label htmlFor="longitude" className="form-label">Longitude</label>
                            <input type="number" className="form-control" id="longitude" aria-describedby="emailHelp" onChange={()=>{latitudeValidate()}}/>
                        </div>
                    </div>  
                    <span id='longitudeError' className='text-danger'></span>

                    <div className='d-flex'>
                        <div className='mt-3 mb-2'>
                            <button className="btn btn-outline-success" onClick={(e)=>{submitClick(e)}}>Submit</button>
                        </div>
                        <div className='mt-3 mb-2 ms-3'>
                            <button className="btn btn-outline-warning" onClick={()=>{resetForm()}}>Clear Selection</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table-light table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className='p-2'>City</th>
                        <th  scope="col" className='p-2'>location</th>
                        <th scope="col" className='p-2'>Project name</th>
                        <th scope="col" className='p-2'>Coordinates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='p-2'>Pune</td>
                        <td className='p-2'>Khadki</td>
                        <td className='p-2'>Sun Shine Green</td>
                        <td className='p-2'>18.56639775919182, 73.83851296931093</td>
                    </tr>
                    <tr>
                        <td className='p-2'>Pune</td>
                        <td className='p-2'>Khadki</td>
                        <td className='p-2'>Mont Vert</td>
                        <td className='p-2'>18.56448825647721, 73.83767986997688</td>
                    </tr>
                    <tr>
                        <td className='p-2'>Pune</td>
                        <td className='p-2'>Pimple Saudagar</td>
                        <td className='p-2'>Bhoomi Allium</td>
                        <td className='p-2'>18.59941482022125, 73.79228913953241</td>
                    </tr>
                    <tr>
                        <td className='p-2'>Pune</td>
                        <td className='p-2'>Khadadi</td>
                        <td className='p-2'>Satin Brick</td>
                        <td className='p-2'>18.564528299860857, 73.95034719553216</td>
                    </tr>
                    <tr>
                        <td className='p-2'>Pune</td>
                        <td className='p-2'>Hinjewadi</td>
                        <td className='p-2'>Eon Homes</td>
                        <td className='p-2'>18.579354440961446, 73.68963942242554</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div className='mt-5 mb-5 text-center'>
            <iframe id='mapIframe' height='600px' width='1000px' title='Iframe'></iframe>
        </div>   
    </>
  )
}

export default Form