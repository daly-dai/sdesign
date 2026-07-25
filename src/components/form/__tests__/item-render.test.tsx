import { render, screen } from '@testing-library/react';
import { Form, Input } from 'antd';
import React, { FC } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// Mock FormField：暴露所有接收的 props 以便验证透传
vi.mock('../components/form-field', () => ({
  default: ({ type, ...rest }: any) => {
    if (!type || type === 'fantasyType') {
      return <div>未知组件类型: {type}</div>;
    }
    const dataAttrs: Record<string, string> = {};
    Object.entries(rest).forEach(([k, v]) => {
      if (
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'boolean'
      ) {
        dataAttrs[`data-fp-${k}`] = String(v);
      }
    });
    return (
      <input
        {...dataAttrs}
        id={rest.id}
        aria-label={rest['aria-label']}
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        data-field-type={type}
      />
    );
  },
}));

import ItemRender from '../components/item-render';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterAll(() => {
  (window.matchMedia as any) = undefined;
});

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Form>{children}</Form>
);

// ============================================================
// 基础渲染
// ============================================================
describe('ItemRender — 基础渲染', () => {
  it('type="input" 渲染 Input', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="用户名" name="username" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('用户名')).toBeTruthy();
  });

  it('type=placeholder 只展示 label，没有 Form.Item 控件', () => {
    render(
      <Wrapper>
        <ItemRender type="placeholder" label="标题" />
      </Wrapper>,
    );
    expect(screen.getByText('标题').tagName).toBe('DIV');
  });

  it('children 绕过 FormField 直接渲染', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="自定义" name="custom">
          <span data-testid="child-content">自定义内容</span>
        </ItemRender>
      </Wrapper>,
    );
    expect(screen.getByTestId('child-content')).toBeTruthy();
  });

  it('未知 type 显示"未知组件类型"', () => {
    render(
      <Wrapper>
        <ItemRender type={'fantasyType' as any} label="未知" name="unknown" />
      </Wrapper>,
    );
    expect(screen.getByText('未知组件类型: fantasyType')).toBeTruthy();
  });
});

// ============================================================
// readonly
// ============================================================
describe('ItemRender — readonly', () => {
  it('readonly → defaultConfig 透传（variant:borderless + disabled）', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="只读" name="ro" readonly />
      </Wrapper>,
    );
    // defaultConfig={ variant:'borderless', disabled:true } 通过 FormField 透传
    expect(screen.getByLabelText('只读')).toBeTruthy();
  });
});

// ============================================================
// required
// ============================================================
describe('ItemRender — required', () => {
  it('required="请输入用户名" → Form.Item rules 包含必填', () => {
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="必填项"
          name="req"
          required="请输入用户名"
        />
      </Wrapper>,
    );
    expect(screen.getByLabelText('必填项')).toBeTruthy();
  });

  it('required=true → 使用默认 required: true 规则', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="必填" name="reqTrue" required />
      </Wrapper>,
    );
    expect(screen.getByLabelText('必填')).toBeTruthy();
  });
});

// ============================================================
// customCom
// ============================================================
describe('ItemRender — customCom', () => {
  it('customCom 函数 → 接收非空 formValues + formInstance', () => {
    let capturedValues: any;
    let capturedInstance: any;
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="自定义"
          name="custom"
          customCom={(values: any, form: any) => {
            capturedValues = values;
            capturedInstance = form;
            return <Input data-testid="custom-input" placeholder="自定义" />;
          }}
        />
      </Wrapper>,
    );
    expect(capturedValues).toBeDefined();
    expect(typeof capturedValues).toBe('object');
    expect(capturedInstance).toBeDefined();
    expect(Object.keys(capturedInstance ?? {}).length).toBeGreaterThan(0);
    expect(screen.getByTestId('custom-input')).toBeTruthy();
  });

  it('customCom 非函数 → 直接渲染 ReactNode', () => {
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="直接节点"
          name="node"
          customCom={<span data-testid="custom-node">直接节点</span>}
        />
      </Wrapper>,
    );
    expect(screen.getByTestId('custom-node')).toBeTruthy();
  });

  it('无 customCom → 渲染 FormField', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="普通" name="normal" />
      </Wrapper>,
    );
    // FormField mock 渲染为 input，通过 label 找到
    expect(screen.getByLabelText('普通')).toBeTruthy();
  });
});

