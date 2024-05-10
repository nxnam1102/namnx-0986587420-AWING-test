export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36); // Convert current time to base-36 string
  const randomString = Math.random().toString(36).substring(2, 5); // Generate a random string
  const newId = `${timestamp}-${randomString}`; // Combine timestamp and random string
  return newId;
};

export const defaultSubCampaign = {
  id: generateUniqueId(),
  name: "Chiến dịch con 1",
  status: true,
  ads: [
    {
      id: generateUniqueId(),
      name: "Quảng cáo 1",
      quantity: 0,
    },
  ],
};

export const isInvalidData = (show: boolean, data: any) => {
  return show && !data;
};

export const invalidMessage = (show: boolean, data: any) => {
  return show && !data ? "Dữ liệu không hợp lệ" : undefined;
};

export const cloneDeep = (data: any) => {
  let result = data;
  try {
    result = JSON.parse(JSON.stringify(data));
  } catch (error) {
  } finally {
    return result;
  }
};
