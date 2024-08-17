/**
 * title: 手动控制loading
 * description: spinning 控制loading状态
 */

import { Alert, Switch } from 'antd';
import React, { useState } from 'react';

import { SSpin } from '@daly/sdesign';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const toggle = (checked: boolean) => {
    setLoading(checked);
  };

  return (
    <div>
      <SSpin spinning={loading}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </SSpin>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};

export default App;
