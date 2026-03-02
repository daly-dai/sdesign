import { FormInstance } from 'antd';
import { useCallback, useState } from 'react';

interface StepFormProps {
  formInstanceList: (FormInstance<any> | null)[];
  dispatchDetailData?: (data: any) => Record<string, any> | null;
}

const useStepForm = ({ formInstanceList }: StepFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [current, setCurrent] = useState(0);

  //   点击下一步触发事件
  const handleNext = useCallback(
    async (param = false) => {
      const curInstance = formInstanceList?.[current];

      if (!curInstance) {
        setCurrent(current + 1);
        return;
      }

      if (!param) {
        await curInstance?.validateFields();
      }

      const values = curInstance?.getFieldsValue();

      setFormData((pre: any) => {
        return {
          ...pre,
          ...values,
        };
      });

      setCurrent(current + 1);
    },
    [formInstanceList, current],
  );

  // 返回上一页
  const handlePrevious = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  return {
    formData,
    setFormData,
    current,
    handleNext,
    handlePrevious,
  };
};

export default useStepForm;
