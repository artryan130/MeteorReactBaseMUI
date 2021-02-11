/*!
 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================
 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
 import {isMobile} from "/imports/libs/deviceVerify";
const imageOrAvatarStyle = {
  containerImageOrAvatar: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'left',
    marginTop:16,
    marginTop:10,
    width:'100%',
    marginBottom:16,
    marginBottom:10,
  },
  containerImageOrAvatarButton: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'left',
    marginTop:16,
    marginTop:0,
    width:'100%',
    marginBottom:16,
    marginBottom:0,
  },
  containerImageOrAvatarFabButton: {
    paddingRight:'25px',
    paddingLeft:'25px',
    paddingTop:'18px',
  },
  containerImageOrAvatarError:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'left',
    marginTop:16,
    marginTop:10,
    width:'100%',
    marginBottom:16,
    marginBottom:10,
    border:'1px solid red'
  },
  dividerImageOrAvatar:{
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
  },
  containerEmptyMidia: {
    color:'#BBB',
  },
  buttonOptions: {
    marginRight:3,
    maxHeight:40,
  },
  audioOptions:{
    maxWidth: isMobile? '182px':'200px',
    marginRight:3,
    maxHeight:40,
    paddingLeft: isMobile?5:15,
    maxWidth: isMobile?'200px':'220px',
  },
  buttonCountOptions:{
    marginRight:3,
    maxHeight:40,
    maxWidth: '80px',
    width: '80px',
    height:40,
    borderRadius: '15px',
    backgroundColor: '#5a9902',
    color: 'white',
    marginLeft: '10px',
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export {
    imageOrAvatarStyle,
};
