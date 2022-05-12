import axios from 'axios';
import './App.css'
import React, { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { ethers } from "ethers";
import abi from "./Doc.json";
import Navbar from '../src/components/Navbar'
import { Container, Button, Divider, Box, Chip, Grid, TextField, Stack, Paper, Grow, Typography, Link, Skeleton, AlertTitle, Backdrop, CircularProgress, Card, CardActions, CardContent, CardMedia } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Copyright from './components/copyright';
import date from 'date-and-time';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [fileMetadata, setFileMetadata] = useState({});
  const [fileUrl, setFileUrl] = useState(``);
  const [uploadedFile, setUploadedFile] = useState();
  const [owner, setOwner] = useState(false);
  const [mintAddr, setMintAddr] = useState('');
  const [description, setDescription] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [warningAlertOpen, setWarningAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // const [modalOpen, setModalOpen] = useState(false);

  // const handleOpen = () => setModalOpen(true);
  // const handleClose = () => setModalOpen(false);

  const contractABI = abi.abi;
  const contractAddress = "0x3a3749c23a8BFDAa56A4527FeF25d3C968959003";

  useEffect(() => {
    checkifWalletisConnected();
    contractOwnerCheck();
  }, [])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorAlertOpen(false)
    setWarningAlertOpen(false);
    setSuccessAlertOpen(false);
  };

  const handleMint = async (e) => {
    e.preventDefault();
    setLoading(true)

    console.log(loading)
    // const file = e.target.files[0];
    // console.log(file)

    try {
      // Add file to IPFS
      const added0 = await client.add(uploadedFile)
      const url = `https://ipfs.infura.io/ipfs/${added0.path}`

      const now = new Date();

      // Create metadata for Contract
      const metadata = {
        description: description,
        link: url,
        date: date.format(now, 'ddd, MMM DD YYYY HH:mm:s')
      }
      // Add metadata to IPFS
      const metaDataLink = await client.add(JSON.stringify(metadata));
      console.log("metadata link->", `https://ipfs.infura.io/ipfs/${metaDataLink.path}`);
      const metaData = `https://ipfs.infura.io/ipfs/${metaDataLink.path}`

      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const Docu = new ethers.Contract(contractAddress, contractABI, signer);

          let ethUser
          ethUser = await Docu.mintVerify(mintAddr);
          console.log(ethUser.toNumber())
          if (ethUser.toNumber() === 0) {
            // alert("Wait to mine...");

            console.log(typeof (currentAccount), mintAddr, metaData) //0x4B33be4Fea6c90557f4c018805BD517b95Bb9a42    0xbFC616Da5eEEd99B691973660582557b6e4347D5
            const checkinTxn = await Docu.docuMint(mintAddr, metaData);
            console.log("Waiting to mine...", checkinTxn.hash);
            await checkinTxn.wait();
            // alert("Mined: " + checkinTxn.hash);
            console.log("Mined: " + checkinTxn.hash)

            setFileUrl(url)
            setFileMetadata(metadata)
            setLoading(false)

          } else {
            setWarningAlertOpen(true);
          }

        } else {
          console.log("ETH window obj doesn't exist...");
        }
      } catch (error) {
        // alert("Invalid Address")
        setLoading(false)
        setErrorAlertOpen(true)
        console.log(error);
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    }

  };
  const verify = async () => {
    console.log("verify here")
    try {
      // handleOpen()

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Docu = new ethers.Contract(contractAddress, contractABI, signer);

        let ethUser
        ethUser = await Docu.verify();
        console.log(ethUser.toNumber())
        if (ethUser.toNumber() >= 1) {
          let ipfsLink
          //gets metdata link
          // pass in key: tokenId, get back link to metadata
          ipfsLink = await Docu.tokenURI(ethUser.toNumber());
          console.log(ipfsLink)
          //gets nft link
          const data = await axios.get(ipfsLink);
          console.log(data.data.link)
          setFileMetadata(data.data)

          setFileUrl(data.data.link)

        } else {

          setShowAlert(true)
          console.log(ethUser)
          //alert("Could not verify")
        }

      } else {
        console.log("ETH window obj doesn't exist...");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const contractOwnerCheck = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Docu = new ethers.Contract(contractAddress, contractABI, signer);

        let ethUser
        ethUser = await Docu.entity();
        console.log(ethUser.toNumber())
        if (ethUser.toNumber() === 5) {
          setOwner(true)
        } else {
          setOwner(false)
        }
      } else {
        console.log("ETH window obj doesn't exist...");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const checkifWalletisConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('No ETH wallet detected');
        return;
      } else {
        console.log("ETH wallet detected");
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length !== 0) {
        const firstaccount = accounts[0];
        console.log("Found an authorized account", firstaccount);
        setCurrentAccount(firstaccount);
      } else {
        alert("No authorized account found");
      }

    } catch (error) {
      console.log(error)
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Wallet could not be connected/detected");
        return;
      }
      // make request to connect to Metamask
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected account:", accounts[0]);
      //updating account using setCurrentAccount as state is updated in this component
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const gridView = (
    <Grid sx={{ p: 4, flexGrow: 1 }} container spacing={4} columns={12}>
      <Grid item xs={4}>
        <Paper elevation={4}>
          {owner && (
            <Stack sx={{
              width: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              m: 1,
              p: 2
            }}
              spacing={2}>
              <TextField
                fullWidth
                id="wallet-address"
                label="Wallet Address"
                variant="outlined"
                size="small"
                onChange={e => setMintAddr(e.target.value)}
                type="text"
                color="success"
              />
              <Button variant="contained" disabled={!mintAddr} fullWidth component="label" color="primary">
                {""}
                <AddIcon /> Upload a file
                <input
                  type="file"
                  hidden
                  onChange={e => setUploadedFile(e.target.files[0])} />
              </Button>
              <TextField
                fullWidth
                id="filled-error"
                label="Description"
                variant="outlined"
                size="small"
                onChange={e => setDescription(e.target.value)}
                type="text"
                disabled={!uploadedFile}
              />
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleMint}>
                Mint NFT
              </Button>

            </Stack>
          )}
        </Paper>
      </Grid>
      <Grid item xs={8}>
        {(!loading) ? (
          <Paper>
            {
              fileUrl && (
                <Card sx={{}}>
                  <CardMedia
                    component="iframe"
                    alt="NFT"
                    height="400"
                    src={fileMetadata.link}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {fileMetadata.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fileMetadata.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <Link color="inherit" href={fileMetadata.link}>
                        Link to your NFT
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              )
            }
          </Paper>)
          : (
            <Box>
              <Skeleton variant="rectangular" width={800} height={400} />
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Box>
          )
        }
      </Grid>
    </Grid>

  )

  const fullView = (
    (fileUrl)
      ? (
        <Box sx={{
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          m: 2,
          p: 2
        }}>
          <Card sx={{ maxWidth: 900 }}>
            <CardMedia
              component="iframe"
              alt="NFT"
              height="400"
              width='auto'
              src={fileMetadata.link}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {fileMetadata.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fileMetadata.date}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link color="inherit" href={fileMetadata.link}>
                  Link to your NFT
                </Link>
              </Button>
              <Button size="small">
                <Link color="inherit" href={"https://goerli.etherscan.io/address/" + currentAccount}>
                  Link to Etherscan.io
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Box>
      )
      : (
        <Container fixed sx={{
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          m: 1,
          p: 2
        }}>
          <Typography gutterBottom variant="h6" component="div" fontStyle="italic">
            Click 'Show my NFT' to view your NFT!
          </Typography>
        </Container>
      )
  )

  return (
    <Box>
      <Navbar verify={verify} />
      <Grow in>
        {owner ? gridView : fullView}
      </Grow>
      {
        !currentAccount && (
          <Button variant="contained" endIcon={<SendIcon />} onClick={connectWallet}>
            Connect to Wallet
          </Button>
        )
      }
      {showAlert && (
        <Alert sx={{
          width: 'auto',
          m: 4,
          p: 3
        }} severity="info" false>
          <AlertTitle>No NFT Found for this user</AlertTitle>
          Have the owner of this contract mint one for this user.
        </Alert>
      )}
      <Snackbar open={warningAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          The user already has an NFT mined!
        </Alert>
      </Snackbar>
      <Snackbar open={errorAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          NFT could not be mined!
        </Alert>
      </Snackbar>
      <Snackbar open={successAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          NFT successfully mined!
        </Alert>
      </Snackbar>
      <Box mt={8}>
        <Typography gutterbottm fontStyle="italic" variant="h5" color="textSecondary" align="center">
          {'"Remember to refresh the page after account change."'}
        </Typography>
        <Divider textAlign="center" variant="inset">
          <Chip></Chip>
        </Divider>
        <Copyright />
      </Box>
    </Box>
  );
}

export default App;
