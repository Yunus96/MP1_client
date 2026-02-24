  const handleDelete = async (addressId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId
          }),
        }
      );
  
      const response = await res.json();
  
      if ( !response.ok) {
        throw new Error("Failed to delete address");
      }

      const updatedAddresses =
        response?.data?.addresses || [];
  
      setAddresses(updatedAddresses);
  
      // If deleted address was selected → clear selection
      if (!updatedAddresses.find(a => a._id === selectedAddress)) {
        setSelectedAddress(null);
      }
  
      toast.success("Address deleted successfully");
  
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };