import React, { PropTypes } from 'react';

const SidebarMenuGroup = (props) => (
    <div className="item">
        {props.groupName}
        <div className="menu">
            {props.children}
        </div>
    </div>
);


SidebarMenuGroup.propTypes = {
    children: PropTypes.node.isRequired,
    groupName: PropTypes.string.isRequired
};

export default SidebarMenuGroup;
