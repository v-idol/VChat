import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    margin-left: ${token.marginSM}px;
  `,
  desc: css`
    width: 480px;
    color: ${token.colorTextDescription};
  `,
  title: css`
    font-size: ${token.fontSize}px;
    font-weight: bold;
  `,
}));