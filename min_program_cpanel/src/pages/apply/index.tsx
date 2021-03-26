
import React, {useState} from 'react';

import {Card, Steps} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import Step1 from "@/pages/User/register/components/Step1";
import Step2 from "@/pages/User/register/components/Step2";
import Step3 from "@/pages/User/register/components/Step3";
import Step4 from "@/pages/User/register/components/Step4";

const { Step } = Steps;


const Register: React.FC = () => {

  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 next={(step)=>getCurrentStepAndComponent(step)} />);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const getCurrentStepAndComponent = (current: number) => {
    setCurrentStep(current);
    switch (current) {
      case 1:
        setStepComponent(<Step2 next={(step)=>getCurrentStepAndComponent(step)}  prev={(step)=>getCurrentStepAndComponent(step)} />);
        break;
      case 2:
        setStepComponent(<Step3 next={(step)=>getCurrentStepAndComponent(step)}  prev={(step)=>getCurrentStepAndComponent(step)}  />);
        break;
      case 3:
        setStepComponent(<Step4 />);
        break;
      case 0:
      default:
        setStepComponent(<Step1 next={(step)=>getCurrentStepAndComponent(step)} />);
    }
  };

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Card bordered={false} size='small' style={{marginBottom:24}}>
        <Steps current={currentStep}>
          <Step title="登录信息" />
          <Step title="小程序信息"/>
          <Step title="小程序模板"/>
          <Step title="完成"/>
        </Steps>
      </Card>
      <Card bordered={false} size='small'>
        {stepComponent}
      </Card>
    </PageContainer>
  );
};

export default Register;
