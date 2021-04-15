import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';
import { info } from '@/services/ant-design-pro/api';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

type App = {
  appName?: string;
  logo?: string;
  appCode?: string;
  appToken?: string;
  status?: number;
}

export default (): React.ReactNode => {

  const [app,setApp] = useState<App>({});

  useEffect(()=>{
    info().then(res=>{
      setApp(res.data);
    });
  },[])

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Card>
        <Typography.Text strong>
          小程序appCode
        </Typography.Text>
        <CodePreview>{app.appCode}</CodePreview>
        <Typography.Text
          strong
        >
          小程序appToken
        </Typography.Text>
        <CodePreview>{app.appToken}</CodePreview>
        <Typography.Text strong>
          小程序名称
        </Typography.Text>
        <CodePreview>{app.appName}</CodePreview>
        <Typography.Text strong>
          小程序状态
        </Typography.Text>
        <CodePreview>{app.status===2?'运行中':'审核中'}</CodePreview>
        <Typography.Text strong>
          程序下载
        </Typography.Text>
        <CodePreview>
          https://pan.baidu.com/s/15EaQSo1UB2BX7vyflkg-uA
          提取码：iu1b
        </CodePreview>
      </Card>
    </PageContainer>
  );
};
