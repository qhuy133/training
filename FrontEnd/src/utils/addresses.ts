export const shortenAddress = (address) => {
  if (address && address.length > 0) {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 3,
      address.length,
    )}`;
  }
};
