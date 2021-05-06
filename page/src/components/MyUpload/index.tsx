import {message, Upload} from "antd";
import {Constants} from "@/utils/constants";

type MyUploadProps = {
  accept?: string;
  name: string;
  appId?: string;
  success: (url: string) => void;
}

const MyUpload: React.FC<MyUploadProps> = ({accept,name,appId='',success}) =>{
  const props = {
    showUploadList: false,
    maxCount:1,
    withCredentials: true,
    data:{
      name,
      appId,
    },
    headers:{
      token:localStorage.getItem("token"),
    },
    action: `${Constants.baseUrl}file/upload`,
    accept,
    onChange: ({file}: {file: any}) => {
      if(file.status==='done') {
        const {data,code} = file.response;
        if(code===0){
          success(file.response.data);
        }else{
          message.error(data);
        }
      };
    }
  };

  return (
    <Upload {...props}>
      上传
    </Upload>
  )
}

export default MyUpload;
