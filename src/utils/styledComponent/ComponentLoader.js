import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'

function ComponentLoader(props) {
    const {
        componentLoader
    } = props

    return (
        <React.Fragment>
            {componentLoader.open && <LinearProgress />}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        componentLoader: state.componentLoader && state.componentLoader.options
    }
}
export default connect(mapStateToProps)(ComponentLoader)
