const handleCheckout = () => {

  alert("Payment Approved");
  sessionStorage.clear();
  window.location.reload();
}

export default handleCheckout;