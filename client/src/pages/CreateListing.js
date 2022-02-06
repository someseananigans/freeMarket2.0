import { useState } from 'react';
import { storage } from '../utils/Firebase'
import imageCompression from 'browser-image-compression';
import { Fab } from '@material-ui/core';
import { AddPhotoAlternate as AddPhoto, Close as CloseIcon } from '@material-ui/icons'

const CreateListing = () => {


  const [post, setPost] = useState({
    images: [],
  })

  const firebaseUpload = (file) => {

    const imgName = Date.now() + "Listing"
    const uploadTask = storage.ref(`image/${imgName}`).put(file)
    uploadTask.on(
      "state_changed",
      snapshot => { },
      err => { console.log(err) },
      () => {
        storage
          .ref("image")
          .child(imgName)
          .getDownloadURL()
          .then(firebaseUrl => {
            console.log(firebaseUrl)
            setPost({ ...post, images: [...post.images, firebaseUrl] })
            // do something with the url
          })
      }
    )

  }


  const handleFileChange = async event => {
    event.preventDefault()
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true
    }

    const uploads = event.target.files
    console.log(uploads)
    uploads.forEach(async upload => {
      try {
        const compressedUpload = await imageCompression(upload, options)
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        await firebaseUpload(compressedUpload)
      } catch (err) { console.log(err) }
    });
    console.log(uploads)

    // const upload = event.target.files[0]
    // console.log(`originalFile size ${upload.size / 1024 / 1024} MB`);

    // try {
    //   const compressedFile = await imageCompression(upload, options)
    //   // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    //   await uploadtoFirebase(compressedFile)
    // } catch (err) { console.log(err) }

  }

  return (
    <>
      {/* PhotoUpload */}
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" >
            <AddPhoto />
          </Fab>
        </label>
      </div>
      <p>{post.images[1]}</p>
      <p>{post.images[0]}</p>

      {/* Product Info */}
      {/* Title */}
      {/* Description */}
      {/* #tag (Optional) */}
      {/* Category */}
      {/* Brand */}
      {/* Condition */}
      {/* Color */}
      {/* Shipping */}
      {/* ZipCode */}
      {/* DeliveryCharge */}
      {/* Pricing */}
      {/* SetPrice */}
      {/* SellingFee */}
      {/* ProcessingFee */}
      {/* Earnings */}
      {/* List button */}

    </>

  )

};

export default CreateListing;
