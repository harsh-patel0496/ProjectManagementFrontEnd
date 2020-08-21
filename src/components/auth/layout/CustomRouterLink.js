import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom';

const CustomRouterLink= React.forwardRef((props, ref) => (
    <div>
      <RouterLink {...props} />
    </div>
));

export default CustomRouterLink
