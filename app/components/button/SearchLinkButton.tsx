import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const SearchLinkButton = ({func}:any) => {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FABFBF',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '3px 5px',
  };

  const iconStyle = {
    marginRight: '5px',
    color:'black'
  };
  const textStyle = {
    fontWeight: 'bold',
    color: 'black',
    userSelect: 'none' as const,
    whiteSpace: 'nowrap' as const, // 正しい型に修正
  };

  return (
    <div style={buttonStyle} onClick={func}>
      <SearchIcon style={iconStyle} />
      <Typography className="hidden lg:block" style={textStyle}>脚本を探す</Typography>
      
    </div>
  );
};

export default SearchLinkButton;