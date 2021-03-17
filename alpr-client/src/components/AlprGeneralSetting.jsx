import React, {useState, useEffect} from 'react';
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, makeStyles, TableBody, TableRow,TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import AlprControls from './AlprControls';
import AlprPageHeader from './AlprPageHeader';
import useAlprTable from './useAlprTable';
import AlprGeneralSettingForm from './AlprGeneralSettingForm';
import * as generalSettingService from '../services/AlprGeneralSettingService';
import http from '../services/httpService';
import AlprPopup from './AlprPopup';
import AlprNotification from './AlprNotification';
import AlprConfirmDialog from './AlprConfirmDialog';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles( theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    newButton: {
        position: "absolute",
        right: "10px"
    },
}));

const headCells = [
    
    { id: 'serverName', label: 'Server Name' },
    { id: 'ip', label: 'IP Address' },
    { id: 'port', label: 'Port' },
    { id: 'apiUrl', label: 'API Url' },
    { id: 'photoStore', label: 'Photo Store' },
    { id: 'configuredLanes', label: 'Number of Lanes' },
    { id: 'status', label: 'Status'},
    { id: 'actions', label: 'Actions', disableSorting : true }
];

function AlprGeneralSetting(props) {
    
    const { history } = props;
    const classes = useStyles();
    const [ recordForEdit, setRecordForEdit ] = useState(null);
    const [ generalSetting, setGeneralSetting ] = useState([]);
    const [ filterFn, setFilterFn ] = useState({ 
        fn: items => { return items; }
    });
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ notify, setNotify ] = useState({isOpen: false, message: '', type: ''});
    const [ confirmDialog, setConfirmDialog ] = useState({
        isOpen: false,
        title: '',
        subTitle: ''
    });

    const [ pageRefresh, setPageRefresh ] = useState(false);

    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting 
    } = useAlprTable(generalSetting, headCells, filterFn );

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if ( target.value === "")
                    return items;
                    else
                    return items.filter(x => x.serverName.toLowerCase().includes(target.value));
            }
        });
    }

    const addOrEdit = async (generalSetting, resetForm) => {

        const source = http.getCancelToken();
        
        if ( generalSetting.id === 0 ) {
            delete generalSetting.id;
            await generalSettingService.saveGeneralSetting(generalSetting, source);
            
        } else {
            await generalSettingService.saveGeneralSetting(generalSetting, source);
           
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setPageRefresh(false)
        //setGeneralSetting(generalSetting)
        setNotify({
            isOpen: true, 
            message: 'Submitted Successfully.', 
            type: 'success'})
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = async _id => {
        const source = http.getCancelToken();

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await generalSettingService.deleteGeneralSetting(_id, source);
        setPageRefresh(false)
        setNotify({
            isOpen: true, 
            message: 'Deleted Successfully.', 
            type: 'error'})
    }

    useEffect(() => {
        const source = http.getCancelToken();

        async function fetchGeneralSetting() {
            try {
                const generalSetting = await generalSettingService.getGeneralSetting(source);
                setGeneralSetting(generalSetting);
                setPageRefresh(true);
            } catch (error) {
                if (http.isCancel(error)){
                    
                } else {
                    throw error;
                }
            }
        }
        fetchGeneralSetting();
        
        return () => {
            
            source.cancel();
        };
        
    },[history.location.pathname, pageRefresh]);


    return (
    <>
        <AlprPageHeader
            title="General Setting"
            subTitle="Diamond Inya"
            icon={ <DirectionsCarIcon fontSize='large'/> } />

        <Paper className={ classes.pageContent }>

        <Toolbar >
            <AlprControls.Input
                className={ classes.searchInput } 
                label = "Search by name..."
                InputProps = {{
                    startAdornment: (<InputAdornment position="start">
                        <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                onChange={ handleSearch } />

            <AlprControls.Button
                className={ classes.newButton }
                text = "Add New"
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={ () => { setOpenPopup(true); setRecordForEdit(null)}} />
        </Toolbar>

        <TblContainer>
        <TblHead/>
            <TableBody>
                {
                    recordsAfterPagingAndSorting().map(
                        item => (
                            <TableRow key={ item._id }>
                                <TableCell> { item.serverName } </TableCell>
                                <TableCell> { item.ip } </TableCell>
                                <TableCell> { item.port } </TableCell>
                                <TableCell> { item.apiUrl } </TableCell>
                                <TableCell> { item.photoStore } </TableCell>
                                <TableCell> { item.configuredLanes } </TableCell>
                                <TableCell> { item.status=== true ? "Enable" : "Disabled" } </TableCell>
                                <TableCell> 
                                    <AlprControls.ActionButton
                                    color="primary"
                                    onClick={ () => { openInPopup(item) }}>
                                    <EditOutlinedIcon fontSize="small" />
                                    </AlprControls.ActionButton>

                                    <AlprControls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: "Are you sure to delete this record?",
                                            subTitle: "You can't undo this operation.",
                                            onConfirm: () => { onDelete(item._id) },
                                        })}} 
                                    >
                                    <CloseIcon fontSize="small" />
                                    </AlprControls.ActionButton>
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </TblContainer>
        <TblPagination/>
        </Paper>

        <AlprPopup
            title="General Setting" 
            openPopup={ openPopup }
            setOpenPopup={ setOpenPopup } >
            <AlprGeneralSettingForm
                recordForEdit={ recordForEdit }
                addOrEdit={ addOrEdit } />
        </AlprPopup>

        <AlprNotification 
            notify={ notify }
            setNotify={ setNotify } />
    <AlprConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
    
   </>
    );
}

export default withRouter(AlprGeneralSetting);
