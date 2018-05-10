import React from 'react';

const barchartLabel = (props) => {
    var data = props.payload[0].payload;
    var pie = [
      { name: "male", value: data.male },
      { name: "female", value: data.female }
    ];

    props.onMouseHover(pie);
    
    return null;
}
 
export default barchartLabel;