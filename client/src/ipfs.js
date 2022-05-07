import IpfsAPI from "ipfs-api";
const ipfs = new IpfsAPI({
  host: "https://ipfs.io/ipfs/QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo",
  port: 5001,
  protocol: "https",
});

export default ipfs;