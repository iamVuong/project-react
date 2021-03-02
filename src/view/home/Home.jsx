import { React } from "react";
import {Image, Carousel } from 'antd';

function Home (){
    const contentStyle = {
        width: "100%",
        height: '90vh',
        backgroundSize: "cover"
    
      };
    return(
        <>
              <Carousel autoplay>
          <div>
            <img style={contentStyle} src="https://ssstutter.com/wp-content/uploads/2021/02/bannerwebgiamoi.gif" />
          </div>
          <div>
           <img style={contentStyle} src="https://ssstutter.com/wp-content/uploads/2021/02/R.M-BANNER.gif" />
          </div>
          <div>
           <img style={contentStyle} src="https://ssstutter.com/wp-content/uploads/2021/02/NA.banner-chinh.gif" />
          </div>
        </Carousel>
        </>
    )
}

export default Home