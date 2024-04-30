import { Box} from "@mui/material";
import Header from "../../components/Header";
import { useCallback, useState ,useEffect } from 'react';
import {fetchGet} from "../../communication/handlefetch"
import DeviceStateListComponent from "../../components/DeviceStateList";
import TablePagination from "@mui/material/TablePagination";


const DeviceStateList = () => {

  const [Data, setData] = useState([]);
  const [Mounted,setMounted] = useState(1);

  const [DataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [IsSearch, setIsSearch] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/devicestatelist/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      });
    }
    
  }

  function TablePaginationFunc () {

    return (
      <TablePagination
        component="div"
        count={DataCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    );
  }



  const getPageData = useCallback(async () => {
    fetchGet(`/devicestatelist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
      .then((data) => {        
        setData(data?.item)
        setDataCount(data?.count)
      });
  },[page,rowsPerPage])

  useEffect(() => {
    
    getPageData();
  }, [getPageData,Mounted]);

  const changeMounted = () => setMounted(Mounted+1);

  

  return (
    <Box m="20px">
      <Header title="충전기 상태 정보" subtitle="충전기의 상태와 에러코드 및 현황을 볼 수 있습니다" />
      
      <DeviceStateListComponent Data={Data} setMounted = {changeMounted} TablePaginationFunc={TablePaginationFunc} SearchHandle={SearchHandle} IsSearch={IsSearch}/>
    </Box>
  );
};

export default DeviceStateList;



