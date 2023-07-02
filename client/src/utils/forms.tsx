export const handleOnChange = (event: any, setData: any) => {
  event.preventDefault();
  const { name, value } = event.target;
  setData((previous: any) => ({
    ...previous,
    [name]: value
  }));
}
