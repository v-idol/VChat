import { speechApi } from '@/services/tts';
import { FormFooter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { voices } from './voices';

const FormItem = Form.Item;

interface Setting {
  type: string;
  language: string;
  voice: string;
  text: string;
}

const setting: Setting = {
  type: 'microsoft',
  language: 'zh-CN',
  voice: 'zh-CN-XiaoyiNeural',
  text: '正在为你准备我的整个世界',
};

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
  `,
  text: css`
    flex: 2;
    margin-right: 12px;
  `,
  config: css`
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    flex: 1;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();

  // const { loading, data: list, run: getVoiceList } = useRequest(voicesApi, { manual: true });
  const { loading, run: speek } = useRequest(speechApi, { manual: true });

  const convertSSML = (values: Setting) => {
    const newValue = {
      voiceStyleSelect: '',
      role: '',
      speed: 1,
      pitch: 1,
      ...values,
    };
    return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${values.voice}">
          <prosody rate="${((newValue.speed - 1) * 100).toFixed()}%" pitch="${(
      (newValue.pitch - 1) *
      50
    ).toFixed()}%">
                ${newValue.text}
          </prosody>
        </voice>
    </speak>
    `;
  };

  return (
    <Form
      initialValues={setting}
      onFinish={(values) => {
        const { type } = values;
        speek(type, convertSSML(values));
      }}
      layout="vertical"
      form={form}
    >
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.text}>
          <FormItem name="text" noStyle>
            <Input.TextArea placeholder="请输入要转换的文字" rows={20} />
          </FormItem>
        </div>
        <div style={style} className={classNames(styles.config)}>
          <FormItem label={'接口'} name="type">
            <Select
              options={[
                {
                  label: 'MicroSoft 语音接口',
                  value: 'microsoft',
                },
                {
                  label: 'Edge 语音接口',
                  value: 'edge',
                },
              ]}
            />
          </FormItem>
          <FormItem label={'语言'} name="language">
            <Select
              options={[
                {
                  label: '中文',
                  value: 'zh-CN',
                },
                {
                  label: '日语(日本)',
                  value: 'ja-JP',
                },
                {
                  label: '英语(美国)',
                  value: 'en-US',
                },
              ]}
            />
          </FormItem>
          <FormItem noStyle dependencies={['language']}>
            {() => {
              const language = form.getFieldValue('language');

              return (
                <FormItem label={'语音'} name="voice">
                  <Select
                    options={voices
                      .filter((voice) => voice.locale === language)
                      .map((item) => ({
                        label: `${item.properties.DisplayName}-${item.properties.LocalName}`,
                        value: item.shortName,
                      }))}
                  />
                </FormItem>
              );
            }}
          </FormItem>
          <FormFooter>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              重置
            </Button>
            <Button htmlType="submit" type="primary" loading={loading}>
              转换
            </Button>
            {/* <Button type="primary" onClick={() => getVoiceList()} loading={loading}>
              获取语音列表
            </Button> */}
          </FormFooter>
        </div>
      </div>
    </Form>
  );
};

export default Config;
