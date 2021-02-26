import React, {useState, useEffect} from 'react';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, makeStyles, TableBody, TableRow,TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import AlprControls from './AlprControls';
import AlprPageHeader from './AlprPageHeader';
import AlprUserForm from './AlprUserForm';
import useAlprTable from './useAlprTable';
import * as userService from '../services/AlprUserServices';
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
    { id: 'username', label: 'User Name' },
    { id: 'password', label: 'Password' },
    { id: 'name', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'isAdmin', label: 'Role' },
    { id: 'status', label: 'Status'},
    { id: 'actions', label: 'Actions', disableSorting : true }
];

function AlprUsers(props) {
    
    const { history } = props;
    const classes = useStyles();
    const [ recordForEdit, setRecordForEdit ] = useState(null);
    const [ users, setUsers ] = useState([]);
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
    } = useAlprTable(users, headCells, filterFn );

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if ( target.value === "")
                    return items;
                    else
                    return items.filter(x => x.username.toLowerCase().includes(target.value));
            }
        });
    }

    const addOrEdit = async (user, resetForm) => {

        const source = http.getCancelToken();
        
        if ( user.id === 0 ) {
            delete user.id;
            await userService.saveUser(user, source);
            
        } else {
            await userService.saveUser(user, source);
           
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setPageRefresh(false)
        //setUsers(users)
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
        await userService.deleteUser(_id, source);
        setPageRefresh(false)
        setNotify({
            isOpen: true, 
            message: 'Deleted Successfully.', 
            type: 'error'})
    }

    useEffect(() => {
        const source = http.getCancelToken();

        async function fetchUsers() {
            try {
                const users = await userService.getUsers(source);
                setUsers(users.data);
                console.log('AlprUser: User count:',users.data.length);
                setPageRefresh(true);
            } catch (error) {
                if (http.isCancel(error)){
                    
                } else {
                    throw error;
                }
            }
        }
        fetchUsers();
        
        return () => {
            
            source.cancel();
        };
        
    },[history.location.pathname, pageRefresh]);


    return (
    <>
        <AlprPageHeader
            title="VAC System User"
            subTitle="Vehicle Access Control"
            icon={ <PeopleAltIcon fontSize='large'/> } />

        <Paper className={ classes.pageContent }>

        <Toolbar >
            <AlprControls.Input
                className={ classes.searchInput } 
                label = "Search user..."
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
                                <TableCell> { item.username } </TableCell>
                                <TableCell> { item.password } </TableCell>
                                <TableCell> { item.name } </TableCell>
                                <TableCell> { item.email } </TableCell>
                                <TableCell> { item.isAdmin===true ? "Admin" : "Normal" }  </TableCell>
                                <TableCell> { item.isActive===true ? "Active" : "Inactive" }  </TableCell>
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
            title="System User" 
            openPopup={ openPopup }
            setOpenPopup={ setOpenPopup } >
            <AlprUserForm
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

export default withRouter(AlprUsers);
