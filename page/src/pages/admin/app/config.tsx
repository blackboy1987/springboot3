import {Drawer,Tabs} from "antd";
import {useEffect, useState} from "react";
import {detail} from "@/pages/admin/app/service";
import BaseConfig from "@/pages/admin/app/baseConfig";
import AdConfig from "@/pages/admin/app/adConfig";
import ShareConfig from "@/pages/admin/app/shareConfig";
import MemberConfig from "@/pages/admin/app/member";
import ProductConfig from "@/pages/admin/app/product";
import OrderConfig from "@/pages/admin/app/order";
import ProductCategoryConfig from "@/pages/admin/app/productCategory";
import OtherConfig from "@/pages/admin/app/otherConfig";
import MoreProgramConfig from "@/pages/admin/app/moreProgramConfig";

const { TabPane } = Tabs;

type ConfigProps = {
  visible: boolean;
  values: Record<string, any>;
  onClose: () => void;
}

const Config: React.FC<ConfigProps>=({visible,onClose,values})=>{

  const [appData,setAppData] = useState<Record<string, any>>({});
  const [activeTabKey,setActiveTabKey] = useState<string>('base');

  const load=(key: string)=>{
    detail({
      type:key,
      id: values.id,
    }).then(response=>{
      const newAppData = {
        ...appData,
      };
      newAppData[`${key}`] = response.data;

      setAppData(newAppData);
    });
  }

  useEffect(()=>{
    load('base');
  },[]);
  const title = (val: Record<string, any>) =>{
    if(val.type===5){
      return `${val.appName}(打卡类)`;
    }
    if(val.type===6){
      return `${val.appName}(知识付费类)`;
    }
    if(val.type===1){
      return `${val.appName}(影视类)`;
    }

    return `${val.appName}(${val.type})`;


  }
  return (
    <Drawer visible={visible} onClose={onClose} title={title(values)} width={window.innerWidth-160}>
      <div style={{display:'flex'}}>
        <div>
          <Tabs tabPosition='left' onChange={(key: string)=>{
            setActiveTabKey(key);
          }}>
            <TabPane tab="基本配置" key="base" />
            <TabPane tab="广告配置" key="ad" />
            <TabPane tab="会员" key="members" />

            {
              values.type===5 ? (
                <>
                  <TabPane tab="分享配置" key="share" />
                  <TabPane tab="商品分类" key="productCategories" />
                  <TabPane tab="商品" key="products" />
                  <TabPane tab="订单" key="orders" />
                  <TabPane tab="其他" key="other" />
                  <TabPane tab="更多小程序" key="moreProgram" />
                </>
              ) : null
            }

          </Tabs>
        </div>
        <div style={{flex:1}}>
          {
            activeTabKey==='base' ? (<BaseConfig id={values.id} />) : null
          }
          {
            activeTabKey==='ad' ? (<AdConfig id={values.id} />) : null
          }
          {
            activeTabKey==='share' ? (<ShareConfig id={values.id} />) : null
          }
          {
            activeTabKey==='members' ? (<MemberConfig id={values.id} />) : null
          }
          {
            activeTabKey==='productCategories' ? (<ProductCategoryConfig id={values.id} />) : null
          }
          {
            activeTabKey==='products' ? (<ProductConfig id={values.id} />) : null
          }
          {
            activeTabKey==='orders' ? (<OrderConfig values={appData.base} id={values.id} />) : null
          }
          {
            activeTabKey==='other' ? (<OtherConfig id={values.id} />) : null
          }
          {
            activeTabKey==='moreProgram' ? (<MoreProgramConfig id={values.id} />) : null
          }
        </div>
      </div>
    </Drawer>
  );
}

export default Config;
