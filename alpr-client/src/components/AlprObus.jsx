import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, makeStyles, TableBody, TableRow,TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import AlprControls from './AlprControls';
import AlprMemberForm from './AlprMemberForm';
import useAlprTable from './useAlprTable';
import * as memberService from '../services/AlprMemberServices';
import AlprPopup from './AlprPopup';
import AlprNotification from './AlprNotification';
import AlprConfirmDialog from './AlprConfirmDialog';
import AlprPageHeader from './AlprPageHeader';
import http from '../services/httpService';
import { withRouter } from 'react-router-dom';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';


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
    { id: 'srNo', label: 'Serial Number' },
    { id: 'obuId', label: 'OBU Number' },
    { id: 'memberId', label: 'Member ID Ref' },
    { id: 'status', label: 'Status'},
    { id: 'actions', label: 'Actions', disableSorting : true }
];

function AlprObus(props) {
    
    const { history } = props;
    const classes = useStyles();
    //const [ recordForEdit, setRecordForEdit ] = useState(null);
    const [ obus, setObus ] = useState([]);
    const [ pageRefresh, setPageRefresh ] = useState(false);

    useEffect(()=> {
        const source = http.getCancelToken();
        async function fetchObus() {
            const data = await memberService.getObuCollection(source)
            setObus(data);
            setPageRefresh(true);
        }
        fetchObus();
        return () => {
            source.cancel();
        };
    }, [history.location.pathname, pageRefresh ]);

    const [ filterFn, setFilterFn ] = useState({ 
        fn: obus => { return obus; }
    });
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ notify, setNotify ] = useState({isOpen: false, message: '', type: ''});
    const [ confirmDialog, setConfirmDialog ] = useState({
        isOpen: false,
        title: '',
        subTitle: ''
    });

    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting 
    } = useAlprTable(obus, headCells, filterFn );

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if ( target.value === "" )
                    return items;
                    else
                    return items.filter(x => x.obuId.toString().toLowerCase().includes(target.value));
            }
        });
    }

    const addOrEdit = (obu, resetForm) => {
        setNotify({
            isOpen: true, 
            message: 'Please contact Qfree for more information.', 
            type: 'success'})
    }

    const openInPopup = item => {
        setNotify({
            isOpen: true, 
            message: 'Please contact Qfree for more information.', 
            type: 'success'})
    }

    const onDelete = _id => {
        setNotify({
            isOpen: true, 
            message: 'Please contact Qfree for more information.', 
            type: 'success'})
    }


    return (
    <>
        <AlprPageHeader
            title="On-Board Unit"
            subTitle="Vehicle Access Control"
            badgeCount={9}
            icon={ <SettingsRemoteIcon fontSize='large'/> } />

        <Paper className={ classes.pageContent }>

        <Toolbar >
            <AlprControls.Input
                className={ classes.searchInput } 
                label = "Search obu..."
                InputProps = {{
                    startAdornment: (<InputAdornment position="start">
                        <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                onChange={ handleSearch } />

        </Toolbar>
        <TblContainer>
        <TblHead/>
            <TableBody>
                {
                    recordsAfterPagingAndSorting().map(
                        item => (
                            <TableRow key={ item._id }>
                                <TableCell> { item.srNo } </TableCell>
                                <TableCell> { item.obuId } </TableCell>
                                <TableCell> { item.memberId } </TableCell>
                                <TableCell> { item.inUsed===true ? "In Used" : "Available" }  </TableCell>
                                <TableCell> 
                                    <AlprControls.ActionButton
                                        color="primary"
                                        onClick={ () => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </AlprControls.ActionButton>
                                    <AlprControls.ActionButton
                                        color="secondary"
                                        onClick={() => {onDelete()}}>
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
            title="OBU (On-Board-Unit)" 
            openPopup={ openPopup }
            setOpenPopup={ setOpenPopup } >
            <AlprMemberForm
                // recordForEdit={ recordForEdit }
                recordForEdit={null}
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

export default withRouter(AlprObus);
