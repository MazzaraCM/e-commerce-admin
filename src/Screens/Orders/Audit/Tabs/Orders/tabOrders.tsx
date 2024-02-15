import React, { useState, useEffect } from "react";
import { CustomTabPanel, a11yProps } from "../../audit";
import { SimpleDataCard } from "../../../../../Components/Common/simpleDataCard/simpleDataCard";
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from "../../../../../Utils/const";
import { useHandlerWatcher } from "../../../../../Hooks/handlerWatcher";
import { useOrders } from "../../../../../Hooks/Models/orders";
import { DataGridTable } from "../../../../../Components/Common/dataGridTable/dataGridTable";
import { useDataGridTable } from "../../../../../Hooks/dataGridTable";
import { BoxShadow } from "../../../../../Components/Common/boxShadow/boxShadow";
import moment from "moment";

import { AllOrderColumns, AllOrdersColumnsNotVisible } from "./TableColumns";

import Tabs from "@mui/material/Tabs";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';

export function TabOrders(){
  return(
    <>
        <Grid container spacing={1} direction={'row'} justifyContent={'center'}>
            <Grid item xs={12} sm={6} md={3}>
                <SimpleDataCard icon={<StorageOutlinedIcon />} title='Data Base' description='33' />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SimpleDataCard icon={<StorefrontOutlinedIcon />} title='Shopify' description='33' />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SimpleDataCard icon={<ReceiptLongOutlinedIcon />} title='Transactions' description='33' />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <SimpleDataCard icon={<CloudSyncOutlinedIcon />} title='Sync' description='' button action={() => console.log('Button')} />
            </Grid>
        </Grid>
        <Box sx={{height: '10px', width: '100%'}}/>
        <TabOrdersContent/>
    </>
  )
}

function TabOrdersContent(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" centered>
        <Tab label="All Orders" {...a11yProps(0)} />
        <Tab label="Missing Records" {...a11yProps(1)} />
        <Tab label="Repeat Records" {...a11yProps(2)} />
        <Tab label="Missing Transactions" {...a11yProps(3)} />
        <Tab label="Repeat Transactions" {...a11yProps(4)} />
      </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AllOrdersTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MissingRecordsTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RepeatRecordsTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <MissingTransactionsTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <RepeatTransactionsTable />
      </CustomTabPanel>
    </Box>
  );
}

