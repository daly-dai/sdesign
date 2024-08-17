import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React, { memo, useMemo } from 'react';
import * as tmp from 'react-router';

import { BASE_FONTSIZE_MAP } from './constant';
import useStyles from './index.style';
import { PageTitleProps } from './types';

import { useComStyle } from '@daly/sdesign/hooks';
import { ArrowLeftIcon, FormTitleIcon } from '@daly/sdesign/icons';

// ignore waring `"export 'useNavigate' (imported as 'rc') was not found in 'react-router'`
const rc = tmp as any;

const STitle: React.FC<PageTitleProps> = (props) => {
  const { styles, cx, prefixCls, token } = useComStyle({
    prefixCls: 'title',
    useStylesHook: useStyles,
  });

  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  const {
    goBack,
    titleDesc,
    actionNode,
    style,
    type = 'page',
    onBackClick,
    hasBottomMargin = true,
    fontSize,
    children,
    ...restProps
  } = props;

  const handleClick = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }

    if (history) {
      history.go(-1);
      return;
    }

    if (navigate) {
      navigate(-1);
    }
  };

  const getBottomStyle = () => {
    if (!hasBottomMargin && hasBottomMargin !== 0) return '';

    if (isBoolean(hasBottomMargin)) {
      return hasBottomMargin ? '16px' : '0';
    }

    if (isString(hasBottomMargin) || isNumber(hasBottomMargin)) {
      return hasBottomMargin;
    }

    // 面对非预期输入时的错误处理逻辑
    console.error('Invalid type for hasBottomMargin. Expected boolean, string, or number.');
    return '';
  };

  const titleStyle = useMemo(() => {
    const marginBottom = getBottomStyle();

    return {
      ...(style ?? {}),
      marginBottom,
    };
  }, [hasBottomMargin, style]);

  // 渲染返回
  const renderBackIcon = useMemo(() => {
    if (type !== 'page') return <></>;

    if (!goBack) return <></>;

    return (
      <div className={styles[`${prefixCls}-left-bk`]} onClick={handleClick}>
        <ArrowLeftIcon style={{ fontSize: '16px' }} />
      </div>
    );
  }, []);

  // 渲染form图标
  const renderFormIcon = useMemo(() => {
    if (type !== 'form') {
      return <></>;
    }

    return <FormTitleIcon className={styles[`${prefixCls}-left-form-icon`]} />;
  }, [type]);

  // 标题的字体大小
  const titleFontSize = useMemo(() => {
    if (fontSize) {
      return {
        fontSize,
      };
    }

    const adjustedFontSize = token.fontSize + (BASE_FONTSIZE_MAP?.[type] ?? 0);

    return {
      fontSize: `${adjustedFontSize}px`,
    };
  }, [fontSize, type, token.fontSize]);

  return (
    <div
      className={cx(styles[prefixCls], styles[`${prefixCls}-${type}`])}
      style={titleStyle}
      {...restProps}
    >
      <div className={styles[`${prefixCls}-left`]}>
        {renderBackIcon}
        {renderFormIcon}

        <div style={titleFontSize} className={styles[`${prefixCls}-left-title`]}>
          {children}
        </div>

        {titleDesc && titleDesc}
      </div>
      <div className={styles[`${prefixCls}-right`]}>{actionNode}</div>
    </div>
  );
};

export default memo(STitle);
