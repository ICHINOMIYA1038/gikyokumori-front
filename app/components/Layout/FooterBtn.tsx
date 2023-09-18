import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { createTheme, Snackbar, ThemeProvider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import router from 'next/router';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [shouldDisplay, setMounted] = React.useState(true);
  React.useEffect(() => {
    // 最初のレンダリング時に実行する関数
    isMobileScreen();
    window.addEventListener('resize', handleResize);
  }, []);

  // ビューポートの幅を監視してスマートフォン画面かどうかを判定する関数
  const isMobileScreen = () => {
    if (typeof window !== 'undefined') {
        setMounted(window.innerWidth <= 600);
    }
    //setMounted(false); // クライアントサイド以外ではスマートフォン画面と判定しない
  };

  const handleResize = () => {
    // 画面の幅に基づいてsetMountedを更新する条件を設定
    isMobileScreen()
  };

  const isDisplay = useMediaQuery('(max-width:600px)');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  

  return (
    <div style={{ marginTop: '50px' }}>
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left:0}}>
      {isDisplay && (
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction label="検索する"  icon={<SearchIcon/>} onClick={()=>{
      router.push("/")
    }}/>
          <BottomNavigationAction label="投稿する" icon={<CreateIcon />} onClick={()=>{
      router.push("/posts/new")
    }}/>
          <BottomNavigationAction label="ログインする" icon={<LoginIcon />} onClick={()=>{
      router.push("/Login")
    }}/>
        </BottomNavigation>
      )}
    </Box>
    </div>
  );
}