function AllOrdersTable(){
    const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
    const [orderList, setOrderList] = useState([])
    const [rows, setRows] = useState([{}])
    const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
    const { ListOrders } = useOrders()
    const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
    const initPageSize = 25
    const initNowDate = `${moment().format('MM-YYYY')}`
    const [dateSelected, setDateSelected] = useState(initNowDate)

    useEffect(() => {
        handleGetOrders({ date: dateSelected })
    }, [dateSelected])

    function handleGetOrders ({ date }) {
        setApiRequestState(REQUEST_STATE_LOADING)
        ListOrders({ selectMonth: date })
        .then((result) => {
            setOrderList(result.data)
            setApiRequestState(REQUEST_STATE_SUCCESS)
        })
        .catch(() => {
            setApiRequestState(REQUEST_STATE_ERROR)
        })
    }

    useEffect(() => {
        const formattingResult = columnsAndRowsFormatting({ columns: AllOrderColumns, rows: orderList, identifier: 'id' })
        const { formattedRows } = formattingResult
        setRows(formattedRows)
    }, [orderList])

    const handleSelectionChange = (selectedRowsIds) => {
        const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
        console.log(selectedRows)
    }

    return(
        <ComponentWatcher requestState={apiRequestState}>{{
            ComponentWatcherSuccess: (
                <BoxShadow>
                    <DataGridTable
                        title={`All Orders ${dateSelected}`}
                        columns={AllOrderColumns}
                        rows={rows}
                        onSelectionChange={(selection) => handleSelectionChange(selection)}
                        initPageSize={initPageSize}
                        columnsNotVisible={AllOrdersColumnsNotVisible}
                        sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
            }}
        </ComponentWatcher>
    )
}
function MissingRecordsTable(){
    const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
    const [orderList, setOrderList] = useState([])
    const [rows, setRows] = useState([{}])
    const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
    const { ListOrders } = useOrders()
    const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
    const initPageSize = 25
    const initNowDate = `${moment().format('MM-YYYY')}`
    const [dateSelected, setDateSelected] = useState(initNowDate)

    useEffect(() => {
        handleGetOrders({ date: dateSelected })
    }, [dateSelected])

    function handleGetOrders ({ date }) {
        setApiRequestState(REQUEST_STATE_LOADING)
        ListOrders({ selectMonth: date })
        .then((result) => {
            setOrderList(result.data)
            setApiRequestState(REQUEST_STATE_SUCCESS)
        })
        .catch(() => {
            setApiRequestState(REQUEST_STATE_ERROR)
        })
    }

    useEffect(() => {
        const formattingResult = columnsAndRowsFormatting({ columns: AllOrderColumns, rows: orderList, identifier: 'id' })
        const { formattedRows } = formattingResult
        setRows(formattedRows)
    }, [orderList])

    const handleSelectionChange = (selectedRowsIds) => {
        const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
        console.log(selectedRows)
    }

    return(
        <ComponentWatcher requestState={apiRequestState}>{{
            ComponentWatcherSuccess: (
                <BoxShadow>
                    <DataGridTable
                        title={`Missing Records ${dateSelected}`}
                        columns={AllOrderColumns}
                        rows={rows}
                        onSelectionChange={(selection) => handleSelectionChange(selection)}
                        initPageSize={initPageSize}
                        columnsNotVisible={AllOrdersColumnsNotVisible}
                        sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
            }}
        </ComponentWatcher>
    )
}
function RepeatRecordsTable(){
    const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
    const [orderList, setOrderList] = useState([])
    const [rows, setRows] = useState([{}])
    const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
    const { ListOrders } = useOrders()
    const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
    const initPageSize = 25
    const initNowDate = `${moment().format('MM-YYYY')}`
    const [dateSelected, setDateSelected] = useState(initNowDate)

    useEffect(() => {
        handleGetOrders({ date: dateSelected })
    }, [dateSelected])

    function handleGetOrders ({ date }) {
        setApiRequestState(REQUEST_STATE_LOADING)
        ListOrders({ selectMonth: date })
        .then((result) => {
            setOrderList(result.data)
            setApiRequestState(REQUEST_STATE_SUCCESS)
        })
        .catch(() => {
            setApiRequestState(REQUEST_STATE_ERROR)
        })
    }

    useEffect(() => {
        const formattingResult = columnsAndRowsFormatting({ columns: AllOrderColumns, rows: orderList, identifier: 'id' })
        const { formattedRows } = formattingResult
        setRows(formattedRows)
    }, [orderList])

    const handleSelectionChange = (selectedRowsIds) => {
        const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
        console.log(selectedRows)
    }

    return(
        <ComponentWatcher requestState={apiRequestState}>{{
            ComponentWatcherSuccess: (
                <BoxShadow>
                    <DataGridTable
                        title={`Repeat Records ${dateSelected}`}
                        columns={AllOrderColumns}
                        rows={rows}
                        onSelectionChange={(selection) => handleSelectionChange(selection)}
                        initPageSize={initPageSize}
                        columnsNotVisible={AllOrdersColumnsNotVisible}
                        sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
            }}
        </ComponentWatcher>
    )
}
function MissingTransactionsTable(){
    const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
    const [orderList, setOrderList] = useState([])
    const [rows, setRows] = useState([{}])
    const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
    const { ListOrders } = useOrders()
    const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
    const initPageSize = 25
    const initNowDate = `${moment().format('MM-YYYY')}`
    const [dateSelected, setDateSelected] = useState(initNowDate)

    useEffect(() => {
        handleGetOrders({ date: dateSelected })
    }, [dateSelected])

    function handleGetOrders ({ date }) {
        setApiRequestState(REQUEST_STATE_LOADING)
        ListOrders({ selectMonth: date })
        .then((result) => {
            setOrderList(result.data)
            setApiRequestState(REQUEST_STATE_SUCCESS)
        })
        .catch(() => {
            setApiRequestState(REQUEST_STATE_ERROR)
        })
    }

    useEffect(() => {
        const formattingResult = columnsAndRowsFormatting({ columns: AllOrderColumns, rows: orderList, identifier: 'id' })
        const { formattedRows } = formattingResult
        setRows(formattedRows)
    }, [orderList])

    const handleSelectionChange = (selectedRowsIds) => {
        const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
        console.log(selectedRows)
    }

    return(
        <ComponentWatcher requestState={apiRequestState}>{{
            ComponentWatcherSuccess: (
                <BoxShadow>
                    <DataGridTable
                        title={`Missing Transactions ${dateSelected}`}
                        columns={AllOrderColumns}
                        rows={rows}
                        onSelectionChange={(selection) => handleSelectionChange(selection)}
                        initPageSize={initPageSize}
                        columnsNotVisible={AllOrdersColumnsNotVisible}
                        sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
            }}
        </ComponentWatcher>
    )
}
function RepeatTransactionsTable(){
    const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
    const [orderList, setOrderList] = useState([])
    const [rows, setRows] = useState([{}])
    const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
    const { ListOrders } = useOrders()
    const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
    const initPageSize = 25
    const initNowDate = `${moment().format('MM-YYYY')}`
    const [dateSelected, setDateSelected] = useState(initNowDate)

    useEffect(() => {
        handleGetOrders({ date: dateSelected })
    }, [dateSelected])

    function handleGetOrders ({ date }) {
        setApiRequestState(REQUEST_STATE_LOADING)
        ListOrders({ selectMonth: date })
        .then((result) => {
            setOrderList(result.data)
            setApiRequestState(REQUEST_STATE_SUCCESS)
        })
        .catch(() => {
            setApiRequestState(REQUEST_STATE_ERROR)
        })
    }

    useEffect(() => {
        const formattingResult = columnsAndRowsFormatting({ columns: AllOrderColumns, rows: orderList, identifier: 'id' })
        const { formattedRows } = formattingResult
        setRows(formattedRows)
    }, [orderList])

    const handleSelectionChange = (selectedRowsIds) => {
        const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
        console.log(selectedRows)
    }

    return(
        <ComponentWatcher requestState={apiRequestState}>{{
            ComponentWatcherSuccess: (
                <BoxShadow>
                    <DataGridTable
                        title={`Repeat Transactions ${dateSelected}`}
                        columns={AllOrderColumns}
                        rows={rows}
                        onSelectionChange={(selection) => handleSelectionChange(selection)}
                        initPageSize={initPageSize}
                        columnsNotVisible={AllOrdersColumnsNotVisible}
                        sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
            }}
        </ComponentWatcher>
    )
}