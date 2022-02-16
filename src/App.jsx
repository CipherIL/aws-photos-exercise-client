import { useState, useEffect, useRef } from 'react';
import './App.scss';
import { getPhotos, uploadPhoto } from './server/photos';

const serverDomain = "http://localhost";
const port = "8080";
const serverURL = `${serverDomain}:${port}`;

function App() {
  const [photos,setPhotos] = useState([]);
  const fileInput = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo',fileInput.current.files[0]);
    await uploadPhoto(formData);
    getPhotos()
    .then((photos)=>{
      setPhotos(photos);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getPhotos()
    .then((photos)=>{
      setPhotos(photos);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  
  console.log(photos)
  return (
    <div className="App">
      <div className='form-container'>
        <form>
          <input type="file" accept='.jpg' ref={fileInput}/>
          <button onClick={handleFormSubmit}>Submit</button>
        </form>
      </div>
      <div className='photos-container'>
        {photos.map((photo)=>{
          return <img src={serverURL+"/photos/"+photo} alt={photo.replace('.jpg',"")} />
        })}
      </div>
    </div>
  );
}

export default App;