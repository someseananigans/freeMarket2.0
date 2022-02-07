import { useState } from 'react';
import { storage } from '../utils/Firebase'
import imageCompression from 'browser-image-compression';
import { makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';
import { Button, InputBase, InputLabel, Box, FormControl } from '@mui/material'
import { Listing } from '../utils/API';

const useStyles = makeStyles({
  fileInput: {
    display: 'none'
  },
  photoSquare: {
    margin: '5px',
    flex: '1 0 auto',
    height: 'auto',
    textAlign: 'center',
    border: '1px solid #cccccc',
    maxHeight: '250px',
    display: 'flex',
    '&::before': {
      content: '""',
      display: 'table',
      float: 'left',
      paddingTop: '100%'

    }
  },
  photoInput: {
    margin: '5px',
    display: 'flex',
    height: '250px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid #cccccc',
    maxHeight: '250px',
    flexDirection: 'column'
  },
  mainWrapper: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingTop: '50px',
    paddingBottom: '50px',
  }
})

const Label = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#2b2b2b' : '#fcfcfb',
  fontWeight: '600'
}))

const Input = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? '#fcfcfb' : '#2b2b2b',
    color: theme.palette.mode === 'dark' ? '#2b2b2b' : '#fcfcfb',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    marginBottom: '10px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const PhotoGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  // padding: 0,
  margin: 0,
  listStyle: 'none',
  lineHeight: '30px',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const CreateListing = () => {
  const classes = useStyles()

  const [listing, setListing] = useState({
    photos: [],
    title: '',
    description: '',
    hashTag1: '',
    hashTag2: '',
    hashTag3: '',
    brand: '',
    category: '',
    condition: '',
    color: '',
    shippingZip: '',
    deliveryCharge: '',
    // selling:'',
    // processing:'',
    // earning:''
    price: 0
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
            setListing({ ...listing, photos: [...listing.photos, firebaseUrl] })
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
    const exist = listing.photos.length
    if (exist < 4) {
      for (let i = exist; i < 4; i++) {
        try {
          const compressedUpload = await imageCompression(uploads[i - (exist)], options)
          // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          await firebaseUpload(compressedUpload)
        } catch (err) { console.log(err) }
      }
    }

  }

  const handleInputChange = ({ target }) => {
    setListing({ ...listing, [target.id]: target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(listing)
    Listing.create(listing)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const renderUploader = () => {
    return (
      <div className={classes.photoInput}>
        <Button variant="contained" component="span">Upload Photo</Button>
        Upload up to 4 photos
      </div>
    )
  }

  const renderUploaded = () => {
    return (<><div className={classes.photoSquare} style={{
      backgroundImage: `url(${listing.photos[0]})`, backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}>

    </div>
      <div className={classes.photoSquare} style={{
        backgroundImage: `url(${listing.photos[1]})`, backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>

      </div>
      <div className={classes.photoSquare} style={{
        backgroundImage: `url(${listing.photos[2]})`, backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>

      </div>
      <div className={classes.photoSquare} style={{
        backgroundImage: `url(${listing.photos[3]})`, backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>

      </div></>)
  }

  return (
    <div className={classes.mainWrapper}>
      {/* PhotoUpload */}
      <h2>Photos</h2>
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          className={classes.fileInput}
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">

          <PhotoGrid>
            {listing.photos.length === 0 ? (
              renderUploader()
            ) :
              (renderUploaded())}

          </PhotoGrid>
        </label>
      </div>


      <Box component="form" noValidate onSubmit={handleSubmit} >
        {/* Product Info */}
        <h2>Product Info</h2>
        {/* Title */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="title">
            Title
          </Label>
          <Input id="title" label="title" variant="outlined" onChange={handleInputChange} value={listing.title} fullWidth />
        </FormControl>
        {/* Description */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="description">
            Description
          </Label>
          <Input id="description" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.description} fullWidth />
        </FormControl>
        {/* #tag (Optional) */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="hashTag">
            Hash Tag (optional)
          </Label>
          <div style={{ marginTop: '24px', display: 'flex', placeContent: 'space-between' }}>

            <Input id="hashTag1" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.hashTag1} style={{ width: '32%' }} />
            <Input id="hashTag2" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.hashTag2} style={{ width: '32%' }} />
            <Input id="hashTag3" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.hashTag3} style={{ width: '32%' }} />
          </div>
        </FormControl>
        {/* Category */}
        {/* Brand */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="brand">
            Brand
          </Label>
          <Input id="brand" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.brand} fullWidth />
        </FormControl>

        {/* Condition */}
        {/* Color */}
        {/* Shipping */}
        <h2>Shipping</h2>
        {/* shippingZip */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="shippingZip">
            Zip Code
          </Label>
          <Input id="shippingZip" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.shippingZip} fullWidth />
        </FormControl>
        {/* deliveryChargeCharge */}

        {/* Pricing */}
        <h2>Pricing</h2>
        {/* SetPrice */}
        <FormControl variant="standard" fullWidth>
          <Label shrink htmlFor="price">
            Price
          </Label>
          <Input id="price" label="Outlined" variant="outlined" onChange={handleInputChange} value={listing.price} type="number" fullWidth />
        </FormControl>
        {/* SellingFee */}
        {/* ProcessingFee */}
        {/* Earnings */}

        {/* List button */}
        <Button variant="contained" type="submit" fullWidth>List</Button>
      </Box>
    </div >

  )

};

export default CreateListing;
