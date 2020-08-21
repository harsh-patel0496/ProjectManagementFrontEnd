import React from 'react'
import Layout from '../Layout'

function withLayout(WrappedComponent) {

    const WithLayout = (props) => {
        return (
            <Layout {...props}>
                <WrappedComponent {...props} />
            </Layout>
        )
    }

    return WithLayout
    
}

export default withLayout
