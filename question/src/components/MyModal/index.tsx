import * as React from 'react';
import {View, ScrollView,setNavigationBarTitle,Image,Ad} from 'remax/wechat';
import './index.css';

export type MyModalProps = {
  show:boolean;
  height?:number | string;
  confirm:()=>void;
}

const MyModal:React.FC<MyModalProps> = ({confirm,show,height='80%',children}) => {

  return (
      <>
        {
          show ? (
              <View className="mask">
                <View className="modal-content" style={{height:height}}>
                  <ScrollView scrollY className="main-content">
                    {children}
                  </ScrollView>
                  <View className="modal-btn-wrapper">
                    <View className="confirm-btn" onClick={confirm}>确定</View>
                  </View>
                </View>
              </View>
          ) : null
        }
      </>
  );
};

export default MyModal;
