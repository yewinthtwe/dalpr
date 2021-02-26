import React, {useState, useEffect} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, makeStyles, TableBody, TableRow,TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import AlprControls from './AlprControls';
import AlprPageHeader from './AlprPageHeader';
import AlprConfigForm from './AlprConfigForm';
//import AlprConfigFormik from './AlprConfigFormik';
import useAlprTable from './useAlprTable';
import * as configService from '../services/AlprConfigService';
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
    { id: 'configName', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'laneName', label: 'Lane Name' },
    { id: 'cameraName', label: 'Camera Name' },
    { id: 'relayName', label: 'Relay Name' },
    { id: 'status', label: 'Status'},
    { id: 'actions', label: 'Actions', disableSorting : true }
];

function AlprConfig(props) {
    
    const { history } = props;
    const classes = useStyles();
    const [ recordForEdit, setRecordForEdit ] = useState(null);
    const [ config, setConfig ] = useState([]);
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
    } = useAlprTable(config, headCells, filterFn );

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if ( target.value === "")
                    return items;
                    else
                    return items.filter(x => x.configName.toLowerCase().includes(target.value));
            }
        });
    }

    const addOrEdit = async (config, resetForm) => {
        const source = http.getCancelToken();
        if ( config.id === 0 ) {
            delete config.id;
            await configService.saveConfig(config, source);
        } else {
            await configService.saveConfig(config, source);
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setPageRefresh(false)
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
        await configService.deleteConfig(_id, source);
        setPageRefresh(false)
        setNotify({
            isOpen: true, 
            message: 'Deleted Successfully.', 
            type: 'error'})
    }

    useEffect(() => {
        const source = http.getCancelToken();
        async function fetchConfig() {
            try {
                const config = await configService.getConfig(source);
                setConfig(config);
                setPageRefresh(true);
            } catch (error) {
                if (http.isCancel(error)){

                } else {
                    throw error;
                }
            }
        }
        fetchConfig();
        return () => {
            source.cancel();
        };
    },[history.location.pathname, pageRefresh]);

    return (
    <>
        <AlprPageHeader
            title="Lane Configuration template"
            subTitle="Add lane config"
            icon={ <SettingsIcon fontSize='large'/> } />

        <Paper className={ classes.pageContent }>

        <Toolbar >
            <AlprControls.Input
                className={ classes.searchInput } 
                label = "Search lane configuration..."
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
                                <TableCell> { item.configName } </TableCell>
                                <TableCell> { item.description } </TableCell>
                                <TableCell> { item.laneName } </TableCell>
                                <TableCell> { item.cameraName } </TableCell>
                                <TableCell> { item.relayName } </TableCell>
                                <TableCell> { item.status===true ? "Enable" : "Disabled" }  </TableCell>
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
                                        })}}>
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
            title="Lane Configuration" 
            openPopup={ openPopup }
            setOpenPopup={ setOpenPopup } >
                <AlprConfigForm  
                    recordForEdit={ recordForEdit }
                    addOrEdit={ addOrEdit }>
                </AlprConfigForm>
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

export default withRouter(AlprConfig);