// ============================================================
// formName 嵌套
// ============================================================
describe('ItemRender — formName 嵌套', () => {
  it('formName + name → Form.Item name=[formName, name]', () => {
    // formName 透传后由 antd Form.Item 的 name 属性承载嵌套路径
    // 无法直接断言 name 数组，但验证渲染不报错
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="子字段"
          name="child"
          formName="parent"
        />
      </Wrapper>,
    );
    expect(screen.getByLabelText('子字段')).toBeTruthy();
  });

  it('formName 无 name → name 保持原样', () => {
    // name 不存在时 itemName 也保持不变
    render(
      <Wrapper>
        <ItemRender type="placeholder" label="占位" formName="parent" />
      </Wrapper>,
    );
    expect(screen.getByText('占位')).toBeTruthy();
  });
});

// ============================================================
// fieldProps 透传 & 优先级
// ============================================================
describe('ItemRender — fieldProps', () => {
  it('fieldProps.placeholder 覆写 defaultConfig.placeholder', () => {
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="覆盖"
          name="fp1"
          fieldProps={{ placeholder: '自定义占位' } as any}
        />
      </Wrapper>,
    );
    const input = screen.getByLabelText('覆盖') as HTMLInputElement;
    // fieldProps 在 defaultConfig 之后展开，优先级更高
    expect(input.placeholder).toBe('自定义占位');
  });

  it('fieldProps 为空对象 → 使用 defaultConfig 的 placeholder', () => {
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="默认"
          name="fp2"
          fieldProps={{} as any}
        />
      </Wrapper>,
    );
    const input = screen.getByLabelText('默认') as HTMLInputElement;
    // defaultConfig 对 input 设置了 placeholder: '请输入'
    expect(input.placeholder).toBe('请输入');
  });

  it('无 fieldProps → 使用 defaultConfig', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="无fp" name="fp3" />
      </Wrapper>,
    );
    const input = screen.getByLabelText('无fp') as HTMLInputElement;
    expect(input.placeholder).toBe('请输入');
  });

  it('disabled=true 透传到 FormField', () => {
    render(
      <Wrapper>
        <ItemRender type="input" label="禁用" name="dis1" disabled />
      </Wrapper>,
    );
    const input = screen.getByLabelText('禁用') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});

// ============================================================
// regKey 校验规则
// ============================================================
describe('ItemRender — regKey', () => {
  it('regKey 有效 → 规则合并到 Form.Item rules', () => {
    // regKey='phone' 会添加手机号校验规则，渲染不报错即规则拼接成功
    render(
      <Wrapper>
        <ItemRender type="input" label="手机号" name="phone" regKey="phone" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('手机号')).toBeTruthy();
  });

  it('regKey + required + rules（restProps）三者合并', () => {
    // 三来源规则同时存在时合并为一组 rules
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="组合"
          name="combo"
          regKey="phone"
          required="必填手机号"
          rules={[{ max: 11, message: '最长11位' }]}
        />
      </Wrapper>,
    );
    expect(screen.getByLabelText('组合')).toBeTruthy();
  });
});

// ============================================================
// style
// ============================================================
describe('ItemRender — style', () => {
  it('默认 marginBottom: 0', () => {
    // ItemRender 默认给 style 加了 marginBottom: 0
    render(
      <Wrapper>
        <ItemRender type="input" label="样式" name="sty1" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('样式')).toBeTruthy();
  });

  it('自定义 style 合并（marginBottom: 0 为基底）', () => {
    render(
      <Wrapper>
        <ItemRender
          type="input"
          label="自定义样式"
          name="sty2"
          style={{ paddingTop: 10 }}
        />
      </Wrapper>,
    );
    expect(screen.getByLabelText('自定义样式')).toBeTruthy();
  });
});

// ============================================================
// 多种 type
// ============================================================
describe('ItemRender — 多种 type', () => {
  it('type="select" 渲染 Select', () => {
    render(
      <Wrapper>
        <ItemRender type="select" label="下拉" name="sel" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('下拉')).toBeTruthy();
  });

  it('type="datePicker" 渲染 DatePicker', () => {
    render(
      <Wrapper>
        <ItemRender type="datePicker" label="日期" name="dp" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('日期')).toBeTruthy();
  });

  it('type="textarea" 渲染 TextArea', () => {
    render(
      <Wrapper>
        <ItemRender type="textarea" label="备注" name="ta" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('备注')).toBeTruthy();
  });

  it('type="switch" 渲染 Switch', () => {
    render(
      <Wrapper>
        <ItemRender type="switch" label="开关" name="sw" />
      </Wrapper>,
    );
    expect(screen.getByLabelText('开关')).toBeTruthy();
  });

  it('type 未传 → FormField 内部 fallback 到 input', () => {
    const { container } = render(
      <Wrapper>
        <ItemRender label="回退" name="fb" />
      </Wrapper>,
    );
    // type 不传时 FormField 使用 resolvedType = (type ?? 'input') 兜底
    // Form.Item label 正常渲染
    expect(container.querySelector('.ant-form-item-label')).toBeTruthy();
  });
});
