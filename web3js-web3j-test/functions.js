const getAccount = async () => {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } else {
      alert("Install Metamask!");
    }
  } catch (error) {
    console.error(error);
  }
};

export { getAccount };
