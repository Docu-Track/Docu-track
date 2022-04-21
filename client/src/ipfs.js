const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "",
  port: 5001,
  protocol: "https",
});

export default ipfs;