import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


function Menu(props) {
    return(
        <>
            {props.isAuth ? null: <NavLink to='/register'>Register</NavLink>}
            {props.isAuth ? null: <NavLink to='/login'>Login</NavLink>}
            {props.isAuth ? <NavLink to='logout'>Logout</NavLink>: null}
            <NavLink to='/home/:username'>Home</NavLink>
            <NavLink to='/edit-user'>User Info</NavLink>


        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Menu)